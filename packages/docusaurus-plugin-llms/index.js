const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');
  import { unified } from 'unified';
  import remarkParse from 'remark-parse';
  import remarkMdx from 'remark-mdx';
  import remarkStringify from 'remark-stringify';

module.exports = function pluginLLMs(context, options) {
  return {
    name: 'docusaurus-plugin-llms',

    async postBuild(props) {
      const siteDir = context.siteDir;
      const staticDir = path.join(siteDir, 'static');
      const docsDir = path.join(siteDir, 'docs');

      const BASE_URL = context.siteConfig.url.replace(/\/$/, '');

      const files = await getFiles(docsDir);

      let llmsTxt = `# Documentation\n\n`;
      let llmsFull = `# Documentation (Full)\n\n`;

      const sections = {};

      // generate llms-full.txt
      for (const file of files) {
        const content = await fs.readFile(file, 'utf8');
        const { data, content: rawContent } = matter(content);

        const relativePath = path
          .relative(docsDir, file)
          .replace(/\.mdx?$/, '');

        const url = `${BASE_URL}/docs/${relativePath}`;
        const sectionName =
          path.dirname(relativePath) === '.'
            ? 'General'
            : path.dirname(relativePath);

        if (!sections[sectionName]) sections[sectionName] = [];

        const title = data.title || path.basename(relativePath);
        const description = data.description || '';

        sections[sectionName].push({ title, url, description });

        const mdContent = await convertMdxToMd(rawContent);

        llmsFull += `\n---\n# URL: ${url}\n# Title: ${title}\n\n${mdContent}\n`;

        const outputDir = path.join(staticDir, 'docs', path.dirname(relativePath));
        await fs.ensureDir(outputDir);
        await fs.writeFile(
          path.join(outputDir, path.basename(relativePath) + '.md'),
          mdContent
        );
      }

      // generate llms.txt
      for (const [name, docs] of Object.entries(sections)) {
        console.log(`Processing section: ${name} with ${docs.length} docs`);
        llmsTxt += `## ${name}\n\n`;
        docs.forEach((doc) => {
          llmsTxt += `- [${doc.title}](${doc.url})${
            doc.description ? ': ' + doc.description : ''
          }\n`;
        });
        llmsTxt += `\n`;
      }

      await fs.writeFile(path.join(staticDir, 'llms.txt'), llmsTxt);
      await fs.writeFile(path.join(staticDir, 'llms-full.txt'), llmsFull);

      console.log('✅ LLM files generated');
    },
  };
};

async function convertMdxToMd(content) {
  const preprocessed = convertAdmonitions(content);

  const file = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(stripMdxPlugin)
    .use(remarkStringify)
    .process(preprocessed);

  return String(file);
}

function convertAdmonitions(content) {
  return content.replace(
    /:::(\w+)?[ \t]*\r?\n([\s\S]*?)\r?\n[ \t]*:::/g,
    (_, type, body) => {
      const trimmed = body.trim();
      if (!trimmed) return '';

      const label = type
        ? `> **${type.charAt(0).toUpperCase() + type.slice(1)}**\n>\n`
        : '';
      const lines = trimmed
        .split('\n')
        .map((line) => `> ${line}`)
        .join('\n');

      return label + lines;
    }
  );
}

/**
 * Remark plugin that removes MDX-specific nodes from the AST:
 *  - mdxjsEsm           import/export statements
 *  - mdxJsxFlowElement  block-level JSX  → unwrap children
 *  - mdxJsxTextElement  inline JSX       → unwrap children
 *  - mdxFlowExpression  block {expr}     → remove
 *  - mdxTextExpression  inline {expr}    → remove
 */
function stripMdxPlugin() {
  return (tree) => {
    stripMdxNodes(tree);
  };
}

function stripMdxNodes(node) {
  if (!node.children) return;

  node.children = node.children.flatMap((child) => {
    //  import/export statements
    if (child.type === 'mdxjsEsm') {
      return [];
    }

    // JS expressions ({...})
    if (child.type === 'mdxFlowExpression' || child.type === 'mdxTextExpression') {
      return [];
    }

    // drop JSX attributes, keeping children
    if (child.type === 'mdxJsxFlowElement' || child.type === 'mdxJsxTextElement') {
      if (child.children && child.children.length > 0) {
        stripMdxNodes(child);
        return child.children;
      }
      return [];
    }

    stripMdxNodes(child);
    return [child];
  });
}

async function getFiles(dir) {
  const subdirs = await fs.readdir(dir);
  const files = await Promise.all(
    subdirs.map(async (subdir) => {
      const res = path.resolve(dir, subdir);
      return (await fs.stat(res)).isDirectory()
        ? getFiles(res)
        : res;
    })
  );
  return files.flat().filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
}

import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkStringify from 'remark-stringify';
import { visit } from 'unist-util-visit';

const ACRONYMS = { api: 'API', ui: 'UI', sdk: 'SDK' };

function titleCase(segment) {
  return segment
    .split(/[-_]/)
    .map((word) => ACRONYMS[word] ?? word.replace(/^./, (c) => c.toUpperCase()))
    .join(' ');
}

function sectionLabel(dir) {
  if (dir === '.') return 'General';
  return dir.split('/').map(titleCase).join(' / ');
}

export default function pluginLLMs(context, options) {
  let docsDir = path.join(context.siteDir, 'docs');
  let permalinks = new Map();

  return {
    name: 'docusaurus-plugin-llms',

    async allContentLoaded({ allContent }) {
      const lastVersion = allContent['docusaurus-plugin-content-docs']?.default?.loadedVersions.find(
        (version) => version.isLast
      );
      if (lastVersion) {
        docsDir = lastVersion.contentPath;
        permalinks = new Map(
          lastVersion.docs.map((doc) => [
            path.resolve(context.siteDir, doc.source.replace(/^@site\//, '')),
            doc.permalink,
          ])
        );
      }
    },

    async postBuild({ outDir, routesPaths }) {
      const { title, tagline, baseUrl } = context.siteConfig;
      const SITE_URL = context.siteConfig.url.replace(/\/$/, '');
      const BASE_URL = `${SITE_URL}${baseUrl.replace(/\/$/, '')}`;

      // `routeBasePath: '/'` serves docs from the root, not under /docs
      const docsPrefix = routesPaths.some((route) =>
        route.startsWith(`${baseUrl}docs/`)
      )
        ? 'docs/'
        : '';

      const files = await getFiles(docsDir);

      let llmsTxt = `# ${title}\n\n`;
      if (tagline) llmsTxt += `> ${tagline}\n\n`;
      let llmsFull = `# ${title}\n\n`;

      const sections = {};

      // generate llms-full.txt and individual .md files
      for (const file of files) {
        const content = await fs.readFile(file, 'utf8');
        const { data, content: rawContent } = matter(content);

        const relativePath = path
          .relative(docsDir, file)
          .replace(/\.mdx?$/, '');

        const permalink = permalinks.get(file);
        const url = permalink
          ? `${SITE_URL}${permalink}`
          : `${BASE_URL}/${docsPrefix}${relativePath}`;
        const sectionName = sectionLabel(path.dirname(relativePath));

        if (!sections[sectionName]) sections[sectionName] = [];

        const title = data.title || path.basename(relativePath);
        const description = data.description || '';

        sections[sectionName].push({ title, url, description });

        let mdContent;
        try {
          mdContent = await convertMdxToMd(rawContent, (link) =>
            resolveFileLink(link, file, permalinks, SITE_URL)
          );
        } catch (err) {
          console.warn(`[docusaurus-plugin-llms] Failed to convert ${relativePath}: ${err.message}`);
          mdContent = rawContent;
        }

        llmsFull += `\n---\n# URL: ${url}\n# Title: ${title}\n\n${mdContent}\n`;

        const mdOutPath = permalink
          ? permalinkToMdOutPath(permalink, outDir, baseUrl)
          : sourcePathToMdOutPath(relativePath, outDir, docsPrefix);
        await fs.ensureDir(path.dirname(mdOutPath));
        await fs.writeFile(mdOutPath, mdContent);
      }


      // generate llms.txt
      for (const [name, docs] of Object.entries(sections)) {
        llmsTxt += `## ${name}\n\n`;
        docs.forEach((doc) => {
          llmsTxt += `- [${doc.title}](${doc.url})${
            doc.description ? ': ' + doc.description : ''
          }\n`;
        });
        llmsTxt += `\n`;
      }

      await fs.writeFile(path.join(outDir, 'llms.txt'), llmsTxt);
      await fs.writeFile(path.join(outDir, 'llms-full.txt'), llmsFull);

      console.log('✅ LLM files generated');
    },
  };
}

/**
 * Map a source-relative path (no extension) to its
 * output .md path inside outDir.
 */
function sourcePathToMdOutPath(relativePath, outDir, docsPrefix) {
  const normalized = relativePath.replace(/\/index$/, '') || 'index';
  return path.join(outDir, docsPrefix, normalized + '.md');
}

function permalinkToMdOutPath(permalink, outDir, baseUrl) {
  const routePath = permalink.slice(baseUrl.length).replace(/\/$/, '');
  return path.join(outDir, (routePath || 'index') + '.md');
}

function resolveFileLink(link, file, permalinks, siteUrl) {
  if (/^([a-z][a-z0-9+.-]*:|\/|#)/i.test(link)) return undefined;

  const [, linkPath, suffix] = link.match(/^([^?#]*)(.*)$/);
  const target = path.resolve(path.dirname(file), decodeURIComponent(linkPath));
  const permalink = permalinks.get(target);
  return permalink ? `${siteUrl}${permalink}${suffix}` : undefined;
}

async function convertMdxToMd(content, resolveLink) {
  const preprocessed = stripHtmlComments(convertAdmonitions(content));

  const file = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(stripMdxPlugin)
    .use(resolveLinksPlugin, resolveLink)
    .use(remarkStringify)
    .process(preprocessed);

  return String(file);
}

function stripHtmlComments(content) {
  return content.replace(/<!--[\s\S]*?-->/g, '');
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

function resolveLinksPlugin(resolveLink) {
  return (tree) => {
    visit(tree, ['link', 'definition'], (node) => {
      node.url = resolveLink(node.url) ?? node.url;
    });
  };
}

function stripMdxPlugin() {
  return (tree) => {
    stripMdxNodes(tree);
  };
}

function stripMdxNodes(node) {
  if (!node.children) return;

  node.children = node.children.flatMap((child) => {
    // import/export statements
    if (child.type === 'mdxjsEsm') {
      return [];
    }

    // JS expressions ({...})
    if (child.type === 'mdxFlowExpression' || child.type === 'mdxTextExpression') {
      return [];
    }

    if (child.type === 'html') {
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

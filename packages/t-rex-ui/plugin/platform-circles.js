import { visit } from 'unist-util-visit';

const platformClasses = {
  '[A]': 'platform-indicator-android',
  '[I]': 'platform-indicator-ios',
  '[W]': 'platform-indicator-web',
};

const MARKER_REGEX = /\[[AIW]\]/g;

// A run of markers at the end of the heading, optionally followed by an
// explicit Docusaurus anchor ({#custom-id}), which always sits last
const TRAILING_MARKERS_REGEX = /(?:\s*\[[AIW]\])+(?=\s*(?:\{#[^}]+\})?\s*$)/;

const processHeaderMarkers = () => {
  return (ast) => {
    visit(ast, 'heading', (node) => {
      const lastChild = node.children[node.children.length - 1];

      if (lastChild?.type !== 'text') {
        return;
      }

      const trailingMarkers = lastChild.value.match(TRAILING_MARKERS_REGEX);

      if (!trailingMarkers) {
        return;
      }

      const markers = [
        ...new Set(trailingMarkers[0].match(MARKER_REGEX)),
      ].sort();

      lastChild.value = (
        lastChild.value.slice(0, trailingMarkers.index) +
        lastChild.value.slice(trailingMarkers.index + trailingMarkers[0].length)
      ).trimEnd();

      if (lastChild.value === '') {
        node.children.pop();
      }

      markers.forEach((marker) => {
        node.children.push({
          type: 'mdxJsxTextElement',
          name: 'span',
          attributes: [
            {
              type: 'mdxJsxAttribute',
              name: 'className',
              value: platformClasses[marker],
            },
          ],
          children: [],
        });
      });
    });
  };
};

const removeHeaderJSX = () => {
  return (ast) => {
    const classes = Object.values(platformClasses);

    visit(ast, 'heading', (node) => {
      node.children = node.children.filter((child) => {
        if (child.type === 'mdxJsxTextElement') {
          const classAttr = child.attributes?.find(
            (a) => a.name === 'className'
          );

          return !(classAttr && classes.includes(classAttr.value));
        }

        return true;
      });
    });
  };
};

export { processHeaderMarkers, removeHeaderJSX };

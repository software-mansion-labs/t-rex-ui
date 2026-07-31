import { visit } from 'unist-util-visit';

const platformClasses = {
  '[A]': 'platform-indicator-android',
  '[I]': 'platform-indicator-ios',
  '[W]': 'platform-indicator-web',
};

const MARKER_REGEX = /\s*(\[A\]|\[I\]|\[W\])/g;

const processHeaderMarkers = () => {
  return (ast) => {
    visit(ast, 'heading', (node) => {
      const lastChild = node.children[node.children.length - 1];

      if (lastChild?.type !== 'text') {
        return;
      }

      const markers = [...lastChild.value.matchAll(MARKER_REGEX)]
        .map((match) => match[1])
        .sort();

      if (markers.length === 0) {
        return;
      }

      lastChild.value = lastChild.value.replace(MARKER_REGEX, '').trimEnd();

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

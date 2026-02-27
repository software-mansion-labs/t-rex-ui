// @ts-check
const path = require('path');

/**
 * @param {import('@docusaurus/types').LoadContext} _context
 * @param {{ showLLMButton?: boolean }} options
 * @returns {import('@docusaurus/types').Plugin}
 */
function pluginTRexUITheme(_context, options = {}) {
  const { showLLMButton = true } = options;
  return {
    name: 'docusaurus-plugin-t-rex-ui-theme',
    getThemePath() {
      return path.join(__dirname, 'theme');
    },
    async contentLoaded({ actions }) {
      actions.setGlobalData({ showLLMButton });
    },
  };
}

module.exports = pluginTRexUITheme;

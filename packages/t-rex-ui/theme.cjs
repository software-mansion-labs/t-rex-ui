// @ts-check
const path = require('path');

/**
 * @param {import('@docusaurus/types').LoadContext} _context
 * @param {object} _options
 * @returns {import('@docusaurus/types').Plugin}
 */
function pluginTRexUITheme(_context, _options) {
  return {
    name: 'docusaurus-plugin-t-rex-ui-theme',
    getThemePath() {
      return path.join(__dirname, 'theme');
    },
  };
}

module.exports = pluginTRexUITheme;

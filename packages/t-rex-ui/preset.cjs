// @ts-check
const path = require('path');

/**
 * @param {import('@docusaurus/types').LoadContext} _context
 * @param {{ llms?: boolean | object }} options
 * @returns {import('@docusaurus/types').Preset}
 */
function presetTRexUI(_context, options = {}) {
  const { llms = true } = options;

  /** @type {import('@docusaurus/types').PluginConfig[]} */
  const plugins = [];
  if (llms !== false) {
    // currently nothing, in the future we might want to add some personalisation, like which LLM provider to use etc.
    const llmsOptions = typeof llms === 'object' ? llms : {};
    plugins.push(
      /** @type {import('@docusaurus/types').PluginConfig} */ ([
        require.resolve('@swmansion/docusaurus-plugin-llms'),
        llmsOptions,
      ])
    );
  }

  return {
    themes: [/** @type {import('@docusaurus/types').PluginConfig} */ ([path.join(__dirname, 'theme.cjs'), { showLLMButton: llms !== false }])],
    plugins,
  };
}

module.exports = presetTRexUI;

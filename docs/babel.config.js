module.exports = {
  presets: [
    require.resolve('@docusaurus/core/lib/babel/preset'),
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ],
};

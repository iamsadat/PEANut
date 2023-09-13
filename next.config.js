const webpack = require("webpack");

module.exports = {
  // Your other Next.js configurations...

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^\.\/registry$/,
          contextRegExp: /playwright-core/,
        })
      );
    }

    // Exclude specific modules from being processed by webpack
    config.externals.push("electron");

    // Add rules to exclude problematic file types from processing
    config.module.rules.push(
      {
        test: /\.ttf$/, // Exclude font files
        use: "ignore-loader",
      },
      {
        test: /\.html$/, // Exclude HTML files
        use: "ignore-loader",
      }
    );

    // Your other webpack configurations...

    return config;
  },
};

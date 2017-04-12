module.exports = {
    entry: "./src/index.js",
    output: {
        path: "./dist/",
        filename: "index.js"
    },
    watch: true,
    module: {
        loaders: [
            {
              test: /\.css$/,
              loader: "style!css"
            },
            {
              test: /\.js?$/,
              loader: "babel-loader",
              exclude: /node_modules/,
              query: { presets: ['es2015'] }
            }
        ]
    }
};

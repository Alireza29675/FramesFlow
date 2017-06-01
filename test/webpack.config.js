module.exports = {
    entry: "./src/app.js",
    output: {
        path: __dirname + "/public/",
        filename: "app.bundle.js"
    },
    watch: true,
    module: {
        loaders: [
            {
              test: /\.css$/,
              loader: "style-loader!css-loader"
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

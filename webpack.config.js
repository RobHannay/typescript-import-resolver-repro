const path = require("path");

module.exports = {
    context: path.resolve(__dirname, './'),
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        alias: {
            'aliased': path.resolve(__dirname, 'libs/aliased'),
        },
    },
}

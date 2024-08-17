const D = require('./dir');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');

const isProduction = process.env.NODE_ENV == 'production';


const config = {
    entry: D.src('index.ts'),
    output: {
        path: D.dist(),
    },
    target: 'node',
    externals: [nodeExternals()],  // Exclude node_modules
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new Dotenv(),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            root: D.root(),
            src: D.src(),
        }
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};

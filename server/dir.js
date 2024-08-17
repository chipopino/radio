const path = require('path');

function root(...args) {
    return path.resolve(__dirname, ...args);
}
function dist(...args) {
    return root('dist', ...args);
}
function src(...args) {
    return root('src', ...args);
}

module.exports = {
    root, dist, src
}
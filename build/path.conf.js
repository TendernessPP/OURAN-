const r            = require('path').resolve;
const root         = r(__dirname, '../');
const node_modules = r(root, 'node_modules');

// 是否直接打包到 www 项目 dist 中 admin 文件夹下
const isDistToWWW = true;
const wwwRoot     = r(root);

// dev directory
const dev    = r(root, 'dev');
const src    = r(root, 'src');
const assets = r(src, 'static/assets');
const common = r(root, 'common');
const icons  = r(src, 'components', 'cp-icon-svg');
const vendor = r(common, '*.dll.js');

// prod directory
const dist = isDistToWWW ? r(wwwRoot, 'dist', 'admin') : r(root, 'dist');

module.exports = {
    root,
    src,
    dist,
    common,
    vendor,
    dev,
    assets,
    icons,
    node_modules
};

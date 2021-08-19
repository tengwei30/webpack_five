// import R from 'ramda';
// import path from 'path';
// import glob from 'glob';
// import yargs from 'yargs';

const R = require('ramda');
const path = require('path');
const glob = require('glob');
const yargs = require('yargs');

function relname(base, fpath, ext = '') {
    const relpath = path.relative(base, fpath);
    return path.format({ name: path.dirname(relpath), ext });
}

function resolveEntries(root, fileRegx) {
    const fpaths = glob.sync(path.resolve(root, '**/*'));
    const tplPaths = fpaths.filter(p => fileRegx.tpl.test(p));
    const entryPaths = fpaths.filter(p => fileRegx.entry.test(p));

    const entries = entryPaths.map(entryPath => {
        const name = relname(root, entryPath);
        const tpl = R.find(p => relname(root, p) === name, tplPaths);
        const html = tpl ? path.join('', relname(root, tpl, '/index.html')) : null;

        return { name, path: entryPath, tpl, html };
    });

    const { pages } = yargs.parse();
    const filter = pages ? new RegExp(pages) : /.*/;

    return entries.filter(entry => Boolean(entry.html) && filter.test(entry.name));
}

module.exports = resolveEntries;

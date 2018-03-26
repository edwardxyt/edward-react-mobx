const debug = require("debug");
const echo = debug("production:del");
const del = require("del");

del(["build", "dest", "dist", "cdn"]).then(paths => {
    echo("删除文件及目录:");

    paths.forEach(i => echo(i));
    if (!paths.length) echo("没有需要删除的目录");
});

const express = require("express");
const path = require("path");
const ip = require("ip");
const R = require("ramda");
const history = require("connect-history-api-fallback");
const debug = require("debug");

const echo = debug("test:express");
const app = express();
const port = process.env.npm_package_config_express_port;

let entry = process.env.npm_config_ENTRY;
let [cluster, project] = R.split("/", entry);
let staticDir = path.join(__dirname, "..", "dist", cluster, project);
echo(`staticDir: ${staticDir}`);

const staticFileMiddleware = express.static(staticDir);
app.use(staticFileMiddleware);
app.use(
    history({
        disableDotRule: true,
        verbose: true
    })
);
app.use(staticFileMiddleware);

app.get("/users/5.json", (req, res) => {
    res.json({
        name: "Tom Mason"
    });
});

app.listen(port, () => {
    echo(`服务器运行在 http://${ip.address()}:${port}`);
});

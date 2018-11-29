const Utils = require("./utils");

module.exports = {
    production: {
        baseUrl: "/",
        outputDir: Utils.resolve("../dist"),
        assetsSubDirectory: "static",
        isSorceMap:false,
    },
    testing: {
        baseUrl: "/",
        outputDir: Utils.resolve("../dist"),
        assetsSubDirectory: "static",
        isEsLint:false,
        isSorceMap:true,
    },
    development: {
        port:9000,
        isEsLint:true,
        isSorceMap:true,
    },
};

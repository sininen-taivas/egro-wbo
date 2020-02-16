const {
    override,
    overrideDevServer,
    useBabelRc,
    fixBabelImports,
    addLessLoader,
    useEslintRc
} = require("customize-cra");

const devServerConfig = () => config => {
    return {
        ...config,
        clientLogLevel: "warn",
        allowedHosts: ["localhost", ".gitpod.io"]
    };
};

module.exports = {
    webpack: override(
        // usual webpack plugin
        useBabelRc(),
        fixBabelImports("import", {
            libraryName: "antd",
            libraryDirectory: "es",
            style: true
        }),
        addLessLoader({
            javascriptEnabled: true
            // modifyVars: { "@primary-color": "#1DA57A" }
        }),
        // useEslintRc()
    ),
    devServer: overrideDevServer(
        // dev server plugin
        // watchAll()
        devServerConfig()
    )
};

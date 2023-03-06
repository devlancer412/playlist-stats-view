const path = require("path");
module.exports = {
	webpack: {
		alias: {
			"@api": path.resolve(__dirname, "src/api"),
			"@assets": path.resolve(__dirname, "src/assets"),
			"@context": path.resolve(__dirname, "src/context"),
			"@data": path.resolve(__dirname, "src/data"),
			"@layout": path.resolve(__dirname, "src/layout"),
			"@components": path.resolve(__dirname, "src/components"),
			"@routes": path.resolve(__dirname, "src/routes"),
			"@views": path.resolve(__dirname, "src/views"),
			"@services": path.resolve(__dirname, "src/services"),
			"@styles": path.resolve(__dirname, "src/styles"),
		},
		configure: {
			resolve: {
				fallback: {
					path: require.resolve("path-browserify"),
				},
			},
		},
	},
};

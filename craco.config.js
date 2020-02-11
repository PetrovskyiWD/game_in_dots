const CracoAlias = require("craco-alias");

module.exports = {
	plugins: [
		{
			plugin: CracoAlias,
			options: {
				source: "options",
				baseUrl: "./",
				aliases: {
					"@constants": "./src/constants",
					"@hooks": "./src/hooks",
					"@utils": "./src/utils",
				}
			}
		}
	]
};
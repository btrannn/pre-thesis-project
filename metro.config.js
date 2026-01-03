const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('json');
config.watchFolders = [__dirname + '/datasets'];

module.exports = config;
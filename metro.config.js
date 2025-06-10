// Learn more https://docs.expo.io/guides/customizing-metro

/** @type {import('expo/metro-config').MetroConfig} */
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push('cjs');
config.resolver.unstable_enablePackageExports = false;

module.exports = config;

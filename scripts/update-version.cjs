const fs = require('fs');
const path = require('path');

// Read package.json to get current version
const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Generate version.ts file with current version and build date
const versionContent = `// Auto-generated build info - updated on each deployment
export const APP_VERSION = '${packageJson.version}';
export const BUILD_DATE = '${new Date().toISOString()}';
export const APP_NAME = 'RUPEE SETU';

export const getVersionInfo = () => {
  return {
    version: APP_VERSION,
    buildDate: BUILD_DATE,
    appName: APP_NAME,
  };
};
`;

// Write to version.ts
const versionFilePath = path.join(__dirname, '../src/lib/version.ts');
fs.writeFileSync(versionFilePath, versionContent, 'utf8');

console.log(`✓ Version info updated: v${packageJson.version} at ${new Date().toISOString()}`);

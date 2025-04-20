
// This file helps you see what scripts are available in your project
console.log("Available scripts in package.json:");
const fs = require('fs');
const path = require('path');

const packageJsonPath = path.resolve(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
console.log(packageJson.scripts);

import fs from 'fs';
import path from 'path';

const htmlPath = './dashboard.html';
const cssPath = './src/dashboard.css';

const content = fs.readFileSync(htmlPath, 'utf-8');
const lines = content.split('\n');

let cssContent = '';

// Extract first style block (lines 11 to 2563)
// Note: 0-indexed line index is line_number - 1
const styleBlock1 = lines.slice(10, 2563).join('\n');
cssContent += `/* Style Block 1 */\n${styleBlock1}\n\n`;

// Extract second style block (lines 3805 to 3815)
const styleBlock2 = lines.slice(3804, 3815).join('\n');
cssContent += `/* Style Block 2 */\n${styleBlock2}\n`;

fs.writeFileSync(cssPath, cssContent);
console.log('Successfully extracted CSS to src/dashboard.css');

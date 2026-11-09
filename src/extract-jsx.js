import fs from 'fs';

const htmlPath = './dashboard.html';
const jsxPath = './src/extracted-markup.jsx';

const content = fs.readFileSync(htmlPath, 'utf-8');
const lines = content.split('\n');

// Part 1: main layout (lines 2566 to 4082, 0-indexed: 2565 to 4081)
const part1 = lines.slice(2564, 4082).join('\n');

// Part 2: drawer (lines 5478 to 5489, 0-indexed: 5477 to 5488)
const part2 = lines.slice(5477, 5489).join('\n');

function convertHtmlToJsx(html) {
  let jsx = html
    .replace(/\bclass=/g, 'className=')
    .replace(/\bfor=/g, 'htmlFor=')
    // Remove comments
    .replace(/<!--[\s\S]*?-->/g, (match) => {
      // Convert HTML comments to React/JSX comments if needed, or just remove or convert
      return `{/* ${match.replace(/<!--|-->/g, '').trim()} */}`;
    })
    // Replace SVG attribute names that need camelCase:
    .replace(/\bfill-rule=/g, 'fillRule=')
    .replace(/\bclip-rule=/g, 'clipRule=')
    .replace(/\bstroke-linecap=/g, 'strokeLinecap=')
    .replace(/\bstroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/\bstroke-width=/g, 'strokeWidth=')
    .replace(/\binputmode=/g, 'inputMode=')
    .replace(/\bautocomplete=/g, 'autoComplete=')
    .replace(/\bmaxlength=/g, 'maxLength=')
    .replace(/\breadonly=/g, 'readOnly=');

  // Convert style="..." to style={{ ... }}
  jsx = jsx.replace(/style="([^"]*)"/g, (match, styleStr) => {
    let styles = styleStr.split(';').filter(s => s.trim());
    let pairs = styles.map(s => {
      let colonIdx = s.indexOf(':');
      if (colonIdx === -1) return '';
      let key = s.slice(0, colonIdx).trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      let value = s.slice(colonIdx + 1).trim();
      return `"${key}": "${value.replace(/"/g, '\\"')}"`;
    }).filter(p => p);
    return `style={{ ${pairs.join(', ')} }}`;
  });

  return jsx;
}

const jsxPart1 = convertHtmlToJsx(part1);
const jsxPart2 = convertHtmlToJsx(part2);

fs.writeFileSync(jsxPath, `// === JSX Part 1 ===\n${jsxPart1}\n\n// === JSX Part 2 ===\n${jsxPart2}\n`);
console.log('Successfully extracted JSX markup to src/extracted-markup.jsx');

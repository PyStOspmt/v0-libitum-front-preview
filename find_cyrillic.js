const fs = require('fs');
const path = require('path');

const targetDirs = ['app', 'components'];
const cyrillicRegex = /[А-Яа-яЄєІіЇїҐґ]+/g;

function walk(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        walk(path.join(dir, file), fileList);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const allFiles = targetDirs.flatMap(d => walk(d));
let results = [];

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    if (line.match(cyrillicRegex)) {
      // Ignore comments
      if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) return;
      // Extract the cyrillic part + surrounding quotes or just the whole line to see context
      if (!line.includes('useTranslation') && !line.includes('t(')) {
          results.push(`${file}:${i+1}: ${line.trim()}`);
      }
    }
  });
});

fs.writeFileSync('cyrillic_strings.txt', results.join('\n'));
console.log(`Found ${results.length} lines with untranslated Cyrillic strings.`);

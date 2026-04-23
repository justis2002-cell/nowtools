import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'src/content/blog');

function cleanFile(fileName: string) {
  const filePath = path.join(blogDir, fileName);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('---')) {
    const startIndex = content.indexOf('---');
    if (startIndex > 0) {
      console.log(`Cleaning ${fileName}...`);
      content = content.substring(startIndex);
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
}

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
files.forEach(cleanFile);
console.log('Cleanup finished!');

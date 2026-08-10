const fs = require('fs');
const path = require('path');

const targetDir = 'c:\\Users\\USER\\Desktop\\DE Portfolio\\public\\logos';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const filesToCopy = [
  { src: 'c:\\Users\\USER\\Desktop\\Phocus V1\\public\\logo.svg', dest: 'phocus.svg' },
  { src: 'c:\\Users\\USER\\Desktop\\IN official\\public\\in-logo-4.png', dest: 'in-official.png' },
  { src: 'c:\\Users\\USER\\Desktop\\Sportsbook engine\\public\\logo.png', dest: 'betpanta.png' },
  { src: 'c:\\Users\\USER\\Desktop\\Seun Daniel\\Seun Daniel Website\\public\\favicon.png', dest: 'seun-daniel.png' },
  { src: 'c:\\Users\\USER\\Desktop\\ASE\\public\\favicon.png', dest: 'ase.png' }
];

filesToCopy.forEach(({ src, dest }) => {
  const destPath = path.join(targetDir, dest);
  try {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, destPath);
      console.log(`Copied ${src} to ${destPath}`);
    } else {
      console.error(`File not found: ${src}`);
    }
  } catch (err) {
    console.error(`Error copying ${src}:`, err);
  }
});

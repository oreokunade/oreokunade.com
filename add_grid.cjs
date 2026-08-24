const fs = require('fs');

const gridCss = `
/* Global Grid Overlay */
body::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  pointer-events: none;
  background-size: 40px 40px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px);
}

.dark body::before {
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
}
`;

fs.appendFileSync('index.css', gridCss);
console.log('Added grid overlay to index.css');

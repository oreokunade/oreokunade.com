const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  const homeBase64 = fs.readFileSync(path.join(__dirname, '../betpanta-real-home.png')).toString('base64');
  const liveBase64 = fs.readFileSync(path.join(__dirname, '../betpanta-real-live.png')).toString('base64');
  const casinoBase64 = fs.readFileSync(path.join(__dirname, '../betpanta-real-casino.png')).toString('base64');
  const betslipBase64 = fs.readFileSync(path.join(__dirname, '../betpanta-real-betslip.png')).toString('base64');

  const createSingleDeviceHtml = (imgBase64, title, subtitle, glowColor = 'rgba(255, 107, 0, 0.15)') => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body {
          width: 1920px;
          height: 1080px;
          background: #090e15;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }
        .glow {
          position: absolute;
          width: 800px;
          height: 800px;
          border-radius: 50%;
          background: radial-gradient(circle, ${glowColor} 0%, rgba(9, 14, 21, 0) 70%);
          filter: blur(80px);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
        }
        .grid-pattern {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          z-index: 2;
        }
        .device-wrapper {
          position: relative;
          z-index: 10;
          width: 440px;
          height: 940px;
          border-radius: 50px;
          padding: 10px;
          background: linear-gradient(145deg, #1f2937, #0b1118);
          box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.8),
                      0 20px 40px -15px rgba(255, 107, 0, 0.2),
                      inset 0 0 0 1px rgba(255, 255, 255, 0.15);
          display: flex;
          flex-direction: column;
        }
        .screen-inner {
          width: 100%;
          height: 100%;
          border-radius: 40px;
          overflow: hidden;
          background: #0c121d;
          position: relative;
        }
        .screen-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .badge {
          position: absolute;
          top: 60px;
          left: 80px;
          z-index: 20;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .badge .tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 107, 0, 0.15);
          border: 1px solid rgba(255, 107, 0, 0.4);
          color: #ff8533;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          backdrop-filter: blur(10px);
        }
        .badge .title {
          font-size: 32px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.02em;
        }
        .badge .subtitle {
          font-size: 16px;
          font-weight: 400;
          color: #94a3b8;
          max-width: 440px;
          line-height: 1.5;
        }
      </style>
    </head>
    <body>
      <div class="grid-pattern"></div>
      <div class="glow"></div>
      
      <div class="badge">
        <div class="tag">✦ Real BetPanta Production UI</div>
        <div class="title">${title}</div>
        <div class="subtitle">${subtitle}</div>
      </div>

      <div class="device-wrapper">
        <div class="screen-inner">
          <img src="data:image/png;base64,${imgBase64}" />
        </div>
      </div>
    </body>
    </html>
  `;

  // Dual Device for Hero Showcase
  const createHeroHtml = () => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body {
          width: 1920px;
          height: 1080px;
          background: #090e15;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }
        .glow {
          position: absolute;
          width: 1000px;
          height: 1000px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 107, 0, 0.18) 0%, rgba(9, 14, 21, 0) 70%);
          filter: blur(100px);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
        }
        .grid-pattern {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          z-index: 2;
        }
        .phones-container {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 60px;
        }
        .device-wrapper {
          width: 410px;
          height: 880px;
          border-radius: 46px;
          padding: 9px;
          background: linear-gradient(145deg, #1f2937, #0b1118);
          box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.85),
                      0 20px 40px -15px rgba(255, 107, 0, 0.25),
                      inset 0 0 0 1px rgba(255, 255, 255, 0.18);
          display: flex;
          flex-direction: column;
        }
        .device-left {
          transform: translateY(20px);
        }
        .device-right {
          transform: translateY(-20px);
        }
        .screen-inner {
          width: 100%;
          height: 100%;
          border-radius: 38px;
          overflow: hidden;
          background: #0c121d;
          position: relative;
        }
        .screen-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .badge {
          position: absolute;
          top: 80px;
          left: 100px;
          z-index: 20;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .badge .tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 107, 0, 0.15);
          border: 1px solid rgba(255, 107, 0, 0.4);
          color: #ff8533;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          backdrop-filter: blur(10px);
        }
        .badge .title {
          font-size: 38px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.02em;
        }
        .badge .subtitle {
          font-size: 16px;
          font-weight: 400;
          color: #94a3b8;
          max-width: 460px;
          line-height: 1.5;
        }
      </style>
    </head>
    <body>
      <div class="grid-pattern"></div>
      <div class="glow"></div>

      <div class="badge">
        <div class="tag">✦ Mobile Sportsbook Engine</div>
        <div class="title">BetPanta Live Platform</div>
        <div class="subtitle">Real-time match odds, in-play match tracking, and integrated instant games built for mobile web.</div>
      </div>

      <div class="phones-container">
        <div class="device-wrapper device-left">
          <div class="screen-inner">
            <img src="data:image/png;base64,${homeBase64}" />
          </div>
        </div>
        <div class="device-wrapper device-right">
          <div class="screen-inner">
            <img src="data:image/png;base64,${liveBase64}" />
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  // 1. Hero Showcase
  console.log('Rendering Hero Showcase...');
  await page.setContent(createHeroHtml());
  await page.screenshot({ path: path.join(__dirname, '../public/casestudies/betpanta-screen-hero.png') });

  // 2. Screen 1: Home Discovery
  console.log('Rendering Home Screen...');
  await page.setContent(createSingleDeviceHtml(
    homeBase64,
    'Matchday Discovery',
    'Category shortcuts, Panta Jet, quick booking codes, and featured live tournament matches.'
  ));
  await page.screenshot({ path: path.join(__dirname, '../public/casestudies/betpanta-screen-home.png') });

  // 3. Screen 2: In-Play Live
  console.log('Rendering Live Matches...');
  await page.setContent(createSingleDeviceHtml(
    liveBase64,
    'In-Play Live Tracker',
    'Real-time match clocks, live score indicators, and dynamically fluctuating 1X2 & Over/Under odds.'
  ));
  await page.screenshot({ path: path.join(__dirname, '../public/casestudies/betpanta-screen-live.png') });

  // 4. Screen 3: Casino Lobby
  console.log('Rendering Casino...');
  await page.setContent(createSingleDeviceHtml(
    casinoBase64,
    'Integrated Casino Lobby',
    'Instant games, Golden Tomb Guardians, Aviator, and live dealer games without switching wallets.',
    'rgba(236, 72, 153, 0.15)'
  ));
  await page.screenshot({ path: path.join(__dirname, '../public/casestudies/betpanta-screen-casino.png') });

  // 5. Screen 4: Betslip & Odds
  console.log('Rendering Betslip...');
  await page.setContent(createSingleDeviceHtml(
    betslipBase64,
    'Betslip & Booking Engine',
    'One-tap odds selection, automated accumulator boost calculation, and instant shareable booking codes.'
  ));
  await page.screenshot({ path: path.join(__dirname, '../public/casestudies/betpanta-screen-betslip.png') });

  console.log('All authentic BetPanta 1920x1080 screens generated successfully!');
  await browser.close();
})();

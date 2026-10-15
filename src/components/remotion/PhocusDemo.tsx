import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const getAssetUrl = (relPath: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : base + '/';
  const cleanPath = relPath.startsWith('/') ? relPath.slice(1) : relPath;
  return cleanBase + cleanPath;
};

export const PhocusComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Total frames: 240 (8 seconds @ 30fps)
  // Phase 1: 0 - 75 (Interactive Phocus dashboard: cursor moves, completes "Read Bible", clicks "Start Session")
  // Phase 2: 75 - 165 (Deep Work Mode Focus Session: camera zoom, slide-3 timer card active countdown)
  // Phase 3: 165 - 240 (Session Complete & Stats reveal: slide-0 card, slide-1 score card, zoom back)

  // Cursor Animation (Phase 1)
  // Starts at (70%, 75%), moves to checkbox at (16.8%, 34.8%), clicks at 35,
  // then moves to "START SESSION" button at (89.5%, 45.8%), clicks at 68.
  const cursorX = interpolate(
    frame,
    [10, 32, 45, 66],
    [70, 16.8, 45, 89.5],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const cursorY = interpolate(
    frame,
    [10, 32, 45, 66],
    [75, 34.8, 38, 45.8],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Click 1: Read Bible task checkbox
  const isClick1 = frame >= 34 && frame <= 40;
  const taskChecked = frame >= 36;
  const checkSpring = spring({ frame: frame - 36, fps, config: { damping: 12, stiffness: 200 } });

  // Click 2: Start Session button
  const isClick2 = frame >= 67 && frame <= 74;
  const sessionStarted = frame >= 75;

  // Camera Zoom & Dim transition into Deep Work
  // At frame 75 to 90, camera zooms towards the session area, then centers on timer card
  const cameraScale = interpolate(
    frame,
    [75, 95, 155, 175, 220, 240],
    [1, 1.35, 1.35, 1.15, 1.15, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const cameraOriginX = interpolate(
    frame,
    [75, 95, 155, 175],
    [50, 75, 75, 50],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const cameraOriginY = interpolate(
    frame,
    [75, 95, 155, 175],
    [50, 45, 45, 50],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const overlayOpacity = interpolate(
    frame,
    [75, 90, 160, 175],
    [0, 0.75, 0.75, 0.2],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Timer countdown in Phase 2
  // Real timer counts down from 25:00
  const timerFrameOffset = Math.max(0, frame - 85);
  const totalSecondsLeft = Math.max(0, 1500 - Math.floor(timerFrameOffset * 1.5));
  const timerMinutes = Math.floor(totalSecondsLeft / 60);
  const timerSeconds = totalSecondsLeft % 60;
  const timeString = `${timerMinutes.toString().padStart(2, '0')}:${timerSeconds.toString().padStart(2, '0')}`;

  // Breathing pulse for Deep Work mode
  const breath = Math.sin(frame * 0.1) * 0.08 + 1;

  // Phase 2 Card Entrance
  const timerCardSpring = spring({
    frame: frame - 80,
    fps,
    config: { damping: 14, stiffness: 120 }
  });

  // Phase 3 Cards Entrance (Session Complete & Focus Score)
  const completeCardSpring = spring({
    frame: frame - 165,
    fps,
    config: { damping: 13, stiffness: 140 }
  });

  const scoreCardSpring = spring({
    frame: frame - 175,
    fps,
    config: { damping: 14, stiffness: 130 }
  });

  // Animated focus score counter (from 88 to 96)
  const currentScore = Math.round(
    interpolate(frame, [175, 210], [88, 96], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#0c0d12',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Background Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, rgba(12, 13, 18, 0) 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Main Container with subtle desktop framing */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#faf9f6',
          transform: `scale(${cameraScale})`,
          transformOrigin: `${cameraOriginX}% ${cameraOriginY}%`,
          transition: 'transform 0.05s linear',
        }}
      >
        {/* Top Window Chrome Bar */}
        <div
          style={{
            height: '36px',
            backgroundColor: '#f3f2ee',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            zIndex: 30,
          }}
        >
          <div style={{ display: 'flex', gap: '7px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
          </div>
          <div style={{ fontSize: '12px', fontWeight: 500, color: '#78716c', letterSpacing: '0.02em' }}>
            Phocus OS — Workspace
          </div>
          <div style={{ fontSize: '11px', color: '#a8a29e', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
            Active Session
          </div>
        </div>

        {/* Existing Screen of Phocus (dashboard-preview.png) */}
        <div style={{ position: 'relative', width: '100%', height: 'calc(100% - 36px)', overflow: 'hidden' }}>
          <img
            src={getAssetUrl('casestudies/phocus-screen-dashboard.png')}
            alt="Phocus OS"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {/* Interactive Dynamic Overlays on top of the real screen */}

          {/* 1. Green checkmark overlay on "Read Bible" checkbox */}
          {taskChecked && (
            <div
              style={{
                position: 'absolute',
                top: '34.6%',
                left: '16.7%',
                width: '26px',
                height: '26px',
                borderRadius: '6px',
                backgroundColor: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)',
                transform: `scale(${checkSpring})`,
                zIndex: 20,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          )}

          {/* Strikethrough & Completed badge on "Read Bible" */}
          {taskChecked && (
            <div
              style={{
                position: 'absolute',
                top: '35.3%',
                left: '19.8%',
                width: '120px',
                height: '2px',
                backgroundColor: '#10b981',
                zIndex: 20,
                opacity: 0.8,
              }}
            />
          )}

          {/* Floating +25 Focus Pts Pill */}
          {frame >= 36 && frame <= 75 && (
            <div
              style={{
                position: 'absolute',
                top: `${interpolate(frame, [36, 60], [33, 29], { extrapolateRight: 'clamp' })}%`,
                left: '21%',
                backgroundColor: '#10b981',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                opacity: interpolate(frame, [36, 42, 65, 75], [0, 1, 1, 0]),
                zIndex: 25,
              }}
            >
              +25 Focus Pts
            </div>
          )}

          {/* Button Click Ripple on "START SESSION" */}
          {isClick2 && (
            <div
              style={{
                position: 'absolute',
                top: '45.8%',
                left: '89.5%',
                transform: 'translate(-50%, -50%)',
                width: '140px',
                height: '42px',
                borderRadius: '8px',
                border: '2px solid #f97316',
                boxShadow: '0 0 20px rgba(249, 115, 22, 0.6)',
                zIndex: 25,
              }}
            />
          )}

          {/* Dimmed Focus Atmosphere Overlay during Session */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#0a0d14',
              opacity: overlayOpacity,
              backdropFilter: overlayOpacity > 0 ? 'blur(8px)' : 'none',
              zIndex: 35,
              pointerEvents: 'none',
            }}
          />

          {/* Deep Work Mode Floating Focus Card (slide-3.png) */}
          {sessionStarted && frame < 170 && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${timerCardSpring * breath})`,
                zIndex: 40,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              {/* Outer Ambient Breathing Ring */}
              <div
                style={{
                  position: 'absolute',
                  width: '380px',
                  height: '380px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(249, 115, 22, 0.25) 0%, rgba(0,0,0,0) 70%)',
                  filter: 'blur(30px)',
                  transform: `scale(${breath})`,
                  zIndex: -1,
                }}
              />

              {/* The Actual Deep Work Timer Card from Phocus */}
              <div
                style={{
                  width: '320px',
                  borderRadius: '32px',
                  overflow: 'hidden',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)',
                  position: 'relative',
                }}
              >
                <img
                  src={getAssetUrl('casestudies/phocus-slide-timer.png')}
                  alt="Deep Work Mode"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />

                {/* Dynamic Live Countdown Text overlaid on the timer */}
                <div
                  style={{
                    position: 'absolute',
                    top: '40.5%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '44px',
                    fontWeight: 600,
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {timeString}
                </div>
              </div>

              {/* Active Sprint Indicator Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#f97316',
                    boxShadow: '0 0 10px #f97316',
                    display: 'inline-block',
                  }}
                />
                Deep Work Mode • 25 Min Sprint
              </div>
            </div>
          )}

          {/* Phase 3: Session Complete & Focus Score Reveal (slide-0.png + slide-1.png) */}
          {frame >= 165 && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 45,
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
              }}
            >
              {/* Session Complete Card (slide-0.png) */}
              <div
                style={{
                  width: '310px',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.06)',
                  transform: `scale(${completeCardSpring})`,
                  backgroundColor: '#fff',
                }}
              >
                <img
                  src={getAssetUrl('casestudies/phocus-slide-session-complete.png')}
                  alt="Session Complete"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              {/* Focus Score Bar Chart Card (slide-1.png) */}
              <div
                style={{
                  width: '260px',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.06)',
                  transform: `scale(${scoreCardSpring})`,
                  position: 'relative',
                  backgroundColor: '#fff',
                }}
              >
                <img
                  src={getAssetUrl('casestudies/phocus-slide-score.png')}
                  alt="Focus Score"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />

                {/* Animated Dynamic Focus Score Number overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: '21.5%',
                    left: '28%',
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '25px',
                    fontWeight: 700,
                    color: '#000',
                  }}
                >
                  {currentScore}
                </div>
              </div>
            </div>
          )}

          {/* Natural Apple Cursor Tracking across the screen */}
          {frame < 80 && (
            <div
              style={{
                position: 'absolute',
                top: `${cursorY}%`,
                left: `${cursorX}%`,
                transform: `translate(-2px, -2px) scale(${isClick1 || isClick2 ? 0.85 : 1})`,
                transition: 'transform 0.08s ease',
                zIndex: 50,
                pointerEvents: 'none',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5.5 3.2L18.8 12.3C19.7 12.9 19.4 14.3 18.3 14.5L13.1 15.3L16.2 21.4C16.6 22.2 15.7 23 15 22.4L11.8 17.5L8.2 20.3C7.3 21 6 20.4 6 19.3V4.3C6 3.2 7.1 2.6 8 3.2"
                  fill="#000000"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

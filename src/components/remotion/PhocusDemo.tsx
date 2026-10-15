import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const PhocusComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase calculation (0 - 240 frames total)
  // Phase 1: 0 - 80 (Dashboard & Task completion)
  // Phase 2: 80 - 170 (Deep Work Mode Focus Timer)
  // Phase 3: 170 - 240 (Live Focus Score & Analytics)

  const isPhase1 = frame < 80;
  const isPhase2 = frame >= 80 && frame < 170;
  const isPhase3 = frame >= 170;

  // Spring animations for UI elements
  const task1Done = frame >= 40;
  const task1Spring = spring({ frame: frame - 40, fps, config: { damping: 12 } });

  // Phase transitions opacity
  const phase1Opacity = interpolate(frame, [70, 80], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phase2Opacity = interpolate(frame, [75, 85, 160, 170], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phase3Opacity = interpolate(frame, [165, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Countdown timer in Phase 2
  const timerSeconds = Math.max(0, 1500 - Math.floor((frame - 80) * 0.8));
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Focus score counter in Phase 3
  const scoreCounter = Math.round(interpolate(frame, [170, 220], [78, 96], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#0c0d11',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      userSelect: 'none'
    }}>
      {/* Background Ambient Glow */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '30%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />

      {/* Top Application Bar */}
      <div style={{
        height: '64px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        backgroundColor: 'rgba(16, 17, 22, 0.85)',
        backdropFilter: 'blur(20px)',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#f97316',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#fff'
          }}>
            ✦
          </div>
          <div>
            <span style={{ fontWeight: 600, fontSize: '15px', letterSpacing: '-0.01em' }}>Phocus OS</span>
            <span style={{ marginLeft: '8px', fontSize: '11px', color: '#9ca3af', backgroundColor: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '12px' }}>v2.4 Live</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '13px', color: '#9ca3af' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
            <span>Active Session</span>
          </div>
          <div style={{ padding: '6px 14px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' }}>
            Oreoluwa Okunade
          </div>
        </div>
      </div>

      {/* MAIN STAGE */}
      <div style={{ flex: 1, position: 'relative', padding: '40px' }}>
        
        {/* ================= PHASE 1: DASHBOARD & TASKS ================= */}
        {isPhase1 && (
          <div style={{
            opacity: phase1Opacity,
            display: 'flex',
            gap: '32px',
            height: '100%'
          }}>
            {/* Left Column: Tasks */}
            <div style={{ flex: '1.2', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <h1 style={{ fontSize: '28px', fontWeight: 600, margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>Today's Priority</h1>
                  <p style={{ margin: 0, color: '#9ca3af', fontSize: '14px' }}>Clear the noise. Focus on what matters.</p>
                </div>
                <div style={{ fontSize: '12px', padding: '6px 12px', borderRadius: '6px', backgroundColor: '#f97316', color: '#fff', fontWeight: 600 }}>
                  + ADD TASK
                </div>
              </div>

              {/* Task Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Task 1 */}
                <div style={{
                  padding: '20px',
                  borderRadius: '16px',
                  backgroundColor: task1Done ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255,255,255,0.03)',
                  border: task1Done ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '8px',
                      border: task1Done ? 'none' : '2px solid rgba(255,255,255,0.2)',
                      backgroundColor: task1Done ? '#10b981' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      color: '#fff',
                      transform: task1Done ? `scale(${Math.min(1.2, task1Spring)})` : 'scale(1)'
                    }}>
                      {task1Done && '✓'}
                    </div>
                    <div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: 500,
                        textDecoration: task1Done ? 'line-through' : 'none',
                        color: task1Done ? '#9ca3af' : '#fff'
                      }}>
                        Finalize Product Spec & Core Architecture
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                        HIGH PRIORITY • 60 MIN BLOCK
                      </div>
                    </div>
                  </div>
                  {task1Done && (
                    <div style={{
                      fontSize: '11px',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      color: '#34d399',
                      fontWeight: 600
                    }}>
                      DONE (+15 FOCUS)
                    </div>
                  )}
                </div>

                {/* Task 2 */}
                <div style={{
                  padding: '20px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '8px',
                      border: '2px solid rgba(255,255,255,0.2)'
                    }} />
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 500 }}>
                        Review Pull Requests & API Pipeline
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                        MEDIUM PRIORITY • 30 MIN BLOCK
                      </div>
                    </div>
                  </div>
                </div>

                {/* Task 3 */}
                <div style={{
                  padding: '20px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '8px',
                      border: '2px solid rgba(255,255,255,0.2)'
                    }} />
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 500 }}>
                        Weekly Design Sync with Engineering
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                        SCHEDULED • 2:00 PM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Mini Widgets */}
            <div style={{ flex: '0.8', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{
                padding: '24px',
                borderRadius: '20px',
                backgroundColor: 'rgba(249, 115, 22, 0.06)',
                border: '1px solid rgba(249, 115, 22, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#f97316', fontWeight: 600 }}>
                  Daily Phocus Score
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                  <span style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' }}>88</span>
                  <span style={{ fontSize: '14px', color: '#10b981', fontWeight: 600 }}>▲ +12 today</span>
                </div>
                <div style={{ height: '6px', borderRadius: '3px', backgroundColor: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                  <div style={{ width: '88%', height: '100%', backgroundColor: '#f97316' }} />
                </div>
              </div>

              <div style={{
                padding: '24px',
                borderRadius: '20px',
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                gap: '12px'
              }}>
                <div style={{ fontSize: '36px' }}>⚡</div>
                <div style={{ fontSize: '18px', fontWeight: 600 }}>Ready for Deep Work?</div>
                <p style={{ color: '#9ca3af', fontSize: '13px', margin: 0, maxWidth: '240px' }}>
                  Block distractions and lock into pure flow state for the next 25 minutes.
                </p>
                <div style={{
                  marginTop: '8px',
                  padding: '10px 24px',
                  borderRadius: '12px',
                  backgroundColor: '#fff',
                  color: '#000',
                  fontWeight: 600,
                  fontSize: '13px'
                }}>
                  Start Session →
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= PHASE 2: DEEP WORK TIMER ================= */}
        {isPhase2 && (
          <div style={{
            opacity: phase2Opacity,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {/* Glowing Focus Card */}
            <div style={{
              width: '420px',
              padding: '44px 32px',
              borderRadius: '32px',
              backgroundColor: '#121218',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 50px rgba(249, 115, 22, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative'
            }}>
              {/* Focus Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '20px',
                backgroundColor: 'rgba(249, 115, 22, 0.12)',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                color: '#f97316',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                marginBottom: '28px'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f97316' }} />
                DEEP WORK MODE
              </div>

              {/* Timer Display */}
              <div style={{
                width: '210px',
                height: '210px',
                borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)'
              }}>
                {/* Pulsing ring */}
                <div style={{
                  position: 'absolute',
                  inset: '-4px',
                  borderRadius: '50%',
                  border: '2px solid #f97316',
                  opacity: 0.4 + Math.sin(frame * 0.1) * 0.3
                }} />

                <div style={{
                  fontSize: '52px',
                  fontWeight: 600,
                  fontFamily: 'Georgia, serif',
                  letterSpacing: '-0.02em',
                  color: '#ffffff'
                }}>
                  {timeString}
                </div>
              </div>

              {/* Ambient Audio Pill */}
              <div style={{
                marginTop: '28px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 18px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                fontSize: '13px',
                color: '#d1d5db'
              }}>
                <span>🎧 Rain & Theta Waves</span>
                <span style={{ color: '#6b7280' }}>•</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>Active</span>
              </div>

              <div style={{
                marginTop: '16px',
                fontSize: '12px',
                color: '#9ca3af'
              }}>
                🛡️ All external notifications silenced
              </div>
            </div>
          </div>
        )}

        {/* ================= PHASE 3: LIVE METRICS & SCORE ================= */}
        {isPhase3 && (
          <div style={{
            opacity: phase3Opacity,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '32px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#10b981', fontWeight: 700, marginBottom: '8px' }}>
                SESSION COMPLETE • FLOW STATE REACHED
              </div>
              <h2 style={{ fontSize: '36px', fontWeight: 600, margin: 0, letterSpacing: '-0.02em' }}>
                Productivity & Focus Telemetry
              </h2>
            </div>

            {/* Score & Bar Chart Cards */}
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              {/* Daily Score Big Card */}
              <div style={{
                width: '260px',
                padding: '36px 28px',
                borderRadius: '24px',
                backgroundColor: '#121218',
                border: '1px solid rgba(255,255,255,0.1)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Phocus Score
                </div>
                <div style={{
                  fontSize: '76px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'Georgia, serif',
                  margin: '8px 0'
                }}>
                  {scoreCounter}
                </div>
                <div style={{
                  display: 'inline-block',
                  fontSize: '12px',
                  color: '#34d399',
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontWeight: 600
                }}>
                  Top 2% Daily Deep Work
                </div>
              </div>

              {/* Weekly Streak Bar Chart */}
              <div style={{
                width: '380px',
                padding: '32px',
                borderRadius: '24px',
                backgroundColor: '#121218',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>Weekly Consistency</span>
                  <span style={{ fontSize: '12px', color: '#f97316', fontWeight: 600 }}>🔥 7-Day Streak</span>
                </div>

                {/* Bars */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '140px', paddingTop: '20px' }}>
                  {[
                    { day: 'Mon', h: 70 },
                    { day: 'Tue', h: 85 },
                    { day: 'Wed', h: 90 },
                    { day: 'Thu', h: 75 },
                    { day: 'Fri', h: 95 },
                    { day: 'Sat', h: 60 },
                    { day: 'Today', h: Math.min(100, (scoreCounter / 96) * 100), active: true }
                  ].map((bar, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '28px',
                        height: `${bar.h}%`,
                        borderRadius: '6px',
                        backgroundColor: bar.active ? '#f97316' : 'rgba(255,255,255,0.15)',
                        boxShadow: bar.active ? '0 0 16px rgba(249, 115, 22, 0.5)' : 'none',
                        transition: 'height 0.3s ease'
                      }} />
                      <span style={{ fontSize: '11px', color: bar.active ? '#fff' : '#6b7280', fontWeight: bar.active ? 700 : 400 }}>
                        {bar.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Timeline Indicator at bottom */}
      <div style={{ height: '3px', backgroundColor: 'rgba(255,255,255,0.06)', width: '100%' }}>
        <div style={{
          height: '100%',
          width: `${(frame / 240) * 100}%`,
          backgroundColor: '#f97316'
        }} />
      </div>
    </div>
  );
};

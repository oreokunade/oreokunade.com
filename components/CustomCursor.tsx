import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, follower], {
        scale: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        mixBlendMode: 'difference',
        duration: 0.3
      });
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, follower], {
        scale: 1,
        backgroundColor: 'transparent',
        mixBlendMode: 'normal',
        duration: 0.3
      });
    };

    window.addEventListener('mousemove', moveCursor);

    const interactiveElements = document.querySelectorAll('[data-hover="true"], a, button');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-neutral-900 dark:bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-neutral-900 dark:border-white rounded-full pointer-events-none z-[9998] mix-blend-difference hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

export default CustomCursor;
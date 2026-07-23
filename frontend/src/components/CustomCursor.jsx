import { useEffect, useState, useRef } from 'react';
import styles from './CustomCursor.module.css';

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      setPosition({ x: clientX, y: clientY });

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${clientX - 20}px, ${clientY - 20}px)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${clientX - 4}px, ${clientY - 4}px)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${clientX - 50}px, ${clientY - 50}px)`;
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = () => {
      const target = document.querySelector(':hover');
      if (target) {
        const isInteractive = 
          target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.closest('a') || 
          target.closest('button') ||
          target.closest('[role="button"]') ||
          target.classList?.contains('interactive');
        
        setIsHovering(!!isInteractive);
      }
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);

    const checkHover = () => {
      const target = document.querySelector(':hover');
      if (target) {
        const isInteractive = 
          target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.closest('a') || 
          target.closest('button') ||
          target.closest('[role="button"]');
        setIsHovering(!!isInteractive);
      }
    };

    document.addEventListener('mouseover', checkHover);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseover', checkHover);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Glow Effect */}
      <div 
        ref={glowRef}
        className={`${styles.cursorGlow} ${isHovering ? styles.hover : ''} ${isClicking ? styles.clicking : ''}`}
      />
      {/* Main Cursor */}
      <div 
        ref={cursorRef}
        className={`${styles.cursor} ${isHovering ? styles.hover : ''} ${isClicking ? styles.clicking : ''}`}
      />
      {/* Cursor Dot */}
      <div 
        ref={cursorDotRef}
        className={`${styles.cursorDot} ${isHovering ? styles.hover : ''} ${isClicking ? styles.clicking : ''}`}
      />
    </>
  );
}

export default CustomCursor;
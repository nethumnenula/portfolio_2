import styles from './Loading.module.css';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Loading({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 12;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onLoadingComplete, 500);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.loadingScreen}
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
        >
          <motion.div
            className={styles.loadingContent}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Logo */}
            <motion.div 
              className={styles.logo}
              animate={{ 
                scale: [1, 1.05, 1],
                transition: { duration: 2, repeat: Infinity }
              }}
            >
              <span className={styles.bracket}>&lt;</span>
              <span className={styles.name}>Nethum</span>
              <span className={styles.bracket}>/&gt;</span>
            </motion.div>

            {/* Loading Bar */}
            <div className={styles.loadingBarContainer}>
              <motion.div 
                className={styles.loadingBar}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Progress Text */}
            <div className={styles.progressText}>
              <motion.span 
                className={styles.percentage}
                key={Math.round(progress)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {Math.round(progress)}%
              </motion.span>
              <span className={styles.status}>
                {progress < 30 && 'Initializing...'}
                {progress >= 30 && progress < 60 && 'Loading assets...'}
                {progress >= 60 && progress < 90 && 'Preparing portfolio...'}
                {progress >= 90 && progress < 100 && 'Almost ready...'}
                {progress >= 100 && 'Ready!'}
              </span>
            </div>

            {/* Loading Dots */}
            <div className={styles.loadingDots}>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className={styles.dot}
                  animate={{ 
                    y: [0, -10, 0],
                    transition: { 
                      duration: 0.6, 
                      repeat: Infinity,
                      delay: i * 0.15
                    }
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Loading;
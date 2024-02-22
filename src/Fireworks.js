import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const Fireworks = () => {
  useEffect(() => {
    const end = Date.now() + (15 * 1000);

    // Launch a new confetti every 250 milliseconds
    const interval = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }

      const particleRatio = 0.5;
      const options = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        shapes: ['square', 'circle'],
        zIndex: 1000,
        particleCount: 100,
        origin: {
          x: Math.random(),
          // since they fall down, start a bit higher than random
          y: Math.random() - 0.2
        }
      };

      confetti(Object.assign({}, options, { particleRatio: 0.1 }));
      confetti(Object.assign({}, options, { particleRatio: 1.0 }));
    }, 250);
  }, []);

  return null;
};

export default Fireworks;

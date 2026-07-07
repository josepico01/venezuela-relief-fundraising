import confetti from 'canvas-confetti';

// Global Confetti Trigger to prevent Scope reference or hoisting compilation issues inside asynchronous tasks
export function triggerConfetti() {
  const colors = ['#FFCC00', '#00247D', '#CF142B', '#FFFFFF'];

  confetti({
    particleCount: 100,
    angle: 60,
    spread: 60,
    origin: { x: 0 },
    colors: colors
  });

  confetti({
    particleCount: 100,
    angle: 120,
    spread: 60,
    origin: { x: 1 },
    colors: colors
  });

  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.6 },
    colors: colors
  });
}

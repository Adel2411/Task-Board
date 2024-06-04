const gradientBackground = {
  initial: {
    background:
      "linear-gradient(90deg, rgba(120,100,0,1) 0%, rgba(255,255,255,0) 100%)",
  },
  animate: {
    background: [
      "linear-gradient(0deg, rgba(120,100,255,1) 0%, rgba(255,255,255,0) 100%)",
      "linear-gradient(90deg, rgba(120,100,255,1) 0%, rgba(255,255,255,0) 100%)",
      "linear-gradient(270deg, rgba(120,100,255,1) 0%, rgba(255,255,255,0) 100%)",
      "linear-gradient(360deg, rgba(120,100,255,1) 0%, rgba(255,255,255,0) 100%)",
    ],
    transition: {
      type: "tween",
      ease: "linear",
      duration: 3,
      repeat: Infinity,
    },
  },
};

const gradientBackgroundDark = {
  initial: {
    background:
      "linear-gradient(90deg, rgba(190,0,0,1) 0%, rgba(0,0,0,0) 100%)",
  },
  animate: {
    background: [
      "linear-gradient(0deg, rgba(190,0,0,1) 0%, rgba(0,0,0,0) 80%)",
      "linear-gradient(90deg, rgba(190,0,0,1) 0%, rgba(0,0,0,0) 80%)",
      "linear-gradient(270deg, rgba(190,0,0,1) 0%, rgba(0,0,0,0) 80%)",
      "linear-gradient(360deg, rgba(190,0,0,1) 0%, rgba(0,0,0,0) 80%)",
    ],
    transition: {
      type: "tween",
      ease: "linear",
      duration: 3,
      repeat: Infinity,
    },
  },
};

export { gradientBackground, gradientBackgroundDark };

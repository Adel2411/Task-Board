const gradientBackground = {
  initial: {
    background:
      "linear-gradient(90deg, rgba(74, 204, 191,1) 0%, rgba(255,255,255,0) 100%)",
  },
  animate: {
    background: [
      "linear-gradient(0deg, rgba(74,204,191,1) 0%, rgba(255,255,255,0) 100%)",
      "linear-gradient(90deg, rgba(74,204,191,1) 0%, rgba(255,255,255,0) 100%)",
      "linear-gradient(270deg, rgba(74,204,191,1) 0%, rgba(255,255,255,0) 100%)",
      "linear-gradient(360deg, rgba(74,204,191,1) 0%, rgba(255,255,255,0) 100%)",
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
      "linear-gradient(90deg, rgba(150,22,35,1) 0%, rgba(0,0,0,0) 100%)",
  },
  animate: {
    background: [
      "linear-gradient(0deg, rgba(150,22,35,1) 0%, rgba(0,0,0,0) 80%)",
      "linear-gradient(90deg, rgba(150,22,35,1) 0%, rgba(0,0,0,0) 80%)",
      "linear-gradient(270deg, rgba(150,22,35,1) 0%, rgba(0,0,0,0) 80%)",
      "linear-gradient(360deg, rgba(150,22,35,1) 0%, rgba(0,0,0,0) 80%)",
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

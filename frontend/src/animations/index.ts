export const gradientBackground = {
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

export const gradientBackgroundDark = {
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

export const buttonVariants = {
  hover: {
    scale: 1.05,
    opacity: 0.8,
    transition: {
      duration: 0.2,
      yoyo: Infinity,
    },
  },
  tap: {
    opacity: 0.6,
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

export const toastVariants = {
  hidden: {
    y: 100,
    opacity: 0,
    scale: 0,
    transition: { duration: 0.5, type: "spring" },
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, type: "spring" },
  },
};

export const choiceButtonVariants = {
  hover: {
    scale: 1.05,
    opacity: 0.8,
    transition: {
      duration: 0.2,
      yoyo: Infinity,
    },
  },
  tap: {
    opacity: 0.6,
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

import React, { useState } from "react";
import wheelMain from "../../assets/wheel-main.png";
import { motion } from "framer-motion";

const WheelPlay = () => {
  return (
    <motion.img
      src={wheelMain}
      alt='wheel-main'
      // animate={{ rotate: 360 }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        type: "tween",
        ease: "linear",
      }}
    />
  );
};

export default WheelPlay;

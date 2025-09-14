import Image from "next/image";
import React from "react";
import styles from "./card.module.css";
import { motion } from "motion/react"; 
import cls from "classnames";
const Card = ({imageUrl="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1159&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", size="medium"}:{imageUrl?: string, size?: string}) => {
  const [imgSrc, setImgSrc] = React.useState(imageUrl);
  const classMap: { [key: string]: string } = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };
  return (
    <div className={styles.container}>
      <motion.div
        whileHover={{scale: 1.1}}
        className={cls(styles.imgMotionWrapper, classMap[size])}
      >
        <Image
          src={imgSrc}
          alt="image"
          fill={true}
          className={styles.cardImg}
          onError={() => {
            console.log("error");
            setImgSrc("https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1159&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
          }}
        />
      </motion.div>
    </div>
  );
};

export default Card;

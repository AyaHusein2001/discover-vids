import React from "react";
import styles from "./banner.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
const Banner = ({title, subTitle, imageUrl,videoId}:
{title: string, subTitle: string, imageUrl: string,videoId: string}) => {
  const router = useRouter();
  const handleOnPlay = () => {
    router.push(`video/${videoId}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I ES</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subTitle} >{subTitle}</h3>
          <div className={styles.playButtonWrapper}>
            <button className={styles.btn} onClick={handleOnPlay}>
              <Image
                src="/static/play_arrow.svg"
                alt="Play icon"
                width="32"
                height="32"
              />
              <span className={styles.playText}>Play</span>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.bannerImg} style={{
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.2)), url(${imageUrl})`,
      }}></div>
    </div>
  );
};

export default Banner;

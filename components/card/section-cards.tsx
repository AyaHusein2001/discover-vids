import React from "react";
import Card from "./card";
import styles from "./section-cards.module.css";
import Link from "next/link";
import { video } from "@/types";
const SectionCards = ({title, size="medium",videos=[]}: {title: string, size?: string, videos: video[]}) => {
  return (
    <>
      {videos?.length > 0 ?
        <section className={styles.container}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.cardWrapper}>
            {videos.map((video, index) => (
              <Link key={`movie-${index}`} href={`/video/${video.videoId}`}>
              
                <Card imageUrl={video.imgUrl} size={size} /> 
              </Link>
            ))}        
          </div>      
        </section>
        :null}
    </>
  );
};

export default SectionCards;

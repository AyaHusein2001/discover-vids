import React from "react";
import Card from "./card";
import styles from "./section-cards.module.css";
import Link from "next/link";
import { video } from "@/types";
import clsx from "classnames";
const SectionCards = ({title, size="medium",videos=[],shouldWrap=false}:
{title: string, size?: string, videos: video[],shouldWrap?: boolean}) => {
  return (
    <>
      <section className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        {videos?.length > 0 ?
          <div className={clsx(shouldWrap && styles.wrap,styles.cardWrapper)}>
            {videos.map((video, index) => (
              <Link key={`movie-${index}`} href={`/video/${video.videoId}`}>          
                <Card imageUrl={video.imgUrl} size={size} /> 
              </Link>
            ))}        
          </div>      
          :null}
      </section>
    </>
  );
};

export default SectionCards;

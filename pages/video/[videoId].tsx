import { useRouter } from "next/router";
import React from "react";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";
import clsx from "classnames";
import { getYoutubeVideoById } from "@/lib/videos";
import NavBar from "@/components/navbar/navbar";

Modal.setAppElement("#__next");


export async function getStaticProps(context:any) {
  const videoId = context.params.videoId;
  const videoArray = await getYoutubeVideoById(videoId);

  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: 10, // In seconds
  };
}

export async function getStaticPaths() {
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }));

  return { paths, fallback: "blocking" };
}

const Video = ({ video }: any) => {
  console.log("🚀 ~ Video ~ video:", video);
  const router = useRouter();
  const { videoId } = router.query;

  const {
    title,
    publishedAt,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;
  return (
    <div className={styles.container}>
      <NavBar/>
      <Modal
        isOpen={true}
        contentLabel="Watch Me"
        overlayClassName={styles.overlay}
        onRequestClose={() =>router.back()}
        className={styles.modal}
      ><iframe 
          id="ytplayer"
          width="100%"
          height="360"
          className={styles.videoPlayer}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com&controls=0&rel=1`}
        ></iframe>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishedAt}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;

import SectionCards from "@/components/card/section-cards";
import NavBar from "@/components/navbar/navbar";
import Head from "next/head";
import React from "react";
import styles from "../../styles/MyList.module.css";
import { verifyToken } from "@/lib/utils";
import { GetServerSideProps,InferGetServerSidePropsType } from "next";
import { video } from "@/types";
import { getFavouritedVideos } from "@/lib/videos";

export const getServerSideProps = (async ({req}) => {

  const token = req?.cookies?.token;
  const userId = verifyToken(token as string);
     
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const myListVideos = await getFavouritedVideos((token as string),userId);
  
  return {
    props: {
      myListVideos
    },
  };
}) satisfies GetServerSideProps<
  {myListVideos: video[] }>;
const MyList = ({myListVideos}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <Head>
        <title>My list</title>
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.sectionWrapper}>
          <SectionCards shouldWrap title="My list" videos={myListVideos} size="small"/>   
        </div>
      </main>
    </div>
  );
};

export default MyList;

import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getPostsMetaData } from "./api/getPostsData";

export default function Home({ postsData }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>be.honey</title>
        <meta name="description" content="behoney, kim" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome!</h1>
      </main>      
    </div>
  );
}

export async function getStaticProps() {
  const postsData = getPostsMetaData();
  return {
    props: {
      postsData: postsData,
    },
  };
}

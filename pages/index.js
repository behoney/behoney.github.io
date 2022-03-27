import Head from "next/head";
import styles from "../styles/Home.module.css";
// import { getPostsMetaData } from "./api/getPostsData";
import { test } from "./api/notion/notionAuth";

export default function Home({ postsData }) {
  console.log(postsData);
  return (
    <div className={styles.container}>
      <Head>
        <title>be.honey</title>
        <meta name="description" content="behoney, kim" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome!</h1>
        {postsData.map(e => <Card title={e} />)}
      </main>

    </div>
  )
}

const Card = ({ title }) => {
  return (<div>
    <h2>{title}</h2>
  </div>)
}

export async function getStaticProps() {
  // const postsData = getPostsMetaData();
  const data = await test();
  return {
    props: {
      postsData: data ?? "noting loaded",
    },
  };
}

import Head from "next/head";
import styles from "../styles/Home.module.css";
// import { getPostsMetaData } from "./api/getPostsData";
import { test, testBlock } from "./api/notion/notionAuth";

export default function Home({ postsData, block }) {
  // console.log(postsData);

  return (
    <div className={styles.container}>
      <Head>
        <title>be.honey</title>
        <meta name="description" content="behoney, kim" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>



        <h1 className={styles.title}>Welcome!</h1>
        {postsData.map(e => {
          return <Card title={e.title} key={e.id} />
        })}

        {
          // why array for rich_text...?
          // weird :(
          block.map(e => <p key={e.id}>{e.paragraph.rich_text[0]?.plain_text}</p>)
        }
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

  const blocks = await testBlock(data[0].id)

  console.log("getStaticProps", blocks);
  return {
    props: {
      postsData: data ?? "noting loaded",
      block: blocks ?? []
    },
  };
}

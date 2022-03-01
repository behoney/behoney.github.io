import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { getPostData, getAllPostsPath } from "../api/getPostsData.js";

export default function Blog({ postMetadata, postContent, id }) {
  return (
    <div>
      {/* <div>{postMetadata}</div> */}

      <div>
        <MDXRemote {...postContent} />
      </div>

      <p>{id}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostsPath();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  const mdxSource = await serialize(postData.content);
  return {
    props: {
      postMetadata: postData.metadata,
      postContent: mdxSource,
      id: params.id,
    },
  };
}

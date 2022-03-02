const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const directory = path.join(process.cwd(), "posts");
const mdx_file_ext = ".mdx";

function getAllFilesInDirectory() {
  const fileNames = fs.readdirSync(directory);
  return fileNames.map((fileName) => {
    return path.parse(fileName);
  });
}

function getMdxFiles() {
  const allFiles = getAllFilesInDirectory();
  return allFiles.filter((parsedFile) => parsedFile.ext == mdx_file_ext);
}

export function getAllPostsPath() {
  const allMdxFiles = getMdxFiles();
  return allMdxFiles.map((parsedFile) => {
    return {
      params: {
        id: parsedFile.name,
      },
    };
  });
}

export function getPostsMetaData() {
  const allMdxFiles = getMdxFiles();

  const postsMetaData = allMdxFiles.map((parsedFile) => {
    const fullPath = path.join(directory, parsedFile.base);

    // get MDX metadata and content
    const fileContents = fs.readFileSync(fullPath, "utf8");
    // get metadata, content
    const { data, content } = matter(fileContents);
    let metadata = data;
    metadata["id"] = parsedFile.name;
    return metadata;
  });

  // console.log(postsMetaData);
  
  return postsMetaData;
}

export function getPostData(id) {
  const fullPath = path.join(directory, id + mdx_file_ext);

  // get MDX metadata and content
  const fileContents = fs.readFileSync(fullPath, "utf8");
  // get metadata, content
  const { data, content } = matter(fileContents);

  let metadata = data;
  metadata["id"] = id;

  return { metadata: metadata, content: content };
}

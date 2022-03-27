import { NOTION_KEY, NOTION_DATABASE_ID } from "../../APIkey/notionKey.js"
const { Client } = require("@notionhq/client")

const notion = new Client({
    auth: NOTION_KEY,
});

async function addItem(text) {
    try {
        const response = await notion.pages.create({
            parent: { database_id: NOTION_DATABASE_ID },
            properties: {
                title: {
                    title: [
                        {
                            "text": {
                                "content": text
                            }
                        }
                    ]
                }
            },
        })
        console.log(response)
        console.log("Success! Entry added.")
    } catch (error) {
        console.error(error.body)
    }
}

export async function test() {
    // console.log("hello from notion Auth.js");

    const getTitles = async () => {
        const response = await notion.search({
            sort: {
                direction: 'ascending',
                timestamp: 'last_edited_time',
            },
        });

        const pages = []
        for (const result of response.results) {
            if (result?.object === 'page')
                pages.push(result)
        }

        const titles = []
        for (const page of pages) {
            const pageId = page.id;
            const response = await notion.pages.retrieve({ page_id: pageId });
            titles.push(response.properties.post.title[0].plain_text);
        }
        return titles;
    };
    const result = await getTitles()
    console.log(result);
    return result;
}
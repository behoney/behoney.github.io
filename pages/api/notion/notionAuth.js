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
    console.log("hello from notion Auth.js");

    const results = await (async () => {
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

        for (const page of pages)
        {

            (async () => {
                const pageId = page.id;
                const response = await notion.pages.retrieve({ page_id: pageId });
                console.log(response.properties.post);
            })();
        }
    })();


    // addItem("Yurts in Big Sur, California")

    // Initializing a client

    // (async () => {
    //     const databaseId = NOTION_DATABASE_ID;
    //     const response = await notion.databases.query({
    //         database_id: databaseId,
    //         filter: {
    //             or: [
    //                 {
    //                     property: 'post',
    //                     rich_text: {
    //                         "contains": "Test"
    //                     }
    //                     // text: {
    //                     //   equals: true,
    //                     // },
    //                 },
    //                 // {
    //                 //     property: 'Cost of next trip',
    //                 //     number: {
    //                 //         greater_than_or_equal_to: 2,
    //                 //     },
    //                 // },
    //             ],
    //         },
    //         sorts: [
    //             {
    //                 property: 'Last ordered',
    //                 direction: 'ascending',
    //             },
    //         ],
    //     });
    //     return response;

    // })().then((res) => { return res });

    return "huh?"
}
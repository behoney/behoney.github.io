import { NOTION_KEY, NOTION_DATABASE_ID } from "../../APIkey/notionKey.js"
const { Client } = require("@notionhq/client")

// Initializing a client
const notion = new Client({
    auth: NOTION_KEY,
});


(async () => {
    const databaseId = NOTION_DATABASE_ID;
    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
            // or: [
            //   {
            //     property: 'In stock',
            //     checkbox: {
            //       equals: true,
            //     },
            //   },
            //   {
            //     property: 'Cost of next trip',
            //     number: {
            //       greater_than_or_equal_to: 2,
            //     },
            //   },
            // ],
        },
        sorts: [
            // {
            //   property: 'Last ordered',
            //   direction: 'ascending',
            // },
        ],
    });
    console.log(response);
})();




export function test() {
    console.log("hello from notion Auth.js");
}
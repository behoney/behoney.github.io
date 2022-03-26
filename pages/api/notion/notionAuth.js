const { Client } = require("@notionhq/client")

// Initializing a client
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})


export function test() {
    console.log("hello from notion Auth.js");
}
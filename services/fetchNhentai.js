import { API, TagTypes, book } from 'nhentai-api';
const api = new API();
const tag = book.tags[0]; // Tag

console.log(tag)

module.exports = tag
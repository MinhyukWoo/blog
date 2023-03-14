export class Article {
  title: string;
  author: string;
  body: string;
  key: number;
  constructor(key: number, title: string, author: string, body: string) {
    this.key = key;
    this.title = title;
    this.author = author;
    this.body = body;
  }
}

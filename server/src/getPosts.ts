import axios, { AxiosResponse } from 'axios';
const stringify = require('fast-json-stable-stringify');
const fs = require('fs');

const url = 'http://jsonplaceholder.typicode.com/posts';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Posts {
  posts: Array<Post>;
}

axios
  .get<Posts>(url)
  .then((res: AxiosResponse<Posts>) => {
    const { data: posts } = res;
    const data = stringify(posts, null, 2);
    fs.writeFileSync('posts.json', data);
  })
  .catch((err) => {
    console.log(err);
  });

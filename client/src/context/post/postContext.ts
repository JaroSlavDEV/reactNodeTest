import { createContext } from 'react';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostContextInterface {
  posts: Array<Post>;
  loading: boolean;
  showLoader: () => void;
  removePost: (id: number) => void;
  fetchPosts: () => void;
}

export const PostContext = createContext({} as PostContextInterface);

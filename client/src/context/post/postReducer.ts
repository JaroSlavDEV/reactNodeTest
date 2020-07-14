import { FETCH_POSTS, REMOVE_POST, SHOW_LOADER } from '../types';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface StateInterface {
  posts: Array<Post>;
  loading: boolean;
}

interface ActionInterface {
  type: string;
  payload?: any;
}

const handlers = {
  [SHOW_LOADER]: state => ({ ...state, loading: true }),
  [FETCH_POSTS]: (state, { payload }) => ({
    ...state,
    posts: payload,
    loading: false,
  }),
  [REMOVE_POST]: (state, { payload }) => ({
    ...state,
    posts: state.posts.filter((post) => post.id !== payload),
  }),
  DEFAULT: state => state,
};

export const postReducer = (state: StateInterface, action:ActionInterface) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

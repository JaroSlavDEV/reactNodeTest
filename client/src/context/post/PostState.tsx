import React, { useReducer } from 'react';
import { PostContext } from './postContext';
import { postReducer } from './postReducer';
import { FETCH_POSTS, REMOVE_POST, SHOW_LOADER } from '../types';
import { getPostsApi, removePostApi } from '../api';

export const PostState: React.FC = ({ children }) => {
  const initialState = {
    posts: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(postReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const fetchPosts = async () => {
    showLoader();
    const res = await getPostsApi();
    const payload = res.data

    dispatch({ type: FETCH_POSTS, payload });
  };

  const removePost = async (id: number) => {
    await removePostApi(id);

    dispatch({ type: REMOVE_POST, payload: id });
  };

  return (
    <PostContext.Provider
      value={{
        showLoader,
        removePost,
        fetchPosts,
        loading: state.loading,
        posts: state.posts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

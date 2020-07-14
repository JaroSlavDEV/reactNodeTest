import React, { useReducer } from 'react';
import { UserContext } from './userContext';
import { userReducer } from './userReducer';
import { START_SIGNIN, SUCCESS_SIGNIN, FAIL_SIGNIN, SIGNOUT } from '../types';

export const UserState: React.FC = ({ children }) => {
  const initialState = {
    user: null,
    loading: false,
  };
  const [state, dispatch] = useReducer(userReducer, initialState);

  const startSignIn = () => dispatch({ type: START_SIGNIN });

  interface UserInterface {
    email: string;
  }
  const successSignIn = (user: UserInterface, authorization: string) => {
    localStorage.setItem('authorization', JSON.stringify(authorization));

    dispatch({ type: SUCCESS_SIGNIN, payload: user });
  };

  const failSignIn = () => {
    localStorage.removeItem('authorization');

    dispatch({ type: FAIL_SIGNIN });
  };

  const signOut = () => {
    localStorage.removeItem('authorization');

    dispatch({ type: SIGNOUT });
  };

  return (
    <UserContext.Provider
      value={{
        startSignIn,
        successSignIn,
        failSignIn,
        signOut,
        loading: state.loading,
        user: state.user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

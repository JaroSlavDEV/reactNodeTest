import { START_SIGNIN, SUCCESS_SIGNIN, FAIL_SIGNIN, SIGNOUT } from '../types';

interface UserInterface {
  email: string
}

interface StateInterface {
  loading: boolean,
  user: UserInterface | null;
}

interface ActionInterface {
  type: string;
  payload?: any;
}

const handlers = {
  [START_SIGNIN]: state => ({ ...state, loading: true }),
  [SUCCESS_SIGNIN]: (state, { payload }) => ({
    ...state,
    user: payload,
    loading: false,
  }),
  [FAIL_SIGNIN]: state => ({
    ...state,
    loading: false,
  }),
  [SIGNOUT]: state => ({
    ...state,
    user: null,
  }),
  DEFAULT: state => state,
};

export const userReducer = (state: StateInterface, action: ActionInterface) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

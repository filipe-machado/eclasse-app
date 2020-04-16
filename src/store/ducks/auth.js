import { createStore } from 'redux';

export const Types = {
  LOGIN: 'auth/LOGIN',
  LOGOUT: 'auth/LOGOUT',
};

const initialState = {
  isLogged: false,
  token: null,
  user: {},
};

export function login(state = initialState, action) {
  switch (action.type) {
    case 'auth/LOGIN':
      return {
        ...state, token: action.token, isLogged: action.isLogged, user: action.user,
      };
    case 'auth/LOGOUT':
      return {
        ...state, token: null, isLogged: false, user: {},
      };
    default:
      return state;
  }
}

export function logout() {
  return {
    type: Types.LOGOUT,
  };
}

const store = createStore(login);
export { store };

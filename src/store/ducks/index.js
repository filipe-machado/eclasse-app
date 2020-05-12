export const Types = {
  LOGIN: 'auth/LOGIN',
  LOGOUT: 'auth/LOGOUT',
  MENU: 'MENU',
};

const initialState = {
  isLogged: false,
  token: null,
  user: {},
  menu: [],
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case Types.LOGIN:
      return {
        ...state,
        token: action.token,
        isLogged: action.isLogged,
        user: {
          ...state.user, ...action.user,
        },
      };
    case Types.MENU:
      return {
        ...state,
        menu: [
          ...action.menu,
        ],
      };
    case Types.LOGOUT:
      return {
        ...state, isLogged: false, token: null, menu: [], user: {},
      };
    default:
      return { ...state };
  }
}

export function logout() {
  return {
    type: Types.LOGOUT,
  };
}

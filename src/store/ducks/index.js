export const Types = {
  LOGIN: 'auth/LOGIN',
  LOGOUT: 'auth/LOGOUT',
};

const initialState = {
  isLogged: false,
  token: null,
  user: {},
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
    case Types.LOGOUT:
      return {
        ...state, token: null, isLogged: false, user: {},
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

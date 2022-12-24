const SET_USERS = "SET_USERS";
const SET_USER = "SET_USER";
const GOT_USERS = "GOT_USER";
const SET_FAVORITES = "SET_FAVORITES";
const REMOVE_FAVORITE = "REMOVE_FAVORITES";

const defaultState = {
  users: [],
  user: {},
  gotUsers: false,
  favorites: [],
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USERS: {
      return {
        ...state,
        users: [...action.payload.map((u) => ({ ...u, isFavorite: false }))],
      };
    }
    case SET_USER: {
      return {
        ...state,
        user: { ...action.payload }, 
        users: state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user)
      };
    }
    case GOT_USERS: {
      return { ...state, gotUsers: true };
    }
    case SET_FAVORITES: {
      return {
        ...state,
        favorites: [
          ...new Map(state.favorites.map((f) => [f.id, f])).values(),
          action.payload,
        ],
        users: state.users.map(user => user.id === action.payload.id ? action.payload : user)
      };
    }
    case REMOVE_FAVORITE: {
      return {
        ...state,
        favorites: state.favorites.filter(
          (fav) => fav.id !== action.payload.id
        ),
        users: state.users.map(user => user.id === action.payload.id ? {...action.payload, isFavorite: false} : user),
      };
    }
    default:
      return state;
  }
};

export const setUsersAc = (payload) => ({ type: SET_USERS, payload });
export const setUserAc = (payload) => ({ type: SET_USER, payload });
export const gotUsersAc = () => ({ type: GOT_USERS });
export const setFavoritesAc = (payload) => ({ type: SET_FAVORITES, payload });
export const removeFavoriteAc = (payload) => ({
  type: REMOVE_FAVORITE,
  payload,
});

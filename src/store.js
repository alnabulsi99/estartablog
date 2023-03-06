import { createStore } from "redux";
import { combineReducers } from "redux";
const initialState = {
  loading: false,
  error: null,
  blogs: [],
  activeBlog: {},
};
const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, blogs: action.payload };
      case "FETCH_BLOG":
      return { ...state, loading: false, activeBlog: action.payload };
      case "FETCH_CLEAN":
        return { ...state, activeBlog: {} };
    default:
      return state;
  }
};

const Allreducers = combineReducers({
  blogsReducer,
});

const store = createStore(Allreducers);
export default store;



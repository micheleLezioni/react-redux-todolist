import { createStore } from "redux";
import mainReducer from "../reducers/mainReducer";

const initialState = {
  taskList: [],
  visibilityFilter: {
    SHOW_ALL: true
  }
};

//senza initialState lo state iniziale è undefined

export const configureStore = () => {
  return createStore(
    mainReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

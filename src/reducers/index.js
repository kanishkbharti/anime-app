import animes from "./animes_reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  animes,
});

export default rootReducer;

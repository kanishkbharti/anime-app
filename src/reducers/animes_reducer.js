import { ANIMES } from "../actions";
export default function animes(state = [], action) {
  switch (action.type) {
    case ANIMES:
      return action.items;
    default:
      return state;
  }
}

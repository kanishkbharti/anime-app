export const ANIMES = "ANIMES";

export function animes(items) {
  const action = {
    type: ANIMES,
    items,
  };
  return action;
}

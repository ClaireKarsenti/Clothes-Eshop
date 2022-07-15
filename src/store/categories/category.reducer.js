import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  erro: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true }; //When I start, I loading
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS: //If I succeed I stop loading, and I have a correct payload
      return { ...state, categories: payload, isLoading: false };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED: //If I fail I stop loading and I have an error
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};

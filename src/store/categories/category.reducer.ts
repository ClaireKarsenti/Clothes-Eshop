import { AnyAction } from "redux";

import { Category } from "./category.types";

import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";

//State values
export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

//Initial state
export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action: AnyAction
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    //When I start, I loading
    return { ...state, isLoading: true };
  }

  if (fetchCategoriesSuccess.match(action)) {
    //If I succeed I stop loading, and I have a correct payload
    return { ...state, categories: action.payload, isLoading: false };
  }

  if (fetchCategoriesFailed.match(action)) {
    //If I fail I stop loading and I have an error
    return { ...state, error: action.payload, isLoading: false };
  }

  return state;
};

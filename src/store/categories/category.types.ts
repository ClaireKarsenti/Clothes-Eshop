export enum CATEGORIES_ACTION_TYPES {
  FETCH_CATEGORIES_START = "category/FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_SUCCESS = "category/FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILED = "category/FETCH_CATEGORIES_FAILED",
}

//The syntax category/ refer to which section of my store this is governed by.

export type CategoryItem = {
  id: number;
  imageUrel: string;
  name: string;
  price: number;
};

export type Category = {
  title: string;
  imageUrel: string;
  items: CategoryItem[];
};

export type CategoryMap = {
  [key: string]: CategoryItem[]


}

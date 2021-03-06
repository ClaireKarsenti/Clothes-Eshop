import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import CategoriesPreview from "../categories-preview/cartegories-preview.component";
import Category from "../category/category.component";

import { fetchCategoriesStart } from "../../store/categories/category.action";

const Shop = () => {
  const dispatch = useDispatch();

  //I call the getCategoriesAndDocuments method so I can have access to the data of each categories and documents
  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;

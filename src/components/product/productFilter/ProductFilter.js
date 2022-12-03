import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {FILTER_BY_CATEGORY} from "../../../redux/slice/filterSlice";
import {selectProducts,} from "../../../redux/slice/productSlice";
import styles from "./ProductFilter.module.scss";

const ProductFilter = () => {
  const [category, setCategory] = useState("All");
  const products = useSelector(selectProducts);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filterProducts = (cate) => {
    setCategory(cate); //category (cate)
    dispatch(FILTER_BY_CATEGORY({ products, category: cate }));
  };

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cate, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${category}` === cate ? `${styles.active}` : null}
              onClick={() => filterProducts(cate)}
            >
              &#8250; {cate}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductFilter;

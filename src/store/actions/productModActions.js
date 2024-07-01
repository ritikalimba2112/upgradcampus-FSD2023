import { getCategories } from "../../services/getCategories"
export const fetchCategoriesSuccess= (categories) => {
   return {
      type: "FETCH_CATEGORIES_SUCCESS",
      payload: categories
   }
}
export const fetchCategoriesFailed = (error) => {
   return {
      type: "FETCH_CATEGORIES_FAILED",
      payload: error
   }
}

export const fetchCategories = () => {
   return (dispatch) => {
      getCategories().then((response) => {
         const categories = ["All", ...response.data]
         dispatch(fetchCategoriesSuccess(categories))
      })
         .catch((error) => {
            dispatch(fetchCategoriesFailed(error))
         })
   }
}

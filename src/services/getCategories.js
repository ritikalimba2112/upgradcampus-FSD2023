import axios from "axios";

export const getCategories = () => {
   console.log('Calling API to get categories')
   return axios.get("http://localhost:8080/api/products/categories")
} 
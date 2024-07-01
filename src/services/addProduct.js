import axios from "axios";

export const addProduct = (product) => {
   console.log('Calling API to add product ' + product);
   let token = localStorage.getItem('token');
   let data = { ...product }
   console.log(product);
   return axios.post("http://localhost:8080/api/products", data, {
      headers: { Authorization: `Bearer ${token}` }
   })
} 
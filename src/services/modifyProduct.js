import axios from "axios";

export const modifyProduct = (productId, productDetail) => {
   console.log('Calling API to modify ID ' + productId);
   let token = localStorage.getItem('token');
   let data = { ...productDetail, id: productId }
   return axios.put("http://localhost:8080/api/products/" + productId, data, {
      headers: { Authorization: `Bearer ${token}` }
   })
}

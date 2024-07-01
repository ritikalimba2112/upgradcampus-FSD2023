import axios from "axios";

export const deleteProduct = (productId) => {
   console.log('Calling API to delete product ID ' + productId);
   let token = localStorage.getItem('token');
   return axios.delete("http://localhost:8080/api/products/" + productId, {
      headers: { Authorization: `Bearer ${token}` }
   })
}

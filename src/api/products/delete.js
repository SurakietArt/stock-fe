//Delete product from table products
import BASE_URL from '../BASE_URL.js'
import axios from 'axios'

const deleteProduct = (body, action) => {
   //Create Headers
   const headers = { token: body.TOKEN }
   
   axios.delete(`${BASE_URL}/items/${body.id}`,{
      headers,
   })
      .then(res => {
         console.log(res)
         if (res.status === 204) {
            action(true)
         } else action(false)
      })
      .catch(err => {
         console.log(err)
      })
}

export default deleteProduct
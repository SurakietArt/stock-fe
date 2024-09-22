import axios from 'axios'
import BASE_URL from '../BASE_URL'

const update = (body, success, id) => {
   //Create Headers
   const headers = { headers: { token: body.TOKEN } }
   
   axios.patch(`${BASE_URL}/items/${id}`, body, headers)
      .then(res => {
         success(res)
      })
      .catch(err => {
         console.log(err)
      })
}

export default update
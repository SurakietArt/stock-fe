//Get all category from server
import BASE_URL from '../BASE_URL.js'
import axios from 'axios'

const units = callback => {
    //Get TOKEN
    const headers = { headers: { token: localStorage.getItem('TOKEN') } }

    axios.get(`${BASE_URL}/units`, headers)
        .then(res => {
            if ( res.status === 200 ) callback(true, res)
        })
        .catch(err => console.log(err))
}

export default units

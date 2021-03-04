
import axios from 'axios'

export const request =(obj)=>{
    const intanes=axios.create({
        baseURL:"/api/",
        timeout: 5000,
        // headers: { 'X-Custom-Header': 'foobar' }
    })

    return intanes(obj)
}
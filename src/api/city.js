import {request} from '@/utils/request.js'

export const cityGetCityInfo=()=>{
    return request({
        url:'posts/cities',
        method:"get",
        
    })
}
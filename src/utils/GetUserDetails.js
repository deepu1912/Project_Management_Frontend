import Cookies from "js-cookie"
import { toast } from "react-toastify"

const GetUserDetails = async()=>{
    try {
        const token= Cookies.get('token')
        if(!token){
            toast.error('Please login')
        }
        const userDetailsResponse = await fetch('http://localhost:8000/api/user/getUserDetails',{
            method:'get',
            headers:{
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        })
        const userDetailJson = await userDetailsResponse.json()
        // console.log(userDetailJson)
        return userDetailJson
    } catch (error) {
        console.log(error || error.message)
    }
}
export default GetUserDetails
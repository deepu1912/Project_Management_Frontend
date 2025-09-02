import Cookies from "js-cookie"
import { toast } from "react-toastify"


const getSpaceDetails = async()=>{
    try {
        const token = Cookies.get('token')
        if(!token){
            toast.error('PLease log in')
        }
        const spaceResponse = await fetch('http://localhost:8000/api/spaces/getAllSpaces',{
            method:'get',
            headers:{
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        })
        const spaceJson = await spaceResponse.json()
        // console.log(userDetailJson)
        return spaceJson
    } catch (error) {
        console.log(error || error.message)
    }
}

export default getSpaceDetails
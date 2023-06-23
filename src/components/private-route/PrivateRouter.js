import { useSelector } from "react-redux"

export const PrivateRoute = ({children}) =>{
    const {user} = useSelector(state)
}
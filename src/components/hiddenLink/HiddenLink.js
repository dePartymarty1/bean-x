import { useSelector } from 'react-redux' //can select any info we want from store
import { selectIsLoggedIn } from '../../redux/slice/authSlice'


const ShowOnLogin = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if (isLoggedIn) {
        // if logged is true return children
        return children
    }
    return null;
}

export const ShowOnLogout = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if (!isLoggedIn) {
        // if logged is true return children
        return children
    }
    return null;
}


export default ShowOnLogin
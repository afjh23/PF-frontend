/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'

const PrivateRoute = ({ element: Element }) => {
    const { auth } = useContext(AuthContext)

    return auth && auth.token ? <Element /> : <Navigate to="/login" />
}

export default PrivateRoute
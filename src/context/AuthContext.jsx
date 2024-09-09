import { useMutation, useQuery } from '@tanstack/react-query'
import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, infoUser } from '../services/service'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [auth, setAuth] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setAuth({ token })

            // Obtenemos la información del usuario si hay un token
            infoUser()
                .then((data) => {
                    setUser(data)
                    setAuth((prevAuth) => ({ ...prevAuth, rol: data.rol }))
                })
                .catch((error) => {
                    console.error('Error fetching user on load:', error)
                    logout() // Si hay un error al obtener el usuario, cerramos sesión
                })
        }
    }, [])

    const { data: userData, isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn: infoUser,
        enabled: !!auth, // Solo ejecuta la consulta si hay un token
        onSuccess: (data) => {
            setUser(data) // Guardamos los datos del usuario en el estado
            setAuth((prevAuth) => ({ ...prevAuth, rol: data.rol })) // Guardamos el rol del usuario en el estado de auth
        },
        onError: (error) => {
            console.error('Error fetching user in query:', error)
            logout() // Si hay un error, cerramos sesión
        }
    })

    const login = (token) => {
        localStorage.setItem('token', token)
        setAuth({ token })
    }

    const logout = () => {
        localStorage.removeItem('token')
        setAuth(null)
        setUser(null)
        navigate('/login')
    }

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (response) => {
            const { token, user } = response.data
            localStorage.setItem('token', token)
            setAuth({ token, rol: user.rol }) // Guardamos el token y el rol
            setUser(user)
            navigate('/dashboard')
        },
        onError: (error) => {
            alert(error.response.data.message)
        }
    })

    return (
        <AuthContext.Provider value={{ auth, user, loginMutation, logout, isLoading, isError }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }
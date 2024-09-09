import { createContext, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { crearUsuario, usuariosAll } from '../services/service'

const UsuarioContext = createContext()

const UsuarioProvider = ({ children }) => {
    const queryClient = useQueryClient()
    const [mensaje, setMensaje] = useState(null)
    const { data: usuarios, isLoading, isError } = useQuery({
        queryKey: ['usuarios'],
        queryFn: usuariosAll,
    })

    const crearUsuarioMutation = useMutation({
        mutationFn: crearUsuario,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['usuarios'] })
            setMensaje('Usuario creado exitosamente')
        },
        onError: (error) => {
            setMensaje('Error al crear el usuario: ' + error.message)
        }
    })

    const crearNuevoUsuario = (data) => {
        crearUsuarioMutation.mutate(data)
    }

    return (
        <UsuarioContext.Provider value={{
            usuarios,
            isLoading,
            isError,
            crearNuevoUsuario,

            mensaje
        }}>
            {children}
        </UsuarioContext.Provider>
    )
}

export { UsuarioProvider, UsuarioContext }
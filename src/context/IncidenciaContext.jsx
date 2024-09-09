import { createContext, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { crearIncidencia, incidenciasAll, editarIncidencia, eliminarIncidencia, editarStatus } from '../services/service'

const IncidenciaContext = createContext()

const IncidenciaProvider = ({ children }) => {
    const queryClient = useQueryClient()
    const [mensaje, setMensaje] = useState(null)

    const { data: incidencias, isLoading, isError } = useQuery({
        queryKey: ['incidencias'],
        queryFn: incidenciasAll,
    })

    const crearIncidenciaMutation = useMutation({
        mutationFn: crearIncidencia,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['incidencias'] })
            setMensaje('Incidencia creada exitosamente')
        },
        onError: (error) => {
            setMensaje('Error al crear la incidencia: ' + error.message)
        }
    })

    const editarIncidenciaMutation = useMutation({
        mutationFn: editarIncidencia,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['incidencias'] })
            setMensaje('Incidencia actualizada exitosamente')
        },
        onError: (error) => {
            setMensaje('Error al editar la incidencia: ' + error.message)
        }
    })

    const eliminarIncidenciaMutation = useMutation({
        mutationFn: eliminarIncidencia,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['incidencias'] })
            setMensaje('Incidencia eliminada exitosamente')
        },
        onError: (error) => {
            setMensaje('Error al eliminar la incidencia: ' + error.message)
        }
    })

    const editarEstadoIncidenciaMutation = useMutation({
        mutationFn: editarStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['incidencias'] })
            setMensaje('Estado de la incidencia actualizado exitosamente')
        },
        onError: (error) => {
            setMensaje('Error al actualizar el estado de la incidencia: ' + error.message)
        }
    })

    const crearNuevaIncidencia = (data) => {
        crearIncidenciaMutation.mutate(data)
    }

    const editarIncidenciaExistente = (id, data) => {
        editarIncidenciaMutation.mutate({ id, ...data })
    }

    const eliminarIncidenciaExistente = (id) => {
        eliminarIncidenciaMutation.mutate(id)
    }

    const actualizarEstadoIncidencia = (id, estado) => {
        editarEstadoIncidenciaMutation.mutate({ id, estado })
    }

    return (
        <IncidenciaContext.Provider value={{
            incidencias,
            isLoading,
            isError,
            crearNuevaIncidencia,
            editarIncidenciaExistente,
            eliminarIncidenciaExistente,
            actualizarEstadoIncidencia,
            mensaje
        }}>
            {children}
        </IncidenciaContext.Provider>
    )
}

export { IncidenciaProvider, IncidenciaContext }
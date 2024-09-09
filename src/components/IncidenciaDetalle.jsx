import { useState, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { incidenciaById, agregarComentario } from '../services/service'
import { AuthContext } from '../context/AuthContext' 

const IncidenciaDetalle = () => {
    const { id } = useParams() 
    const queryClient = useQueryClient()
    const { user } = useContext(AuthContext) 
    const [nuevoComentario, setNuevoComentario] = useState('')

    const { data: incidencia, isLoading, isError } = useQuery({
        queryKey: ['incidencia', id],
        queryFn: () => incidenciaById({ id }),
        enabled: !!id 
    })

    const mutationAgregarComentario = useMutation({
        mutationFn: (comentarioData) => agregarComentario(comentarioData),
        onSuccess: () => {
            queryClient.invalidateQueries(['incidencia', id]) 
            setNuevoComentario('') 
        }
    })

    const handleAgregarComentario = (e) => {
        e.preventDefault()
        const comentarioData = {
            comentario: nuevoComentario,
            id_incidencia: id, 
            id_usuario: user.id
        }
        mutationAgregarComentario.mutate(comentarioData)
    }

    if (isLoading) return <p>Cargando detalles de la incidencia...</p>
    if (isError) return <p>Error al cargar detalles de la incidencia</p>

    if (!incidencia) {
        return <p>No se encontró la incidencia</p>
    }
    const comentarios = Array.isArray(incidencia.comentarios) ? incidencia.comentarios : []

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">{incidencia.asunto}</h2>
            <p className='mb-2'>{incidencia.descripcion}</p>
            <p>Tipo: {incidencia.tipo}</p>
            <p>Estado: {incidencia.estado}</p>
            <p>Fecha de reporte: {new Date(incidencia.fecha_reporte).toLocaleDateString()}</p>

            <h3 className="text-xl font-semibold mt-4 text-center">Comentarios</h3>
            <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                    {comentarios.length > 0 ? (
                        comentarios.map(comentario => (
                            <tr key={comentario.id_comentarios}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span>{comentario.texto_comentario}</span>
                                    <div className='text-xs flex gap-2 items-end justify-end'>
                                        <span>{comentario.usuario.nombre} - {comentario.usuario.cargo}</span>
                                        <span>{new Date(comentario.fecha_creacion).toLocaleDateString()}</span>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="px-6 py-4 text-center">No hay comentarios para esta incidencia.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <h3 className="text-xl font-semibold mt-4">Agregar Comentario</h3>
            <form onSubmit={handleAgregarComentario} className="mt-4">
                <textarea
                    value={nuevoComentario}
                    onChange={(e) => setNuevoComentario(e.target.value)}
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Escribe tu comentario aquí..."
                    required
                />
                <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Agregar Comentario
                </button>
            </form>
        </div>
    )
}

export default IncidenciaDetalle
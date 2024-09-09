import { useContext, useEffect, useState } from 'react'
import { IncidenciaContext } from '../context/IncidenciaContext'
import { AuthContext } from '../context/AuthContext'

export const MisIncidencias = () => {
  const { incidencias, isLoading, isError, editarIncidenciaExistente, eliminarIncidenciaExistente, mensaje } = useContext(IncidenciaContext)
  const {user}  = useContext(AuthContext)
  const [editando, setEditando] = useState(null) 
    const [formData, setFormData] = useState({
        asunto: '',
        tipo: '',
        descripcion: ''
    })
    const[misIncidencias, setMisIncidencias]=useState([])
    
    useEffect(() => {
        const userIncidencias=  incidencias.filter(incidencia => incidencia.id_usuario === user.id)
        setMisIncidencias(userIncidencias)
    }, [incidencias, user.id])
    

    if (isLoading) return <p>Cargando incidencias...</p>
    if (isError) return <p>Error al cargar incidencias</p>

    const handleEditar = (id, incidencia) => {
        setEditando(id) 
        setFormData({
            asunto: incidencia.asunto,
            tipo: incidencia.tipo,
            descripcion: incidencia.descripcion
        })
    }

    const handleGuardar = (id) => {
        editarIncidenciaExistente(id, formData)
        setEditando(null) 
    }

    const handleEliminar = (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar esta incidencia?")) {
            eliminarIncidenciaExistente(id)
        }
    }
    
    return (
        <div className="p-4 max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Listado de Incidencias</h2>
            {mensaje && <div className="mb-4 text-green-500">{mensaje}</div>}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4">Asunto</th>
                        <th className="py-2 px-4">Tipo</th>
                        <th className="py-2 px-4">Estado</th>
                        <th className="py-2 px-4">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {misIncidencias?.map((incidencia) => (
                        <tr key={incidencia.id_incidencia}>
                            <td className="py-2 px-4">
                                {editando === incidencia.id_incidencia ? (
                                    <input
                                        type="text"
                                        value={formData.asunto}
                                        onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                                        className="border p-1"
                                    />
                                ) : (
                                    incidencia.asunto
                                )}
                            </td>
                            <td className="py-2 px-4">
                                {editando === incidencia.id_incidencia ? (
                                    <input
                                        type="text"
                                        value={formData.tipo}
                                        onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                                        className="border p-1"
                                    />
                                ) : (
                                    incidencia.tipo
                                )}
                            </td>
                            <td className="py-2 px-4">{incidencia.estado}</td>
                            <td className="py-2 px-4 flex gap-2">
                                {editando === incidencia.id_incidencia ? (
                                    <button
                                        onClick={() => handleGuardar(incidencia.id_incidencia)}
                                        className="bg-green-500 text-white py-1 px-2 rounded"
                                    >
                                        Guardar
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEditar(incidencia.id_incidencia, incidencia)}
                                        className="bg-yellow-500 text-white py-1 px-2 rounded"
                                    >
                                        Editar
                                    </button>
                                )}
                                <button
                                    onClick={() => handleEliminar(incidencia.id_incidencia)}
                                    className="bg-red-500 text-white py-1 px-2 rounded"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

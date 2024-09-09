import { useContext, useEffect, useState } from 'react'
import { IncidenciaContext } from '../context/IncidenciaContext'
import { AuthContext } from '../context/AuthContext'

export const AllIncidencias = () => {
    const { incidencias, isLoading, isError, editarIncidenciaExistente, eliminarIncidenciaExistente, mensaje } = useContext(IncidenciaContext)
    const { user } = useContext(AuthContext)

    const [editando, setEditando] = useState(null)
    const [formData, setFormData] = useState({
        asunto: '',
        tipo: '',
        descripcion: ''
    })
    const [misIncidencias, setMisIncidencias] = useState([])
    const [filtroEstado, setFiltroEstado] = useState('')
    const [filtroFecha, setFiltroFecha] = useState('') 

    console.log(incidencias)

    useEffect(() => {
        let userIncidencias = incidencias
    
        // Aplicar filtro por estado
        if (filtroEstado) {
            userIncidencias = userIncidencias.filter(incidencia => incidencia.estado === filtroEstado)
        }
    
        // Aplicar filtro por fecha
        if (filtroFecha) {
            const filtroFechaObj = new Date(filtroFecha)
            userIncidencias = userIncidencias.filter(incidencia => {
                const incidenciaFechaObj = new Date(incidencia.fecha_reporte)
                return (
                    incidenciaFechaObj.toDateString() === filtroFechaObj.toDateString()
                )
            })
        }
    
        setMisIncidencias(userIncidencias)
    }, [incidencias, user.id, filtroEstado, filtroFecha])

    if (isLoading) return <p>Cargando incidencias...</p>
    if (isError) return <p>Error al cargar incidencias</p>

    const handleEditar = (id, incidencia) => {
        setEditando(id) // Establece el ID de la incidencia que se está editando
        setFormData({
            asunto: incidencia.asunto,
            tipo: incidencia.tipo,
            descripcion: incidencia.descripcion
        })
    }

    const handleGuardar = (id) => {
        editarIncidenciaExistente(id, formData)
        setEditando(null) // Termina la edición
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

            {/* Filtros */}
            <div className="mb-4 flex gap-4">
                <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className="border p-2">
                    <option value="">Todos los estados</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="en progreso">En progreso</option>
                    <option value="resuelto">Resuelto</option>
                </select>

                <input
                    type="date"
                    value={filtroFecha}
                    onChange={(e) => setFiltroFecha(e.target.value)}
                    className="border p-2"
                />

                <button
                    onClick={() => { setFiltroEstado('') ; setFiltroFecha('') }}
                    className="bg-gray-500 text-white py-1 px-2 rounded"
                >
                    Limpiar filtros
                </button>
            </div>

            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4">Asunto</th>
                        <th className="py-2 px-4">Tipo</th>
                        <th className="py-2 px-4">Estado</th>
                        <th className="py-2 px-4">Fecha de Registro</th>
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
                            <td className="py-2 px-4"> {new Date(incidencia.fecha_reporte).toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}</td>
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
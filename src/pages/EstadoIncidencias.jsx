import { useContext, useState } from 'react'
import { IncidenciaContext } from '../context/IncidenciaContext'

export const EstadoIncidencias = () => {
    const { incidencias, isLoading, isError, actualizarEstadoIncidencia, mensaje } = useContext(IncidenciaContext)
    const [editando, setEditando] = useState(null)
    const [formData, setFormData] = useState({
        asunto: '',
        tipo: '',
        descripcion: '',
        estado: 'Pendiente' 
    })

    if (isLoading) return <p>Cargando incidencias...</p>
    if (isError) return <p>Error al cargar incidencias</p>

    const handleEditar = (id, incidencia) => {
        setEditando(id) 
        setFormData({
            asunto: incidencia.asunto,
            tipo: incidencia.tipo,
            descripcion: incidencia.descripcion,
            estado: incidencia.estado
        })
    }

    const handleGuardar = (id) => {
        actualizarEstadoIncidencia(id, formData.estado)
        setEditando(null) 
    }


    const getEstadoColor = (estado) => {
        console.log(estado)
        switch (estado) {
            case 'pendiente':
                return 'text-red-600 '
            case 'en progreso':
                return 'text-yellow-600 '
            case 'resuelto':
                return 'text-blue-600 '
            default:
                return 'text-gray-600 '
        }
    }

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-1">Resolver Incidencias</h2>
            <span className='flex mb-4'> Seleccione la incidencia a resolver</span>

            {mensaje && <div className="mb-4 text-green-500">{mensaje}</div>}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4">Asunto</th>
                        <th className="py-2 px-4">Tipo</th>
                        <th className="py-2 px-4">Estado</th>
                        <th className="py-2 px-4">Resolver</th>
                    </tr>
                </thead>
                <tbody>
                    {incidencias?.map((incidencia) => (
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
                            <td className="py-2 px-4">
                                <span className={`inline-block uppercase px-2 py-1 rounded-md text-sm font-semibold ${getEstadoColor(incidencia.estado)}`}>
                                    {editando === incidencia.id_incidencia ? (
                                        <select
                                            value={formData.estado}
                                            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                                            className="border p-1"
                                        >
                                            <option value="Pendiente">Pendiente</option>
                                            <option value="En Progreso">En Progreso</option>
                                            <option value="Resuelto">Resuelto</option>
                                        </select>
                                    ) : (
                                        incidencia.estado
                                    )}
                                </span>
                            </td>
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
                                        className="bg-orange-500 text-white py-1 px-2 rounded"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                )}
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
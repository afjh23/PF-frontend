import React, { useContext, useState } from 'react'
import { IncidenciaContext } from '../context/IncidenciaContext'

export const GenerarIncidencia = () => {
  const {crearNuevaIncidencia, mensaje}= useContext(IncidenciaContext)
  const [asunto, setAsunto]= useState('')
  const [tipo, setTipo]=useState('otros')
  const [descripcion, setDescripcion] = useState('')
  const [imagen, setImagen]= useState(null)

  const handleSubmit=(e)=>{
    e.preventDefault()
    const incidenciaData = {
      id_usuario: localStorage.getItem('userId'),
      asunto,
      tipo,
      descripcion,
      imagen,
    }
    crearNuevaIncidencia(incidenciaData)
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
    <h2 className="text-2xl font-semibold mb-4">Reportar Incidencia</h2>
    {mensaje && <div className="mb-4 text-green-500">{mensaje}</div>}
    <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-sm font-medium">Asunto</label>
            <input
                type="text"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
            />
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium">Tipo</label>
            <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
            >
                <option value="fontanería">Fontanería</option>
                <option value="electricidad">Electricidad</option>
                <option value="limpieza">Limpieza</option>
                <option value="otros">Otros</option>
            </select>
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
            />
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium">Imagen (opcional)</label>
            <input
                type="file"
                onChange={(e) => setImagen(e.target.files[0])}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
        </div>
        <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
        >
            Reportar Incidencia
        </button>
    </form>
</div>
  )
}

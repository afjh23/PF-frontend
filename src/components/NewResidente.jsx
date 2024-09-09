
import { useState, useContext } from 'react'
import { UsuarioContext } from '../context/UsuarioContext'

export const NewResidente = () => {
    const { crearNuevoUsuario, mensaje } = useContext(UsuarioContext)
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        crearNuevoUsuario(formData)
    }

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-8">Crear Nuevo Usuario</h2>
            {mensaje && <div className="mb-4 text-green-500">{mensaje}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="mt-1 block w-full border-2 p-1 border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                    Crear Usuario
                </button>
            </form>
        </div>
    )
} 
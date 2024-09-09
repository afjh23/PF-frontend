import { useContext } from 'react'
import { UsuarioContext } from '../context/UsuarioContext'
import { Link } from 'react-router-dom'

export const AllResidentes = () => {
    const { usuarios, isLoading, isError, mensaje } = useContext(UsuarioContext)

    if (isLoading) return <p>Cargando usuarios...</p>
    if (isError) return <p>Error al cargar usuarios</p>

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Lista de Usuarios</h2>
            {mensaje && <div className="mb-4 text-green-500">{mensaje}</div>}
            
                <Link to={"/new-residente"}>
                <button className='"w-30 flex mx-auto bg-sky-600 text-white py-1 px-2 rounded mb-7'>
                Nuevo Residente

                </button>
                
               
                </Link>
                
                                
                                   
                                    
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4">N°</th>
                        <th className="py-2 px-4">Nombre</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios?.map((usuario,index) => (
                        <tr key={usuario.id}>
                            <td className="py-2 px-4 flex justify-center items-center">{(index+1)}</td>
                            <td className="py-2 px-4">{usuario.nombre+" "+usuario.apellido}</td>
                            <td className="py-2 px-4">{usuario.email}</td>
                            <td className="py-2 px-4 flex gap-2">
                                {/* Aquí puedes agregar botones para editar o eliminar usuarios */}
                                <button
                                    onClick={() => console.log(`Editar usuario ${usuario.id}`)}
                                    className="bg-yellow-500 text-white py-1 px-2 rounded"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => console.log(`Eliminar usuario ${usuario.id}`)}
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
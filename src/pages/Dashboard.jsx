/* eslint-disable react/no-unescaped-entities */
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


export const Dashboard = () => {
    const { user, auth } = useContext(AuthContext)
    return (
        <div className="h-screen bg-cover bg-center m-1 mt-2 rounded-2xl py-4"
        >
            <div className=" flex flex-col mb-8 items-center">
                <div className="flex items-center flex-col mb-4">
                    <h1 className="text-4xl  font-semibold text-sky-500">
                        Bienvenido
                    </h1>
                    <p className="text-6xl">
                        {user.nombre + " " + user.apellido}
                    </p>
                </div>
                <div className="flex flex-row items-center text-center gap-2">
                    <h1 className="text-[40px] font-semibold text-sky-500">
                        Sistema de Seguimiento y Reporte de Incidencias
                    </h1>
                    <p className="text-[40px]">  </p>
                </div>
            </div>

            <div className="flex items-center justify-center mx-auto">
                <p className="text-lg"> "Bienvenido al sistema de incidencias del edificio Siempre Seguro"</p>

            </div>

            <div className="flex items-center justify-center mx-auto mt-12">
                <div className="flex  justify-center gap-4 w-[800px] items-center p-4">
                    {auth.rol === "residente" && (
                        <>
                            <Link to={"/generar-incidencia"} className="bg-sky-400 text-white py-2 px-4 rounded-xl w-[250px] h-[80px] flex items-center justify-center "
                            >
                                Ingresar Nueva Incidencia
                            </Link>
                            <Link
                                className="bg-sky-400 text-white py-2 px-4 rounded-xl w-[250px] h-[80px] flex items-center justify-center"
                                to={"/mis-incidencias"}>
                                Mis Incidencias reportadas
                            </Link>
                        </>

                    )}
                    {auth.rol === "administrador" && (
                        <>
                            <Link to={"/estado-incidencias"} className="bg-sky-400 text-white py-2 px-4 rounded-xl w-[250px] h-[80px] flex items-center justify-center "
                            >
                                Resolver Incidencias
                            </Link>
                            <Link
                                className="bg-sky-400 text-white py-2 px-4 rounded-xl w-[250px] h-[80px] flex items-center justify-center"
                                to={"/all-incidencias"}>
                               Todas las incidencias
                            </Link>

                        </>

                    )}


                </div>


            </div>


        </div>
    )
}

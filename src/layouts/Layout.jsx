import { useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export const Layout = () => {
    const {user, auth} = useContext(AuthContext)
    /* console.log(auth.rol) */
    return (
        <div className="w-full h-screen">
            <header className="w-full h-12 bg-blue-600">
                <nav className="h-full flex  text-white place-content-between items-center max-w-5xl px-4 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
                    </svg>
                    
                    <ul className="flex gap-6 h-full items-center justify-center">
                        <li><Link to="/dashboard">Inicio</Link>
                        </li>
                        {auth.rol === "residente" && (
                            <>
                             <li><Link to="/generar-incidencia">Generar Incidencias</Link></li>
                             <li><Link to="/mis-incidencias">Mis Incidencias</Link></li>
                             <li><Link to="/all-incidencias">Todas las Incidencias</Link></li>
                            </>
                           
                        )}
                        {auth.rol === "administrador" && (
                            <>
                            <li><Link to="all-residentes">Residentes</Link></li>
                             <li><Link to="estado-incidencias">Resolver Incidencias</Link></li>
                            <li><Link to="/all-incidencias">Todas las Incidencias</Link></li>
                           
                            </>
                            
                        )}
                        
                        
                        <li><Link to="/login" onClick={() => localStorage.removeItem('tokenLogin')}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm5.03 4.72a.75.75 0 0 1 0 1.06l-1.72 1.72h10.94a.75.75 0 0 1 0 1.5H10.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="max-w-5xl p-4 mx-auto">
                <Outlet />
            </main>

        </div>
    )
}

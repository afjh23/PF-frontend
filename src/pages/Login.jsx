import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { loginMutation } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            email: email,
            password: password
        }
        await loginMutation.mutateAsync(data)
    }
    return (
        <div className='w-full h-screen flex justify-center items-center bg-gray-100'>
            <form onSubmit={handleSubmit} className='w-72 h-96 flex flex-col justify-evenly bg-white p-4 border border-gray-300 rounded'>
                <h1 className='text-center uppercase text-lg font-semibold'>Inicio de Sesión</h1>
                <div className='flex gap-2 items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                    </svg>

                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className=""
                    />
                </div>
                <div className='flex gap-2 items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                    </svg>


                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className=""
                    />
                </div>

                <div className='flex flex-col text-center items-center'>

                    <button type="submit" className='flex mb-8 w-16 h-7 bg-blue-600 text-white justify-center items-center rounded-md'>Login</button>
                    <a className='text-xs'>¿Olvidaste tu contraseña?</a>
                    <a className='text-xs'>¿No tienes cuenta?</a>
                </div>

            </form>
        </div>

    )
}

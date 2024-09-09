
import axios from "axios"
//LOGIN
export const loginUser = async (data) => {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', data)
        return response

    } catch (error) {
        console.error('Error logging in:', error.response ? error.response.data : error.message)
        throw error
    }
}
export const infoUser = async () => {
    const token = localStorage.getItem('token')
    const info = await axios.get('http://localhost:3000/api/auth/me', {
        headers: { Authorization: token }
    })
    return info.data
}


//USUARIOS

export const usuariosAll = async () => {
   console.log("aqui mismito")
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:3000/api/users/', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const crearUsuario = async (data) => {
    const token = localStorage.getItem('token')
    const response = await axios.post('http://localhost:3000/api/users/', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}



//INCIDENCIAS

export const incidenciasAll = async () => {
    const response = await axios.get('http://localhost:3000/api/incidencias/')
    return response.data

}

export const crearIncidencia = async (data) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.post('http://localhost:3000/api/incidencias/', data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data

    } catch (error) {
        console.error('Error logging in:', error.response ? error.response.data : error.message)
        throw error
    }
}

export const editarIncidencia = async ({ id, ...data }) => {
    const token = localStorage.getItem('token')
    const response = await axios.patch(`http://localhost:3000/api/incidencias/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const editarStatus = async ({ id, ...data }) => {
    const token = localStorage.getItem('token')
    const response = await axios.patch(`http://localhost:3000/api/incidencias/status/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const eliminarIncidencia = async (id) => {
    console.log(id)
    const token = localStorage.getItem('token')
    const response = await axios.delete(`http://localhost:3000/api/incidencias/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}



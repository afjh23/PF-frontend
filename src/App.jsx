// App.js
import './App.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import PrivateRoute from './pages/PrivateRoute.jsx'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Layout } from './layouts/Layout.jsx'
import { GenerarIncidencia } from './pages/GenerarIncidencia.jsx'
import { EstadoIncidencias } from './pages/EstadoIncidencias.jsx'
import { IncidenciaProvider } from './context/IncidenciaContext.jsx'
import { AllIncidencias } from './pages/AllIncidencias.jsx'
import { MisIncidencias } from './pages/MisIncidencias.jsx'
import { NewResidente } from './components/NewResidente.jsx'
import { AllResidentes } from './pages/AllResidentes.jsx'
import { UsuarioProvider } from './context/UsuarioContext.jsx'
import IncidenciaDetalle from './components/IncidenciaDetalle.jsx'

function App() {
  return (
    <Router>
      <AuthProvider>
        <UsuarioProvider>
          <IncidenciaProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoute element={Layout} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="generar-incidencia" element={<GenerarIncidencia />} />
                <Route path="all-incidencias" element={<AllIncidencias />} />
                <Route path="estado-incidencias" element={<EstadoIncidencias />} />
                <Route path="mis-incidencias" element={<MisIncidencias />} />
                <Route path="new-residente" element={<NewResidente />} />
                <Route path="all-residentes" element={<AllResidentes />} />
                <Route path="incidencias/:id" element={<IncidenciaDetalle/>} />
              </Route>
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </IncidenciaProvider>
        </UsuarioProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
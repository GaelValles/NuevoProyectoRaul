import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/auth.context.jsx';
import ProtectedRoute from './protectedRoutes';
import LoginPage from './pages/login';

import RegistrarConductorPage from './pages/registrarConductor';
import RegistrarPermisoPage from './pages/registrarPermiso';
import RegistrarCamionPage from './pages/registrarCamion.jsx';
import RegistrarCajaPage from './pages/registrarCaja.jsx';

import InicioPage from './pages/inicio';
import PerfilPage from './pages/perfil';
import EditarUsuarioPage from './pages/editarUsuario.jsx';

import ConductoresPage from './pages/conductores.jsx';
import PermisosPage from './pages/permisos.jsx';
import CamionesPage from './pages/camiones.jsx';
import CajasPage from './pages/cajas.jsx';

import PerfilConductorPage from './pages/perfilConductor.jsx';
import PerfilPermisoPage from './pages/perfilPermiso.jsx';
import PerfilCamionPage from './pages/perfilCamion.jsx';
import PerfilCajaPage from './pages/perfilCaja.jsx';

import EditarConductorPage from './pages/editarConductor.jsx';
import EditarPermisoPage from './pages/editarPermiso.jsx';
import EditarCamionPage from './pages/editarCamion.jsx';
import EditarCajaPage from './pages/editarCaja.jsx';

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={ <LoginPage /> }/>
        <Route path='/login' element={ <LoginPage /> }/>
        <Route element={<ProtectedRoute />}>
          
          <Route path='/inicio' element={ < InicioPage />}/>        
          <Route path='/editarUsuario/:id' element={<EditarUsuarioPage />}/>

          <Route path='/conductores' element={< ConductoresPage />}/>
          <Route path='/permisos' element={< PermisosPage />}/>
          <Route path='/camiones' element={< CamionesPage />}/>
          <Route path='/cajas' element={< CajasPage />}/>

          <Route path='/perfilConductor/:id' element={< PerfilConductorPage />}/>
          <Route path='/perfilPermiso/:id' element={< PerfilPermisoPage />}/>
          <Route path='/perfilCamion/:id' element={< PerfilCamionPage />}/>
          <Route path='/perfilCaja/:id' element={< PerfilCajaPage />}/>
          <Route path='/perfil' element={<PerfilPage/>}/>
          
          <Route path='/registrarPermiso' element={<RegistrarPermisoPage />}/>
          <Route path='/registrarCamion' element={<RegistrarCamionPage />}/>
          <Route path='/registrar' element={ <RegistrarConductorPage />}/>
          <Route path='/registrarCaja' element={<RegistrarCajaPage />}/>
          
          <Route path='/editarConductor/:id' element={<EditarConductorPage />}/>
          <Route path='/editarPermiso/:id' element={<EditarPermisoPage />}/>
          <Route path='/editarCamion/:id' element={<EditarCamionPage />}/>
          <Route path='/editarCaja/:id' element={<EditarCajaPage />}/>
          
          
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>

  )
}

export default App;
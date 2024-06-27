import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/auth.context.jsx';
import LoginPage from './pages/login';
import RegistrarConductorPage from './pages/registrarConductor';
import RegistrarPermisoPage from './pages/registrarPermiso';
import HomePage from './pages/home';
import InicioPage from './pages/inicio';
import ConductoresPage from './pages/conductores.jsx';
import PermisosPage from './pages/permisos.jsx';
function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={ <HomePage /> }/>
        <Route path='/login' element={ <LoginPage /> }/>
        <Route path='/registrar' element={ <RegistrarConductorPage />}/>
        <Route path='/inicio' element={ < InicioPage />}/>        
        <Route path='/conductores' element={< ConductoresPage />}/>
        <Route path='/permisos' element={< PermisosPage />}/>
        <Route path='/registrarPermiso' element={<RegistrarPermisoPage />}/>
        <Route path='/docs/:id' element={<h1>actualizar doc</h1>}/>
        <Route path='/perfil' element={<h1>Perfil</h1>}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>

  )
}

export default App;
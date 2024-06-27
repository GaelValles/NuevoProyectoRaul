import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/auth.context.jsx';
import LoginPage from './pages/login';
import RegistrarConductorPage from './pages/registrarConductor';
import RegistrarPermisoPage from './pages/registrarPermiso';
import HomePage from './pages/home';
import InicioPage from './pages/inicio';
import PerfilPage from './pages/perfil';
import DocsPage from './pages/documentos';
function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={ <HomePage /> }/>
        <Route path='/login' element={ <LoginPage /> }/>
        <Route path='/registrar' element={ <RegistrarConductorPage />}/>
        <Route path='/inicio' element={ < InicioPage />}/>        
        <Route path='/docs' element={<DocsPage/>}/>
        <Route path='/registrarPermiso' element={<RegistrarPermisoPage />}/>
        <Route path='/docs/:id' element={<h1>actualizar doc</h1>}/>
        <Route path='/perfil' element={<PerfilPage/>}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>

  )
}

export default App;
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/auth.context.jsx';
import ProtectedRoute from './protectedRoutes';

import EditarProfesorPage from './pages/editarProfesor.jsx';
import EditarMateriaPage from './pages/editarMateria.jsx';
import EditarAlumnoPage from './pages/editarAlumno.jsx';

import ProfesoresPage from './pages/profesores.jsx';
import AlumnosPage from './pages/alumnos.jsx';
import AsistenciaPage from './pages/asistencias.jsx';

import RegistrarAlumnoPage from './pages/registrarAlumno.jsx';
import RegistrarProfesorPage from './pages/registrarProfesor.jsx';
import RegistrarMateriaPage from './pages/registrarMateria.jsx';

import PerfilProfesorPage from './pages/perfilProfesor.jsx';
import PerfilAlumnoPage from './pages/perfilAlumno.jsx';
import PerfilPage from './pages/perfil.jsx';
import LoginPage from './pages/login';
import InicioPage from './pages/inicio';
import InicioProfesorPage from './pages/inicioProfesor';
function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={ <InicioPage /> }/>
        <Route path='/login' element={ <LoginPage /> }/>
        <Route path='/inicio' element={ < InicioPage />}/> 
        <Route element={<ProtectedRoute />}>
          
          <Route path='/inicioProfesor' element={ < InicioProfesorPage />}/> 
          <Route path='/editarProfesor/:id' element={<EditarProfesorPage />}/>
          <Route path='/editaMateria/:id' element={<EditarMateriaPage />}/>
          <Route path='/editarAlumno/:id' element={<EditarAlumnoPage />}/>

          <Route path='/profesores' element={< ProfesoresPage />}/>
          <Route path='/alumnos' element={< AlumnosPage />}/>
          <Route path="/materia/:id/asistencias" element={<AsistenciaPage />} />

          <Route path='/perfilProfesor/:id' element={< PerfilProfesorPage />}/>
          <Route path='/perfilAlumno/:id' element={<PerfilAlumnoPage />}/>
          <Route path='/perfil' element={<PerfilPage/>}/>
          
          <Route path='/registrarProfesor' element={<RegistrarProfesorPage />}/>
          <Route path='/registrarAlumno' element={<RegistrarAlumnoPage />}/>
          <Route path='/registrarMateria' element={ <RegistrarMateriaPage />}/>
            
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>

  )
}

export default App;
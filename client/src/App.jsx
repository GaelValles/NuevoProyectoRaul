import { BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/login';
function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Home page</h1>}/>
        <Route path='/login' element={ <LoginPage /> }/>
        <Route path='/registrar' element={<h1>Registrar</h1>}/>
        <Route path='/docs' element={<h1>Docs</h1>}/>
        <Route path='/addDocs' element={<h1>Añadir doc</h1>}/>
        <Route path='/docs/:id' element={<h1>actualizar doc</h1>}/>
        <Route path='/perfil' element={<h1>Perfil</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
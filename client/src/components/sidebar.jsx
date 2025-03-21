import 'bootstrap-icons/font/bootstrap-icons.css';
import { useAuth } from '../context/auth.context';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Sidepage() {
  const { logout, profesor, alumno, userType } = useAuth();

  // Get the correct user data based on type
  const userData = userType === 'profesor' ? profesor : alumno;

  const toggleSidebar = () => {
    document.querySelector('.sidebar').classList.toggle('hidden');
  };

  const handleLogout = () => {
    Swal.fire({
      title: '¿Seguro de salir?',
      text: "Estás a punto de cerrar sesión",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  return (
    <div>
      <button className="absolute text-white text-4xl top-5 left-4 cursor-pointer lg:hidden" onClick={toggleSidebar}>
        <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
      </button>

      <div className="sidebar fixed top-0 bottom-0 left-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-white shadow-lg h-screen z-10 lg:block hidden">
        <div className="text-black text-xl">

          {/* Perfil del Usuario */}
          <div className="p-2.5 mt-1 flex items-center rounded-md">
            <img 
              src={userData?.perfil?.secure_url || '/default-avatar.png'}
              alt="Profile" 
              className="w-32 h-16 object-cover rounded-full"
            />
          </div>

          <div className="p-2.5 mt-1 flex items-center justify-end rounded-md">
            <i className="bi bi-x cursor-pointer lg:hidden" onClick={toggleSidebar} style={{ fontSize: '2rem' }}></i>
          </div>

          {userType === 'profesor' ? (
            // Profesor menu items
            <>
              <div className="p-2 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer">
                <Link to="/inicioProfesor"><i className="bi bi-house-door-fill hover:text-blue-700"></i></Link>
                <Link to="/inicioProfesor"><span className="text-[17px] ml-4 text-black hover:text-blue-700">Inicio</span></Link>
              </div>
              {/* Add other profesor specific menu items */}
            </>
          ) : (
            // Alumno menu items
            <>
              <div className="p-2 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer">
                <Link to="/inicioAlumno"><i className="bi bi-house-door-fill hover:text-blue-700"></i></Link>
                <Link to="/inicioAlumno"><span className="text-[17px] ml-4 text-black hover:text-blue-700">Inicio</span></Link>
              </div>
              {/* Add other alumno specific menu items */}
            </>
          )}

          <hr className="my-4 text-gray-600" />

          <div className="p-2 mt-10 flex items-center rounded-md px-4 duration-300 cursor-pointer">
            <i className="bi bi-box-arrow-in-right hover:text-blue-700"></i>
            <span className="text-[17px] ml-4 text-black hover:text-blue-700" onClick={handleLogout}>Salir</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidepage;

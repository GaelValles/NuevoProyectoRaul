import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useAuth } from '../context/auth.context';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function SidePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    document.querySelector('.sidebar').classList.toggle('hidden');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cerrar sesión'
      });
    }
  };

  return (
    <div>
      <button className="absolute text-white text-4xl top-5 left-4 cursor-pointer lg:hidden" onClick={toggleSidebar}>
        <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
      </button>

      <div className="sidebar fixed top-0 bottom-0 left-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-white shadow-lg h-screen z-10 lg:block hidden">
        <div className="text-black text-xl">
          {/* Perfil */}
          <div className="p-2.5 mt-1 flex flex-col items-center rounded-md">
            <img 
              src="/default-avatar.png"
              alt="Profile" 
              className="w-24 h-24 object-cover rounded-full mb-2"
            />
            <span className="text-lg font-semibold">Admin Panel</span>
          </div>

          <hr className="my-4 text-gray-600" />

          {/* Menu Items */}
          <Link to="/grupos" className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-100">
            <i className="bi bi-people-fill text-xl"></i>
            <span className="text-[15px] ml-4">Grupos</span>
          </Link>

          <Link to="/materias" className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-100">
            <i className="bi bi-book-fill text-xl"></i>
            <span className="text-[15px] ml-4">Materias</span>
          </Link>

          <Link to="/alumnos" className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-100">
            <i className="bi bi-mortarboard-fill text-xl"></i>
            <span className="text-[15px] ml-4">Alumnos</span>
          </Link>

          <Link to="/profesores" className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-100">
            <i className="bi bi-person-workspace text-xl"></i>
            <span className="text-[15px] ml-4">Profesores</span>
          </Link>

          <hr className="my-4 text-gray-600" />

          {/* Logout Button */}
          <div 
            onClick={handleLogout}
            className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-50"
          >
            <i className="bi bi-box-arrow-left text-xl text-red-600"></i>
            <span className="text-[15px] ml-4 text-red-600">Salir</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidePage;

import React from 'react';
import { useAuth } from '../context/auth.context';
import Sidepage from '../components/sidebar';
import { useNavigate } from 'react-router-dom';

function PerfilPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate(`/editarUsuario/${user.id}`);
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      <Sidepage />
      <div className="flex-1 flex items-center justify-center p-4 lg:ml-[300px]">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg transition-transform transform hover:shadow-xl hover:scale-105">
          <div className="flex flex-col items-center">
            <img 
              src={user.perfil.secure_url} 
              alt="Profile" 
              className="w-36 h-36 rounded-md mb-4 object-cover"
            />
            <h2 className="text-2xl font-semibold mb-2">{user.nombreCompleto}</h2>
            <div className="text-left w-full space-y-4">
              <div>
                <h3 className="text-lg font-medium">Email:</h3>
                <p className="text-gray-700 bg-stone-200 rounded px-4 py-2">{user.email}</p>
              </div>
              {user.telefono && (
                <div>
                  <h3 className="text-lg font-medium">Teléfono:</h3>
                  <p className="text-gray-700 bg-stone-200 rounded px-4 py-2">{user.telefono}</p>
                </div>
              )}
            </div>
            <button 
              onClick={handleEditProfile}
              className="mt-6 rounded-full bg-gray-700 hover:bg-gray-900 text-white px-6 py-2 font-semibold transition ease-in-out duration-300"
            >
              Editar Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default PerfilPage;

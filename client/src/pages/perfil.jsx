import React from 'react';
import { useAuth } from '../context/auth.context';
import Sidepage from '../components/sidebar';

function PerfilPage() {
  const { user } = useAuth();
  console.log(user)
  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Sidepage></Sidepage>
      <div className="bg-white hover:shadow-gray-400 hover:shadow-lg p-6 rounded-lg shadow-lg w-full max-w-md">
        
        <div className="flex flex-col items-center">
          <img 
            src={user.perfil.secure_url} 
            alt="Profile" 
            className="w-60 h-32 mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2 bg-transparent">{user.nombreCompleto}</h2>

          <div className="text-left w-full">
            <div className="mb-4">
              <h3 className="text-lg font-medium">Email:</h3>
              <p className="rounded-full text-gray-700 bg-stone-200 px-4 py-1 mt-1 w-auto">{user.email}</p>
            </div>
            {user.telefono && (
              <div className="mb-4">
                <h3 className="text-lg font-medium">Teléfono:</h3>
                <p className="rounded-full text-gray-700 bg-stone-200 px-4 py-1 mt-1 w-auto">{user.telefono}</p>
              </div>
            )}
          </div>
          <button className="rounded-full bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 font-semibold mt-4 w-auto transition ease-in-out">Editar Perfil</button>
        </div>
      </div>
    </div>
  );
}

export default PerfilPage;

import React from 'react';
import PerfilImg from "../assets/images/perfil.jpg"

function PerfilPage() {
    // Datos del perfil (estos normalmente se obtendrían de una API o de props)
    const perfil = {
        nombreCompleto: "John Doe",
        email: "john.doe@example.com",
        telefono: "+1234567890",
        password: "********" // Nota: nunca mostrarías la contraseña real
    };

    return (
        <div className="min-h-screen bg-teal-600 flex items-center justify-center">
            <div className="bg-white hover:shadow-gray-400 hover:shadow-lg p-6 rounded-lg shadow-lg w-full max-w-md ">
                <div className="flex flex-col items-center">
                    <img 
                        src={PerfilImg} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full mb-4"
                    />
                    <h2 className="text-2xl font-semibold mb-2 bg-transparent">{perfil.nombreCompleto}</h2>
                    <p className="text-gray-600 mb-4">Software Engineer</p>
                    <div className="text-left w-full">
                        <div className="mb-4">
                            <h3 className="text-lg font-medium">Email:</h3>
                            <p className="rounded-full text-gray-700 bg-stone-200 px-4 py-1 mt-1 w-auto">{perfil.email}</p>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-medium">Teléfono:</h3>
                            <p className="rounded-full text-gray-700 bg-stone-200 px-4 py-1 mt-1 w-auto">{perfil.telefono}</p>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-medium">Contraseña:</h3>
                            <p className="rounded-full text-gray-700 bg-stone-200 px-4 py-1 mt-1 w-auto">{perfil.password}</p>
                        </div>
                    </div>
                    <button className="rounded-full bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 font-semibold mt-4 w-auto transition ease-in-out">Editar Perfil</button>

                </div>
            </div>
        </div>
    );
}

export default PerfilPage;

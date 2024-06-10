import React from 'react';
import Img from "../assets/images/inicioCamion.png"; 
import { Link } from 'react-router-dom';
function HomePage() {
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white font-bold text-xl">SmartArchive</div>
                    <div>
                    <Link to="/registrar">
                        <button className="rounded-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 mx-2 transition duration-300 ease-in-out">
                            Registrarse
                        </button>
                    </Link>
                    <Link to="/login">
                        <button className="rounded-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 mx-2 transition duration-300 ease-in-out">
                            Iniciar Sesión
                        </button>
                    </Link>
                        
                    </div>
                </div>
            </nav>
            <div className="mt-8 flex justify-center">
                            <img src={Img} alt="Descripción de la imagen" className="w-full h-auto max-w-md" />
                        </div>
            <div className="flex justify-center items-center flex-grow">
                <div className="w-full max-w-5xl p-4">
                    <div className="bg-white rounded-lg border-4 border-gray-700 p-8 shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
                        <h1 className="text-3xl text-center text-gray-800 font-semibold mt-4">Nuestra Empresa</h1>
                        <p className="text-center text-gray-600 mt-4">Somos líderes en diseño moderno y comunicación exitosa con el cliente.</p>
                        

                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;

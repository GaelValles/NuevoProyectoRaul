import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Import images
import logoImg from '../assets/images/logo.jpg';
import bufalosImg from '../assets/images/bufalos.jpg';


const Inicio = () => {
    const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
            {/* Navbar */}
            <nav className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img 
                                    className="h-16 w-auto transform hover:scale-105 transition-transform duration-300" 
                                    src={logoImg} 
                                    alt="Logo Institucional" 
                                />
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-6">
                                    <Link to="/" className="px-4 py-2 rounded-md text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">
                                        Inicio
                                    </Link>
                                    <Link to="/programas" className="px-4 py-2 rounded-md text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors duration-300">
                                        Programas Académicos
                                    </Link>
                                    <Link to="/biblioteca" className="px-4 py-2 rounded-md text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors duration-300">
                                        Biblioteca Digital
                                    </Link>
                                    <Link to="/calendario" className="px-4 py-2 rounded-md text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors duration-300">
                                        Calendario
                                    </Link>
                                    <div className="relative group">
                                        <button 
                                            onClick={() => setIsLoginMenuOpen(!isLoginMenuOpen)}
                                            className="px-4 py-2 rounded-md text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center"
                                        >
                                            Iniciar Sesión
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-300 ${isLoginMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                            <div className="py-2 px-1">
                                                <Link 
                                                    to="/login" 
                                                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                                >
                                                    <span className="flex items-center">
                                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        Acceso Profesores
                                                    </span>
                                                </Link>
                                                <Link 
                                                    to="/loginAlumno" 
                                                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                                >
                                                    <span className="flex items-center">
                                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                        </svg>
                                                        Acceso Alumnos
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative min-h-[600px] bg-black">
                {/* Background Image */}
                <img
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    src={bufalosImg}
                    alt="Universidad"
                />
                
                {/* Content Overlay */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="flex flex-col items-center lg:items-start max-w-2xl">
                        <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl text-center lg:text-left">
                            <span className="block">Bienvenido al</span>
                            <span className="block text-blue-400">Portal Académico</span>
                        </h1>
                        <p className="mt-3 text-base text-gray-100 sm:mt-5 sm:text-lg md:text-xl text-center lg:text-left">
                            Tu puerta de acceso al conocimiento y la excelencia académica. Gestiona tus actividades, accede a recursos y más.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto">
                            <Link
                                to="/login"
                                className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl md:py-4 md:text-lg md:px-10"
                            >
                                Acceso Profesores
                            </Link>
                            <Link
                                to="/loginAlumno"
                                className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-xl text-white bg-transparent hover:bg-white/10 transition-colors duration-200 shadow-lg hover:shadow-xl md:py-4 md:text-lg md:px-10"
                            >
                                Acceso Alumnos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Nuestro Campus
                        </h2>
                        <p className="mt-4 text-xl text-gray-500">
                            Conoce nuestras modernas instalaciones
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Gallery Item 1 */}
                        <div className="relative rounded-xl overflow-hidden shadow-lg group">
                            {/* <img
                                src={campus1Img}
                                alt="Instalaciones Deportivas"
                                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                            /> */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="text-white text-xl font-bold">Instalaciones Deportivas</h3>
                                <p className="text-gray-200 mt-1">Espacios para el desarrollo deportivo</p>
                            </div>
                        </div>

                        {/* Gallery Item 2 */}
                        <div className="relative rounded-xl overflow-hidden shadow-lg group">
                            {/* <img
                                src={campus2Img}
                                alt="Biblioteca"
                                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                            /> */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="text-white text-xl font-bold">Biblioteca</h3>
                                <p className="text-gray-200 mt-1">Centro de recursos académicos</p>
                            </div>
                        </div>

                        {/* Gallery Item 3 */}
                        <div className="relative rounded-xl overflow-hidden shadow-lg group">
                            {/* <img
                                src={campus3Img}
                                alt="Áreas Comunes"
                                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                            /> */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="text-white text-xl font-bold">Áreas Comunes</h3>
                                <p className="text-gray-200 mt-1">Espacios de convivencia estudiantil</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Inicio;
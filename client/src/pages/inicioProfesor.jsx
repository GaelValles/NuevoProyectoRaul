import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context';
import { getMateriasByProfesorRequest } from '../api/auth.materia';

const InicioProfesorPage = () => {
    const [materias, setMaterias] = useState([]);
    const { profesor, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchMaterias = async () => {
            try {
                const response = await getMateriasByProfesorRequest(profesor.id);
                setMaterias(response.data);
            } catch (error) {
                console.error('Error fetching materias:', error);
            }
        };

        if (profesor?.id) {
            fetchMaterias();
        }
    }, [profesor?.id]);

    const handleMateriaClick = (materia) => {
        console.log('Datos de la materia seleccionada:', materia);
        navigate(`/asistencias/${materia._id}`);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 lg:static lg:inset-0`}>
                <div className="h-full flex flex-col">
                    {/* Profile Section */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex flex-col items-center">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                                {profesor?.foto_perfil?.secure_url ? (
                                    <img
                                        src={profesor.foto_perfil.secure_url}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                                        <span className="text-2xl text-blue-600">
                                            {profesor?.nombre_completo?.charAt(0)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 text-center">
                                {profesor?.nombre_completo}
                            </h3>
                            <p className="text-sm text-gray-500 text-center mt-1">
                                {profesor?.correo}
                            </p>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <nav className="flex-1 p-4">
                        <div className="space-y-2">
                            <button
                                onClick={() => navigate(`/perfilProfesor/${profesor.id}`)}
                                className="w-full flex items-center px-4 py-2 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Mi Perfil
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center px-4 py-2 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Cerrar Sesión
                            </button>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:ml-64">
                {/* Toggle Sidebar Button (Mobile) */}
                <button
                    className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-md bg-white shadow-md"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Existing Content */}
                <div className="py-8 px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Mis Materias
                    </h2>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {materias.map((materia) => (
                            <div
                                key={materia._id}
                                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                onClick={() => handleMateriaClick(materia)}
                            >
                                <div className="p-6">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {materia.nombre}
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Grado: {materia.grado}° | Grupo: {materia.grupo}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InicioProfesorPage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth.context';
import logoImg from '../assets/images/logo.jpg';
import { getMateriasByProfesorRequest } from '../api/auth.materia';

const InicioProfesorPage = () => {
    const [materias, setMaterias] = useState([]);
    const [filteredMaterias, setFilteredMaterias] = useState([]);
    const [grupoFilter, setGrupoFilter] = useState('');
    const [gradoFilter, setGradoFilter] = useState('');
    const { profesor } = useAuth();

    useEffect(() => {
        const fetchMaterias = async () => {
            try {
                const response = await getMateriasByProfesorRequest(profesor.id);
                setMaterias(response.data);
                setFilteredMaterias(response.data);
            } catch (error) {
                console.error('Error fetching materias:', error);
            }
        };

        if (profesor?.id) {
            fetchMaterias();
        }
    }, [profesor?.id]);

    useEffect(() => {
        let result = materias;

        if (grupoFilter) {
            result = result.filter(materia => materia.grupo === grupoFilter);
        }

        if (gradoFilter) {
            result = result.filter(materia => materia.grado === gradoFilter);
        }

        setFilteredMaterias(result);
    }, [grupoFilter, gradoFilter, materias]);

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-lg">
                {/* ... existing navbar code ... */}
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                            Mis Materias
                        </h2>
                    </div>
                    <div className="mt-4 flex md:mt-0 md:ml-4">
                        <Link
                            to="/registrarMateria"
                            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Nueva Materia
                        </Link>
                    </div>
                    <div className="mt-4 flex md:mt-0 md:ml-4">
                        <Link
                            to="/registrarAlumno"
                            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Nuevo Alumno
                        </Link>
                    </div>
                </div>

                {/* Filters */}
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="relative rounded-md shadow-sm">
                        <select
                            value={gradoFilter}
                            onChange={(e) => setGradoFilter(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            <option value="">Todos los grados</option>
                            <option value="1">1° Grado</option>
                            <option value="2">2° Grado</option>
                            <option value="3">3° Grado</option>
                        </select>
                    </div>
                    <div className="relative rounded-md shadow-sm">
                        <select
                            value={grupoFilter}
                            onChange={(e) => setGrupoFilter(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            <option value="">Todos los grupos</option>
                            <option value="A">Grupo A</option>
                            <option value="B">Grupo B</option>
                            <option value="C">Grupo C</option>
                        </select>
                    </div>
                </div>

                {/* Materias Grid */}
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredMaterias.map((materia) => (
                        <div
                            key={materia._id}
                            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {materia.nombre}
                                        </h3>
                                        <div className="mt-1 flex items-center">
                                            <span className="text-sm text-gray-500">
                                                Grado: {materia.grado}° | Grupo: {materia.grupo}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Link
                                        to={`/asistencias/${materia.id}`}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                                    >
                                        Ver lista de alumnos
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InicioProfesorPage;
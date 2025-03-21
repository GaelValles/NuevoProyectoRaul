import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { getMateriaRequest } from "../api/auth.materia";
import { getAlumnosByFilterRequest } from "../api/auth.alumno";
import Swal from 'sweetalert2';

function AsistenciaPage() {
    const [materia, setMateria] = useState(null);
    const [alumnos, setAlumnos] = useState([]);
    const [asistencias, setAsistencias] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const { registrarAsistencias } = useAuth();

    useEffect(() => {
        if (!id) {
            navigate('/inicioProfesor');
            return;
        }

        const loadData = async () => {
            try {
                const materiaResponse = await getMateriaRequest(id);
                setMateria(materiaResponse.data);

                const alumnosResponse = await getAlumnosByFilterRequest({
                    grado: materiaResponse.data.grado,
                    grupo: materiaResponse.data.grupo
                });
                setAlumnos(alumnosResponse.data);
            } catch (error) {
                console.error("Error loading data:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar los datos'
                });
                navigate('/inicioProfesor');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id, navigate]);

    const handleAsistenciaChange = (alumnoId, estado) => {
        setAsistencias(prev => ({
            ...prev,
            [alumnoId]: estado
        }));
    };

    const handleSubmit = async () => {
        try {
            const asistenciasArray = Object.entries(asistencias).map(([alumnoId, estado]) => ({
                alumnoId,
                estado
            }));

            await registrarAsistencias(id, { asistencias: asistenciasArray });

            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Asistencias registradas correctamente'
            });

            navigate('/inicioProfesor');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al registrar las asistencias'
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Lista de Asistencia - {materia?.nombre}
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Grado: {materia?.grado}° - Grupo: {materia?.grupo}
                    </p>
                </div>

                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Matrícula
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nombre
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Asistencia
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {alumnos.map((alumno) => (
                                <tr key={alumno._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {alumno.matricula}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {alumno.nombreCompleto}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            value={asistencias[alumno._id] || ''}
                                            onChange={(e) => handleAsistenciaChange(alumno._id, e.target.value)}
                                        >
                                            <option value="">Seleccionar</option>
                                            <option value="presente">Presente</option>
                                            <option value="ausente">Ausente</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Guardar Asistencias
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AsistenciaPage;

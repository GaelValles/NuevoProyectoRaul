import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMateriaRequest } from "../api/auth.materia";
import { getAlumnosByFilterRequest } from "../api/auth.alumno";
import { useAuth } from "../context/auth.context";
import Swal from 'sweetalert2';

function AsistenciasPage() {
    const [materia, setMateria] = useState(null);
    const [alumnos, setAlumnos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuth } = useAuth();

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
            return;
        }

        const loadData = async () => {
            try {
                const materiaRes = await getMateriaRequest(id);
                const alumnosRes = await getAlumnosByFilterRequest(id);

                setMateria(materiaRes.data);
                setAlumnos(alumnosRes.data);
            } catch (error) {
                console.error("Error loading data:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo cargar la información'
                });
                navigate('/inicioProfesor');
            } finally {
                setLoading(false);
            }
        };

        if (id) loadData();
    }, [id, navigate, isAuth]);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {materia?.nombre} - Lista de Asistencia
                </h2>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Matrícula
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Asistencia
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {alumnos.map((alumno) => (
                                <tr key={alumno._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {alumno.matricula}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {alumno.nombreCompleto}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select 
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Seleccionar</option>
                                            <option value="presente">Presente</option>
                                            <option value="ausente">Ausente</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AsistenciasPage;

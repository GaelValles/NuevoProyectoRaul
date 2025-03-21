import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Swal from 'sweetalert2';
import { deleteProfesorRequest, getProfesoresRequest } from "../api/auth.profesor";
import SidePage from "../components/sidebar"; // Add this import

function ProfesoresPage() {
    const [profesores, setProfesores] = useState([]);
    const [selectedProfesores, setSelectedProfesores] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfesores = async () => {
            try {
                const response = await getProfesoresRequest();
                setProfesores(response.data);
            } catch (error) {
                console.error("Error al obtener profesores:", error);
            }
        };
        fetchProfesores();
    }, []);

    const handleDelete = async () => {
        if (selectedProfesores.length === 0) {
            Swal.fire({
                title: 'Atención',
                text: 'Debes seleccionar al menos un profesor para eliminar.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }

        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Se eliminarán los profesores seleccionados",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await Promise.all(selectedProfesores.map(id => deleteProfesorRequest(id)));
                setProfesores(prevProfesores => 
                    prevProfesores.filter(profesor => !selectedProfesores.includes(profesor._id))
                );
                setSelectedProfesores([]);
                Swal.fire('¡Eliminados!', 'Los profesores han sido eliminados.', 'success');
            } catch (error) {
                console.error("Error al eliminar profesores:", error);
                Swal.fire('Error', 'No se pudieron eliminar los profesores.', 'error');
            }
        }
    };

    const handleCheckboxChange = (id, event) => {
        event.stopPropagation();
        setSelectedProfesores(prev => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const filteredProfesores = profesores.filter(profesor =>
        profesor.nombre_completo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profesor.correo?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-gray-100">
            <SidePage />
            <div className="flex-1 p-8 pl-[300px]">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Profesores</h1>
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Buscar profesor..."
                            className="px-4 py-2 border rounded-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Link
                            to="/registrarProfesor"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Agregar Profesor
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                            Eliminar Seleccionados
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProfesores.map(profesor => (
                        <div
                            key={profesor._id}
                            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                            onClick={() => navigate(`/perfilProfesor/${profesor._id}`)}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                                    {profesor.foto_perfil?.secure_url ? (
                                        <img
                                            src={profesor.foto_perfil.secure_url}
                                            alt=""
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-2xl text-gray-600">
                                            {profesor.nombre_completo?.[0]}
                                        </span>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold">{profesor.nombre_completo}</h3>
                                    <p className="text-sm text-gray-600">{profesor.correo}</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={selectedProfesores.includes(profesor._id)}
                                    onChange={(e) => handleCheckboxChange(profesor._id, e)}
                                    className="w-5 h-5"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProfesoresPage;

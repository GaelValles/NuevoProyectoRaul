import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SidePage from "../components/sidebar";
import { useAuth } from "../context/auth.context";
import Swal from 'sweetalert2';

function CamionesPage() {
    const { user, getCamiones, deleteCamionRequest } = useAuth();
    const [camiones, setCamiones] = useState([]);
    const [selectedCamiones, setSelectedCamiones] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCamiones = async () => {
            const camionesData = await getCamiones();
            setCamiones(camionesData.filter(camion => camion.estatus !== false));
        };
        fetchCamiones();
    }, [getCamiones]);

    const handleDelete = async () => {
        if (selectedCamiones.length === 0) {
            Swal.fire({
                title: 'Atención',
                text: 'Debes seleccionar al menos un camión para eliminar.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }

        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se eliminarán los camiones seleccionados",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await Promise.all(selectedCamiones.map(async (idcamion) => {
                        await deleteCamionRequest(idcamion);
                    }));
                    const updatedCamiones = camiones.filter(camion => !selectedCamiones.includes(camion._id));
                    setCamiones(updatedCamiones);
                    setSelectedCamiones([]);
                    Swal.fire(
                        'Eliminados!',
                        'Los camiones seleccionados han sido eliminados.',
                        'success'
                    );
                } catch (error) {
                    console.error("Error al eliminar camiones:", error);
                    Swal.fire(
                        'Error!',
                        'Ocurrió un error al intentar eliminar los camiones seleccionados.',
                        'error'
                    );
                }
            }
        });
    };

    const handleCheckboxChange = (idcamion) => {
        setSelectedCamiones(prevSelected => {
            if (prevSelected.includes(idcamion)) {
                return prevSelected.filter(id => id !== idcamion);
            } else {
                return [...prevSelected, idcamion];
            }
        });
    };

    const handleCardClick = (idcamion) => {
        navigate(`/perfilCamion/${idcamion}`);
    };

    const filteredCamiones = camiones.filter((camion) =>
        camion.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camion.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camion.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camion.placasMx.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex">
            <SidePage />
            <div className="flex-1 p-6 lg:ml-[300px]">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-4xl text-black">Camiones</h1>
                    <div className="flex items-center space-x-2 p-2 rounded">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border-l-transparent border-gray-800 border-r-transparent border-t-transparent border-b-2 border-solid mt-3 mr-2"
                            style={{ width: '400px' }}
                        />
                        <button className="text-gray-500">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link to="/registrarCamion" className="flex items-center bg-blue-500 text-white h-10 mt-3 py-2 px-4 rounded-full hover:bg-blue-600 mr-2">Agregar</Link>
                        <button onClick={handleDelete} className="bi bi-trash flex items-center bg-red-500 text-white h-10 mt-3 py-2 px-4 rounded-full hover:bg-red-600 mr-2"> Eliminar</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCamiones.length === 0 ? (
                        <div className="text-center text-gray-600 mt-8 mb-4 text-2xl font-bold">No se ha encontrado ningún camión</div>
                    ) : (
                        <>
                            {filteredCamiones.map((camion) => (
                                <div key={camion._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between cursor-pointer" onClick={() => handleCardClick(camion._id)}>
                                    <div>
                                        <h1 className="text-xl font-semibold">{camion.marca} {camion.modelo}</h1>
                                        <p className="text-gray-600">{camion.color}</p>
                                        <p className="text-gray-600">{camion.placasMx}</p>
                                    </div>
                                    <div className="flex items-center rounded-full justify-between mt-4">
                                        <input 
                                            type="checkbox" 
                                            className="rounded-full mr-2" 
                                            onChange={() => handleCheckboxChange(camion._id)}
                                            checked={selectedCamiones.includes(camion._id)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                </div>
                            ))}
                            <Link to="/registrarCamion" className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center text-blue-500">
                                <i className="bi bi-plus-lg text-4xl"></i>
                                <span>Agregar Camión</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CamionesPage;

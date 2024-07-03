import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SidePage from "../components/sidebar";
import { useAuth } from "../context/auth.context";
import Swal from 'sweetalert2';

function CajasPage() {
    const { user, getCajas } = useAuth();
    const [cajas, setCajas] = useState([]);
    const [selectedCajas, setSelectedCajas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCajas = async () => {
            const cajasData = await getCajas();
            setCajas(cajasData.filter(caja => caja.estatus !== false));
        };
        fetchCajas();
    }, []);

    const handleDelete = async () => {
        if (selectedCajas.length === 0) {
            Swal.fire({
                title: 'Atención',
                text: 'Debes seleccionar al menos un caja para eliminar.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }

        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se eliminarán los cajas seleccionados",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await Promise.all(selectedCajas.map(async (idcaja) => {
                        await deleteCajaRequest(idcaja);
                    }));
                    const updatedCajas = cajas.filter(caja => !selectedCajas.includes(caja._id));
                    setCajas(updatedCajas);
                    setSelectedCajas([]);
                    Swal.fire(
                        'Eliminados!',
                        'Las cajas seleccionados han sido eliminados.',
                        'success'
                    );
                } catch (error) {
                    console.error("Error al eliminar cajas:", error);
                    Swal.fire(
                        'Error!',
                        'Ocurrió un error al intentar eliminar las cajas seleccionados.',
                        'error'
                    );
                }
            }
        });
    };

    const handleCheckboxChange = (idcaja) => {
        setSelectedCajas(prevSelected => {
            if (prevSelected.includes(idcaja)) {
                return prevSelected.filter(id => id !== idcaja);
            } else {
                return [...prevSelected, idcaja];
            }
        });
    };

const handleCardClick = (idcaja) => {
        navigate(`/perfilCaja/${idcaja}`);
};

const filteredCajas = cajas.filter((caja) =>
        caja.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caja.numSerie.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caja.numEco.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caja.placas.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
        <div className="flex">
            <SidePage />
            <div className="flex-1 p-6 lg:ml-[300px]">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-4xl text-black">Cajas</h1>
                    <div className="flex items-center space-x-2 p-2 rounded">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border-l-transparent border-blue-500 border-r-transparent border-t-transparent border-b-2 border-solid mt-3 mr-2"
                            style={{ width: '400px' }}
                        />
                        <button className="text-gray-500">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="bi bi-download flex items-center bg-green-500 text-white h-10 mt-3 py-2 px-4 rounded-full hover:bg-green-600 mr-2"></button>
                        <Link to= "/registrarCaja" className="flex items-center bg-blue-500 text-white h-10 mt-3 py-2 px-4 rounded-full hover:bg-blue-600 mr-2">Agregar</Link>
                        <button onClick={handleDelete} className="bi bi-trash flex items-center bg-red-500 text-white h-10 mt-3 py-2 px-4 rounded-full hover:bg-red-600 mr-2"> Eliminar</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCajas.length === 0 ? (
                        <div className="text-center text-gray-600 mt-8 mb-4 text-2xl font-bold">No se ha encontrado ninguna caja</div>
                    ) : (
                        <>
                            {filteredCajas.map((caja) => (
                                <div key={caja._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between cursor-pointer" onClick={() => handleCardClick(caja._id)}>
                                    <div>
                                        <h1 className="text-xl font-semibold">{caja.marca}</h1>
                                        <p className="text-gray-600">{caja.placas}</p>
                                        <p className="text-gray-600">{caja.numEco}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <input 
                                            type="checkbox" 
                                            className="rounded-xl mr-2" 
                                            onChange={() => handleCheckboxChange(caja._id)}
                                            checked={selectedCajas.includes(caja._id)}
                                            onClick={(e) => e.stopPropagation()} 
                                        />
                                    </div>
                                </div>
                            ))}
                            <Link to="/registrarCaja" className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center text-blue-500">
                                <i className="bi bi-plus-lg text-4xl"></i>
                                <span>Agregar Caja</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
);
}

export default CajasPage;

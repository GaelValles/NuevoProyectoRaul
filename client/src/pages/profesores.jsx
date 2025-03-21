import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SidePage from "../components/sidebar";
import { useAuth } from "../context/auth.context";
import Swal from 'sweetalert2';
import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { deleteProfesorRequest } from "../api/auth.profesor";

function ProfesoresPage() {
    const { user, getConductors, getConductorFiles } = useAuth();
    const [conductores, setConductores] = useState([]);
    const [selectedConductores, setSelectedConductores] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDownloading, setIsDownloading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchConductores = async () => {
            const conductoresData = await getConductors();
            setConductores(conductoresData.filter(conductor => conductor.estatus !== false));
        };
        fetchConductores();
    }, [getConductors]);

    const handleDelete = async () => {
        if (selectedConductores.length === 0) {
            Swal.fire({
                title: 'Atención',
                text: 'Debes seleccionar al menos un conductor para eliminar.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }

        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se eliminarán los conductores seleccionados",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await Promise.all(selectedConductores.map(async (idconductor) => {
                        await deleteConductorRequest(idconductor);
                    }));
                    const updatedConductores = conductores.filter(conductor => !selectedConductores.includes(conductor._id));
                    setConductores(updatedConductores);
                    setSelectedConductores([]);
                    Swal.fire(
                        'Eliminados!',
                        'Los conductores seleccionados han sido eliminados.',
                        'success'
                    );
                } catch (error) {
                    console.error("Error al eliminar conductores:", error);
                    Swal.fire(
                        'Error!',
                        'Ocurrió un error al intentar eliminar los conductores seleccionados.',
                        'error'
                    );
                }
            }
        });
    };

    const handleCheckboxChange = (idconductor) => {
        setSelectedConductores(prevSelected => {
            if (prevSelected.includes(idconductor)) {
                return prevSelected.filter(id => id !== idconductor);
            } else {
                return [...prevSelected, idconductor];
            }
        });
    };

    const handleCardClick = (idconductor) => {
        navigate(`/perfilConductor/${idconductor}`);
    };

    const handleDownload = async () => {
        if (selectedConductores.length === 0) {
          Swal.fire({
            title: 'Atención',
            text: 'Debes seleccionar al menos un conductor para descargar sus archivos.',
            icon: 'warning',
            confirmButtonText: 'OK'
          });
          return;
        }
      
        Swal.fire({
          title: '¿Estás seguro?',
          text: "Se descargarán los archivos de los conductores seleccionados",
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, descargar',
          cancelButtonText: 'Cancelar'
        }).then(async (result) => {
          if (result.isConfirmed) {
            setIsDownloading(true);
            try {
              const zip = new JSZip();
      
              await Promise.all(selectedConductores.map(async (idconductor) => {
                const files = await getConductorFiles(idconductor);
                const folder = zip.folder(`conductor_${idconductor}`);
      
                await Promise.all(files.map(async file => {
                  const response = await axios.get(file.url, {
                    responseType: 'arraybuffer'
                  });
                  folder.file(`${file.name}.${file.format}`, response.data);
                }));
              }));
      
              const content = await zip.generateAsync({ type: 'blob' });
              saveAs(content, 'conductores_archivos.zip');
      
              Swal.fire(
                'Descargados!',
                'Los archivos de los conductores seleccionados han sido descargados.',
                'success'
              );
            } catch (error) {
              console.error("Error al descargar archivos de los conductores:", error);
              Swal.fire(
                'Error!',
                'Ocurrió un error al intentar descargar los archivos de los conductores seleccionados.',
                'error'
              );
            } finally {
              setIsDownloading(false);
            }
          }
        });
      };

    const filteredConductores = conductores.filter((conductor) =>
        conductor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conductor.numGafete.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conductor.numLicencia.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conductor.numVisa.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col lg:flex-row">
            <SidePage />
            <div className="flex-1 p-6 lg:ml-[300px]">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <h1 className="text-4xl text-black mb-4 md:mb-0">Conductores</h1>
                    <div className="flex flex-col md:flex-row md:items-center w-full md:w-auto">
                        <div className="flex items-center space-x-2 p-2 rounded w-full md:w-auto mb-4 md:mb-0">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border-b-2 border-gray-800 mt-3 mr-2 w-full md:w-96"
                            />
                            <button className="text-gray-500">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                        <div className="flex flex-wrap md:items-center md:space-x-2 w-full md:w-auto">
                            <button
                                onClick={handleDownload}
                                className={`flex items-center justify-center bg-green-500  text-white h-10 py-2 px-4 rounded-full hover:bg-green-600 mb-2 md:mb-0 ${isDownloading ? 'cursor-not-allowed' : ''}`}
                                disabled={isDownloading}
                            >
                                {isDownloading ? 'Descargando...' : 'Descargar'}
                            </button>
                            <Link
                                to="/registrar"
                                className="flex items-center justify-center bg-blue-500 text-white h-10 py-2 px-4 rounded-full hover:bg-blue-600 mb-2 md:mb-0"
                            >
                                Agregar
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="flex items-center justify-center bg-red-500 text-white h-10 py-2 px-4 rounded-full hover:bg-red-600"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredConductores.length === 0 ? (
                        <div className="text-center text-gray-600 mt-8 mb-4 text-2xl font-bold">
                            No se ha encontrado ningún conductor
                        </div>
                    ) : (
                        <>
                            {filteredConductores.map((conductor) => (
                                <div
                                    key={conductor._id}
                                    className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between cursor-pointer transition-transform transform hover:scale-105"
                                    onClick={() => handleCardClick(conductor._id)}
                                >
                                    <div>
                                        <h1 className="text-xl font-semibold">{conductor.nombre}</h1>
                                        <p className="text-gray-600 truncate">Número de gafete: {conductor.numGafete}</p>
                                        <p className="text-gray-600 truncate">Número de licencia: {conductor.numLicencia}</p>
                                        <p className="text-gray-600 truncate">Número de visa: {conductor.numVisa}</p>
                                    </div>
                                    <div className="flex items-center rounded-full justify-between mt-4">
                                        <input
                                            type="checkbox"
                                            className="rounded-full mr-2"
                                            onChange={() => handleCheckboxChange(conductor._id)}
                                            checked={selectedConductores.includes(conductor._id)}
                                            onClick={(e) => e.stopPropagation()} // Evitar que el checkbox active el evento de click en el card
                                        />
                                    </div>
                                </div>
                            ))}
                            <Link
                                to="/registrar"
                                className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center text-blue-500 transition-transform transform hover:scale-105"
                            >
                                <i className="bi bi-plus-lg text-4xl"></i>
                                <span>Agregar Conductor</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
    
}

export default ProfesoresPage;

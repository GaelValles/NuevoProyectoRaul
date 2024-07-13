import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SidePage from "../components/sidebar";
import { useAuth } from "../context/auth.context";
import Swal from 'sweetalert2';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { deletePermisoRequest } from "../api/auth.permiso";

function PermisosPage() {
    const { user, getPermisos, getPermisoFile } = useAuth();
    const [permisos, setPermisos] = useState([]);
    const [selectedPermisos, setSelectedPermisos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDownloading, setIsDownloading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPermisos = async () => {
            const permisosData = await getPermisos();
            setPermisos(permisosData.filter(permiso => permiso.estatus !== false));
        };
        fetchPermisos();
    }, [getPermisos]);

    const handleDelete = async () => {
        if (selectedPermisos.length === 0) {
            Swal.fire({
                title: 'Atención',
                text: 'Debes seleccionar al menos un permiso para eliminar.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }

        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se eliminarán los permisos seleccionados",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await Promise.all(selectedPermisos.map(async (id) => {
                        await deletePermisoRequest(id);
                    }));
                    const updatedPermisos = permisos.filter(permiso => !selectedPermisos.includes(permiso._id));
                    setPermisos(updatedPermisos);
                    setSelectedPermisos([]);
                    Swal.fire(
                        'Eliminados!',
                        'Los permisos seleccionados han sido eliminados.',
                        'success'
                    );
                } catch (error) {
                    console.error("Error al eliminar permisos:", error);
                    Swal.fire(
                        'Error!',
                        'Ocurrió un error al intentar eliminar los permisos seleccionados.',
                        'error'
                    );
                }
            }
        });
    };

    const handleDownload = async () => {
        if (selectedPermisos.length === 0) {
          Swal.fire({
            title: 'Atención',
            text: 'Debes seleccionar al menos un permiso para descargar su archivo.',
            icon: 'warning',
            confirmButtonText: 'OK'
          });
          return;
        }
      
        Swal.fire({
          title: '¿Estás seguro?',
          text: "Se descargarán los archivos de los permisos seleccionados",
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
      
              await Promise.all(selectedPermisos.map(async (idpermiso) => {
                const file = await getPermisoFile(idpermiso);
                if (file) {
                  const response = await axios.get(file.url, {
                    responseType: 'arraybuffer'
                  });
                  zip.file(`${file.name}.${file.format}`, response.data);
                }
              }));
      
              const content = await zip.generateAsync({ type: 'blob' });
              saveAs(content, 'permisos_archivos.zip');
      
              Swal.fire(
                'Descargados!',
                'Los archivos de los permisos seleccionados han sido descargados.',
                'success'
              );
            } catch (error) {
              console.error("Error al descargar archivos de los permisos:", error);
              Swal.fire(
                'Error!',
                'Ocurrió un error al intentar descargar los archivos de los permisos seleccionados.',
                'error'
              );
            } finally {
              setIsDownloading(false);
            }
          }
        });
      };

    const handleCheckboxChange = (idpermiso) => {
        setSelectedPermisos(prevSelected => {
            if (prevSelected.includes(idpermiso)) {
                return prevSelected.filter(id => id !== idpermiso);
            } else {
                return [...prevSelected, idpermiso];
            }
        });
    };

    const handleCardClick = (idpermiso) => {
        navigate(`/perfilPermiso/${idpermiso}`);
    };

    const filteredPermisos = permisos.filter((permiso) =>
        permiso.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        permiso.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex">
            <SidePage />
            <div className="flex-1 p-6 lg:ml-[300px]">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-4xl text-black">Permisos</h1>
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
                    <button onClick={handleDownload} className={`bi bi-download flex items-center bg-green-500 text-white h-10 mt-3 py-2 px-4 rounded-full hover:bg-green-600 mr-2 ${isDownloading ? 'cursor-not-allowed' : ''}`} disabled={isDownloading}>
                            {isDownloading ? 'Descargando...' : 'Descargar'}
                        </button>
                        <Link to= "/registrarPermiso" className="flex items-center bg-blue-500 text-white h-10 mt-3 py-2 px-4 rounded-full hover:bg-blue-600 mr-2">Agregar</Link>
                        <button onClick={handleDelete} className="bi bi-trash flex items-center bg-red-500 text-white h-10 mt-3 py-2 px-4 rounded-full hover:bg-red-600 mr-2"> Eliminar</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPermisos.length === 0 ? (
                        <div className="text-center text-gray-600 mt-8 mb-4 text-2xl font-bold">No se ha encontrado ningún permiso</div>
                    ) : (
                        <>
                            {filteredPermisos.map((permiso) => (
                                <div key={permiso._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between cursor-pointer" onClick={() => handleCardClick(permiso._id)}>
                                    <div>
                                        <h1 className="text-xl font-semibold">{permiso.titulo} </h1>
                                        <p className="text-gray-600">{permiso.descripcion}</p>
                                        <p className="text-gray-600">{permiso.fechaFinal}</p>
                                    </div>
                                    <div className="flex items-center rounded-full justify-between mt-4">
                                        <input 
                                            type="checkbox" 
                                            className="rounded-full mr-2" 
                                            onChange={() => handleCheckboxChange(permiso._id)}
                                            checked={selectedPermisos.includes(permiso._id)}
                                            onClick={(e) => e.stopPropagation()} // Evitar que el checkbox active el evento de click en el card
                                        />
                                    </div>
                                </div>
                            ))}
                            <Link to="/registrarPermiso" className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center text-blue-500">
                                <i className="bi bi-plus-lg text-4xl"></i>
                                <span>Agregar Permiso</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PermisosPage;

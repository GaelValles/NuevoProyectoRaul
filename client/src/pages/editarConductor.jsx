import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/auth.context';
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidepage from '../components/sidebar';
import Swal from 'sweetalert2';

function EditarConductorPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, setValue } = useForm();
    const { editarConductor, getConductorById, setUser } = useAuth();
    const [previews, setPreviews] = useState({});
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchConductor = async () => {
            const conductorData = await getConductorById(id);
            if (conductorData) {
                setValue('nombre', conductorData.nombre);
                setValue('fechaNacimiento', conductorData.fechaNacimiento.split('T')[0]);
                setValue('numLicencia', conductorData.numLicencia);
                setValue('numVisa', conductorData.numVisa);
                setValue('numGafete', conductorData.numGafete);
                ['solicitud', 'ine', 'visa', 'fast', 'antidoping', 'antecedentes', 'domicilio', 'psicofisico', 'escuela'].forEach(field => {
                    setPreviews(prev => ({ ...prev, [field]: conductorData[field] ? conductorData[field].secure_url : null }));
                });
            }
            setLoading(false);
        };
        fetchConductor();
    }, [id, getConductorById, setValue]);

    const onSubmit = handleSubmit(async (data) => {
        setIsSubmitting(true);
        
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
    
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => {
            if (input.files.length > 0) {
                formData.append(input.name, input.files[0]);
            }
        });
    
        try {
            const updatedConductor = await editarConductor(id, formData);
            setUser(updatedConductor.user);
            Swal.fire({
                icon: 'success',
                title: 'Conductor actualizado',
                text: 'El conductor se ha actualizado correctamente.',
                timer: 2000,
                showConfirmButton: false
            });
            navigate("/conductores");
        } catch (error) {
            console.error('Error al actualizar el conductor:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al actualizar el conductor.',
            });
        } finally {
            setIsSubmitting(false);
        }
    });
    

    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        if (file) {
            setPreviews(prev => ({ ...prev, [name]: URL.createObjectURL(file) }));
        }
    };

    if (loading) {
        return         <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-70 flex justify-center items-center">
        <div className="border-8 border-gray-300 border-t-blue-500 rounded-full w-20 h-20 animate-spin"></div>
    </div>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidepage />
            <div className="flex flex-col flex-1 justify-center items-center p-4 lg:ml-[300px]">
                <div className="w-full max-w-3xl">
                    <div className="bg-white rounded-lg border-4 border-gray-700 p-8 shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl text-gray-800 font-semibold">Editar Conductor</h1>
                            <Link to="/conductores" className="text-blue-500 hover:text-blue-700 transition duration-300">
                                <i className="bi bi-arrow-left"></i> Volver
                            </Link>
                        </div>
                        <form onSubmit={onSubmit} encType="multipart/form-data" className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre
                                </label>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="nombre"
                                    {...register('nombre', { required: true })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechaNacimiento">
                                    Fecha de Nacimiento
                                </label>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    type="date"
                                    id="fechaNacimiento"
                                    {...register('fechaNacimiento', { required: true })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numLicencia">
                                    Número de Licencia
                                </label>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="numLicencia"
                                    {...register('numLicencia', { required: true })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numVisa">
                                    Número de Visa
                                </label>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="numVisa"
                                    {...register('numVisa', { required: true })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numGafete">
                                    Número de Gafete
                                </label>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="numGafete"
                                    {...register('numGafete', { required: true })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {['solicitud', 'ine', 'visa', 'fast', 'antidoping', 'antecedentes', 'domicilio', 'psicofisico', 'escuela'].map((field, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        <label className="text-gray-700 text-sm font-bold mb-2 capitalize">{field}</label>
                                        {previews[field] && (
                                            <img src={previews[field]} alt={`${field} preview`} className="h-40 w-40 object-cover rounded-md mb-2" />
                                        )}
                                        <label
                                            htmlFor={field}
                                            className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
                                        >
                                            Subir
                                        </label>
                                        <input
                                            className="hidden"
                                            type="file"
                                            id={field}
                                            name={field}
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-gray-700 hover:bg-gray-900 w-full text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Guardando...' : 'Guardar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditarConductorPage;

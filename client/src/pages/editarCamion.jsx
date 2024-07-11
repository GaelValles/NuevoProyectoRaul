import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/auth.context';
import Sidepage from '../components/sidebar';
import Swal from 'sweetalert2';

function EditarCamionPage() {
    const { id } = useParams();
    const { register, handleSubmit, reset, setValue } = useForm();
    const { getCamionById, editarCamion } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCamion = async () => {
            const camionData = await getCamionById(id);
            if (camionData) {
                setValue('marca', camionData.marca);
                setValue('modelo', camionData.modelo);
                setValue('color', camionData.color);
                setValue('placasMx', camionData.placasMx);
                setValue('placasUsa', camionData.placasUsa);
                setValue('numEco', camionData.numEco);
                setValue('numSerie', camionData.numSerie);
                setValue('mantenimiento', camionData.mantenimiento);
            }
            setLoading(false);
        };
        fetchCamion();
    }, [id, getCamionById, setValue]);

    const onSubmit = handleSubmit(async (value) => {
        try {
            await editarCamion(id, value);
            Swal.fire({
                title: 'Camion actualizado',
                text: 'La camion se ha actualizado correctamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            navigate("/camiones");
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al actualizar el camion. Inténtalo de nuevo.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Sidepage />
            <div className="w-full max-w-3xl">
                <div className="bg-white rounded-lg border-4 border-gray-700 p-8 shadow-lg hover:shadow-2xl hover:shadow-gray-500 transition duration-300 ease-in-out">
                    <h1 className="text-2xl text-center text-gray-800 font-semibold mt-4">Actualizar camion</h1>
                    <Link to="/camiones" className="bi bi-arrow-left flex items-center bg-blue-500 text-white h-10 mt-3 py-2 px-4 rounded-full hover:bg-blue-600 mr-2"></Link>
                    <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 gap-4">
                        <div>
                        <div>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    id="marca"
                                    type="text"
                                    placeholder="Marca"
                                    {...register('marca', { required: true })}
                                />
                            </div>
                            <div>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    id="modelo"
                                    type="text"
                                    placeholder="Modelo"
                                    {...register('modelo', { required: true })}
                                />
                            </div>
                            <div>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    id="color"
                                    type="text"
                                    placeholder="Color"
                                    {...register('color', { required: true })}
                                />
                            </div>
                            <div>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    id="placasMx"
                                    type="text"
                                    placeholder="Placas México"
                                    {...register('placasMx', { required: true })}
                                />
                            </div>
                            <div>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    id="placasUsa"
                                    type="text"
                                    placeholder="Placas USA"
                                    {...register('placasUsa', { required: true })}
                                />
                            </div>
                            <div>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    id="numEco"
                                    type="text"
                                    placeholder="Número de Eco"
                                    {...register('numEco', { required: true })}
                                />
                            </div>
                            <div>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    id="numSerie"
                                    type="text"
                                    placeholder="Número de serie"
                                    {...register('numSerie', { required: true })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mantenimiento">
                                    Último mantenimiento realizado
                                </label>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    id="mantenimiento"
                                    type="date"
                                    {...register('mantenimiento', { required: true })}
                                />
                            </div>
                                </div>
                                <div className="col-span-full md:col-span-2 flex justify-center">
                                    <button
                                        type="submit"
                                        id="botonIngresar"
                                        className="rounded-full bg-gray-700 hover:bg-gray-900 text-white font-semibold py-2 px-4 w-full md:w-1/2 mt-4 transition duration-300 ease-in-out"
                                    >
                                        Actualizar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
        
export default EditarCamionPage;
        

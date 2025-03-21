import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/auth.context';
import Sidepage from '../components/sidebar';
import Swal from 'sweetalert2';

function EditarProfesorPage() {
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

                // Formatear la fecha para establecerla en el input de tipo date
                const formattedDate = new Date(camionData.mantenimiento).toISOString().split('T')[0];
                setValue('mantenimiento', formattedDate);
            }
            setLoading(false);
        };
        fetchCamion();
    }, [id, getCamionById, setValue]);

    const onSubmit = handleSubmit(async (value) => {
        try {
            await editarCamion(id, value);
            Swal.fire({
                title: 'Camión actualizado',
                text: 'El camión se ha actualizado correctamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            navigate("/camiones");
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al actualizar el camión. Inténtalo de nuevo.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });

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
                            <h1 className="text-2xl text-gray-800 font-semibold">Actualizar camión</h1>
                            <Link to="/camiones" className="text-blue-500 hover:text-blue-700 transition duration-300">
                                <i className="bi bi-arrow-left"></i> Volver
                            </Link>
                        </div>
                        <form onSubmit={onSubmit} className="space-y-4">
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
                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Actualizar
                                </button>
                                <Link
                                    to="/camiones"
                                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                >
                                    Cancelar
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditarProfesorPage;

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/auth.context';
import Sidepage from '../components/sidebar';
import Swal from 'sweetalert2';

function EditarCajaPage() {
    const { id } = useParams();
    const { register, handleSubmit, reset, setValue } = useForm();
    const { getCajaById, editarCaja } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCaja = async () => {
            const cajaData = await getCajaById(id);
            if (cajaData) {
                setValue('placas', cajaData.placas);
                setValue('numEco', cajaData.numEco);
                setValue('marca', cajaData.marca);
                setValue('anio', cajaData.anio);
                setValue('numSerie', cajaData.numSerie);
            }
            setLoading(false);
        };
        fetchCaja();
    }, [id, getCajaById, setValue]);

    const onSubmit = handleSubmit(async (value) => {
        try {
            await editarCaja(id, value);
            Swal.fire({
                title: 'Caja actualizada',
                text: 'La caja se ha actualizado correctamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            navigate("/cajas");
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al actualizar la caja. Inténtalo de nuevo.',
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
                    <h1 className="text-2xl text-center text-gray-800 font-semibold mt-4">Actualizar caja</h1>
                    <Link to="/cajas" className="bi bi-arrow-left flex items-center bg-blue-500 text-white h-10 mt-3 py-2 px-4 rounded-full hover:bg-blue-600 mr-2"></Link>
                    <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 gap-4">
                        <div>
                            <div className="mb-4">
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="placas"
                                    type="text"
                                    placeholder="Placas de la caja"
                                    {...register('placas', { required: true })}
                                />
                            </div>
                                    <div className="mb-4">
                                        <input
                                            className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="numEco"
                                            type="text"
                                            placeholder="Número de eco"
                                            {...register('numEco', { required: true })}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="marca"
                                            type="text"
                                            placeholder="marca"
                                            {...register('marca', { required: true })}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="anio"
                                            type="number"
                                            placeholder="Año"
                                            {...register('anio', { required: true })}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="numSerie"
                                            type="text"
                                            placeholder="Número de serie"
                                            {...register('numSerie', { required: true })}
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
        
        export default EditarCajaPage;
        

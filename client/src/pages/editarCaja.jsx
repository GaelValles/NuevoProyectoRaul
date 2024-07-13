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
        <div className="flex min-h-screen bg-gray-100">
            <Sidepage />
            <div className="flex flex-col flex-1 justify-center items-center p-4 lg:ml-[300px]">
                <div className="w-full max-w-3xl">
                    <div className="bg-white rounded-lg border-4 border-gray-700 p-8 shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl text-gray-800 font-semibold">Actualizar caja</h1>
                            <Link to="/cajas" className="text-blue-500 hover:text-blue-700 transition duration-300">
                                <i className="bi bi-arrow-left"></i> Volver
                            </Link>
                        </div>
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    id="placas"
                                    type="text"
                                    placeholder="Placas de la caja"
                                    {...register('placas', { required: true })}
                                />
                            </div>
                            <div>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    id="numEco"
                                    type="text"
                                    placeholder="Número de eco"
                                    {...register('numEco', { required: true })}
                                />
                            </div>
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
                                    id="anio"
                                    type="number"
                                    placeholder="Año"
                                    {...register('anio', { required: true })}
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
                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Actualizar
                                </button>
                                <Link
                                    to="/cajas"
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

export default EditarCajaPage;

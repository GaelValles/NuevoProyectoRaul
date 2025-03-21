import React from 'react';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import Sidepage from '../components/sidebar';
import Swal from 'sweetalert2';

function RegistrarCajaPage() {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (value) => {
        try {
            // Aquí iría la lógica para registrar la caja
            console.log(value);
            Swal.fire({
                title: 'Caja registrada',
                text: 'La caja se ha registrado correctamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            reset(); // Resetear el formulario después de enviar
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al registrar la caja. Inténtalo de nuevo.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidepage />
            <div className="flex-1 flex justify-center items-center ">
                <div className="w-full max-w-3xl ml-40">
                    <div className="bg-white rounded-lg border-4 border-gray-700 p-8 shadow-lg hover:shadow-2xl transition duration-300 ease-in-out relative">
                        <h1 className="text-2xl text-center text-gray-800 font-semibold mb-4">Registrar Caja</h1>
                        <Link to="/cajas" className="text-blue-500 hover:text-blue-700 transition duration-300 absolute top-4 right-4">
                            <i className="bi bi-arrow-left"></i> Volver
                        </Link>
                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
                            <div className="mb-4">
                                <label htmlFor="placas" className="block text-sm font-bold text-gray-700">Placas de la caja</label>
                                <input
                                    id="placas"
                                    type="text"
                                    placeholder="Placas de la caja"
                                    {...register('placas', { required: true })}
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="numEco" className="block text-sm font-bold text-gray-700">Número de Eco</label>
                                <input
                                    id="numEco"
                                    type="text"
                                    placeholder="Número de Eco"
                                    {...register('numEco', { required: true })}
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="marca" className="block text-sm font-bold text-gray-700">Marca</label>
                                <input
                                    id="marca"
                                    type="text"
                                    placeholder="Marca"
                                    {...register('marca', { required: true })}
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="anio" className="block text-sm font-bold text-gray-700">Año</label>
                                <input
                                    id="anio"
                                    type="number"
                                    placeholder="Año"
                                    {...register('anio', { required: true })}
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="numSerie" className="block text-sm font-bold text-gray-700">Número de Serie</label>
                                <input
                                    id="numSerie"
                                    type="text"
                                    placeholder="Número de Serie"
                                    {...register('numSerie', { required: true })}
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="col-span-full flex justify-center">
                                <button
                                    type="submit"
                                    className="rounded-full bg-gray-700 hover:bg-gray-900 text-white font-semibold py-2 px-4 w-full md:w-1/2 mt-4 transition duration-300 ease-in-out"
                                >
                                    Ingresar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrarCajaPage;

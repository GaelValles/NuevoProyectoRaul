import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { useAuth } from '../context/auth.context.jsx';
import { useNavigate } from 'react-router-dom';
import { registerCamion } from '../api/auth.camion.js';
import Sidepage from '../components/sidebar.jsx';
import Swal from 'sweetalert2';

function RegistrarCamionPage() {
    const { register, handleSubmit, reset } = useForm();
    const { registrarCamion } = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (value) => {
        setIsSubmitting(true);
        try {
            const res = await registerCamion(value);
            console.log(res);
            Swal.fire({
                title: 'Camión registrado',
                text: 'El camión se ha registrado correctamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            reset(); // Resetear el formulario después de enviar
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al registrar el camión. Inténtalo de nuevo.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setIsSubmitting(false);
        }
    });

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidepage />
            <div className="flex flex-1 justify-center items-center">
                <div className="w-full max-w-3xl">
                    <div className="bg-white rounded-lg border-4 border-gray-700 p-8 shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl text-gray-800 font-semibold">Registrar Camión</h1>
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
                            <div className="col-span-full md:col-span-2 flex justify-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`rounded-full bg-gray-700 hover:bg-gray-900 text-white font-semibold py-2 px-4 w-full md:w-1/2 mt-4 transition duration-300 ease-in-out ${isSubmitting ? 'cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? (
                                        <svg className="animate-spin h-5 w-5 mx-auto border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                                    ) : (
                                        'Ingresar'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrarCamionPage;

import React from 'react';
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

    const onSubmit = handleSubmit(async (value) => {
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
        }
    });

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Sidepage />
            <div className="w-full max-w-3xl">
                <div className="bg-white rounded-lg border-4 border-gray-700 p-8 shadow-lg hover:shadow-2xl hover:shadow-gray-500 transition duration-300 ease-in-out">
                    <h1 className="text-2xl text-center text-gray-800 font-semibold mt-4">Registrar Camion</h1>
                    <Link to= "/camiones" className="bi bi-arrow-left flex items-center bg-blue-500 text-white h-10 mt-3 py-2 px-4 rounded-full hover:bg-blue-600 mr-2"></Link>
                    <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 gap-4">
                        <div>
                            <div className="mb-4">
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="marca"
                                    type="text"
                                    placeholder="Marca"
                                    {...register('marca', { required: true })}
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="modelo"
                                    type="text"
                                    placeholder="Modelo"
                                    {...register('modelo', { required: true })}
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="color"
                                    type="text"
                                    placeholder="Color"
                                    {...register('color', { required: true })}
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="placasMx"
                                    type="text"
                                    placeholder="Placas México"
                                    {...register('placasMx', { required: true })}
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="placasUsa"
                                    type="text"
                                    placeholder="Placas USA"
                                    {...register('placasUsa', { required: true })}
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="numEco"
                                    type="text"
                                    placeholder="Número de Eco"
                                    {...register('numEco', { required: true })}
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
                                Ingresar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegistrarCamionPage;

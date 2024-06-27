import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/auth.context.jsx';
import { useNavigate } from 'react-router-dom';
import { registerPermiso } from '../api/auth.permiso.js';
import Sidepage from '../components/sidebar.jsx';

function RegistrarPermisoPage() {
    const { register, handleSubmit } = useForm();
    const {registrarPermiso}=useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (value) => {
        const res = await registerPermiso(value)
        console.log(res)
    });

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div><Sidepage></Sidepage></div>
            <div className="w-full max-w-3xl">
                <div className="bg-white rounded-lg border-4 border-gray-700 p-8 shadow-lg hover:shadow-2xl hover:shadow-gray-500 transition duration-300 ease-in-out">
                    <h1 className="text-2xl text-center text-gray-800 font-semibold mt-4">Registrar Permiso</h1>
                    <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 gap-4">
                        <div>
                            <div className="mb-4">
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="titulo"
                                    type="text"
                                    placeholder="Título"
                                    {...register('titulo', { required: true })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foto">
                                    Foto o archivo
                                </label>
                                <input
                                    className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="foto"
                                    type="file"
                                    {...register('foto', { required: true })}
                                />
                            </div>
                            <div className="mb-4">
                                <textarea
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="descripcion"
                                    placeholder="Descripción"
                                    rows="4"
                                    {...register('descripcion', { required: true })}
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="fechaFinal"
                                    type="date"
                                    placeholder="Fecha de expiración de la vigencia"
                                    {...register('fechaFinal', { required: true })}
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="fechaAnticipacion"
                                    type="date"
                                    placeholder="Fecha para comenzar a recordar"
                                    {...register('fechaAnticipacion', { required: true })}
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

export default RegistrarPermisoPage;

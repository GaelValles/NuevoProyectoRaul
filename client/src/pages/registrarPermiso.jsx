import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/auth.context.jsx';
<<<<<<< HEAD
=======
import { useNavigate } from 'react-router-dom';
import { registerPermiso } from '../api/auth.permiso.js';
import Sidepage from '../components/sidebar.jsx';
>>>>>>> 41e8507045865e9156a96196e2ae6efbfaa7ae07

function RegistrarPermisoPage() {
    const { register, handleSubmit } = useForm();
    const { registrarPermiso } = useAuth();
    const [isClicked, setIsClicked] = useState(false);

    const onSubmit = handleSubmit(async (values) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => formData.append(key, values[key][0] || values[key]));
        try {
            await registrarPermiso(formData);
        } catch (error) {
            console.error('Error al registrar el permiso:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
            }
        }
    });

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 300);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div><Sidepage></Sidepage></div>
            <div className="w-full max-w-3xl">
                <div className="bg-white rounded-lg border-4 border-gray-700 p-8 shadow-lg hover:shadow-2xl hover:shadow-gray-500 transition duration-300 ease-in-out">
                    <h1 className="text-2xl text-center text-gray-800 font-semibold mt-4">Registrar Permiso</h1>
                    <form onSubmit={onSubmit} encType="multipart/form-data" className="mt-4 grid grid-cols-1 gap-4">
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="titulo">
                                    Título
                                </label>
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="titulo"
                                    type="text"
                                    placeholder="Ingrese el Título aquí"
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
                                    Descripción
                                </label>
                                <textarea
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="descripcion"
                                    placeholder="Ingrese la Descripción aquí"
                                    rows="4"
                                    {...register('descripcion', { required: true })}
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechaFinal">
                                    Fecha de expiración de la vigencia
                                </label>
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="fechaFinal"
                                    type="date"
                                    {...register('fechaFinal', { required: true })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechaAnticipacion">
                                    Fecha para comenzar a recordar
                                </label>
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="avisoAntelacion"
                                    type="date"
                                    {...register('avisoAntelacion', { required: true })}
                                />
                            </div>
                        </div>
                        <div className="col-span-full md:col-span-2 flex justify-center">
                            <button
                                type="submit"
                                id="botonIngresar"
                                onClick={handleClick}
                                className={`rounded-full text-white font-semibold py-2 px-4 w-full md:w-1/2 mt-4 transition duration-300 ease-in-out ${
                                    isClicked ? 'bg-gray-500' : 'bg-gray-700 hover:bg-gray-900'
                                }`}
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

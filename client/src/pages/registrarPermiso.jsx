import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/auth.context.jsx';
import { Link } from "react-router-dom";
import Sidepage from '../components/sidebar.jsx';
import Swal from 'sweetalert2';

function RegistrarPermisoPage() {
    const { register, handleSubmit } = useForm();
    const { registrarPermiso } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (values) => {
        setIsSubmitting(true);
        const formData = new FormData();
        Object.keys(values).forEach(key => {
            if (key === 'foto' && values[key][0]) {
                formData.append(key, values[key][0]);
            } else {
                formData.append(key, values[key]);
            }
        });

        try {
            await registrarPermiso(formData);
            Swal.fire({
                icon: 'success',
                title: 'Permiso registrado',
                text: 'El permiso se ha registrado correctamente.',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            console.error('Error al registrar el permiso:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al registrar el permiso.',
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
                            <h1 className="text-2xl text-gray-800 font-semibold">Registrar Permiso</h1>
                            <Link to="/permisos" className="text-blue-500 hover:text-blue-700 transition duration-300">
                                <i className="bi bi-arrow-left"></i> Volver
                            </Link>
                        </div>
                        <form onSubmit={onSubmit} encType="multipart/form-data" className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="titulo">
                                    Título
                                </label>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    id="titulo"
                                    type="text"
                                    placeholder="Ingrese el Título aquí"
                                    {...register('titulo', { required: true })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foto">
                                    Foto o archivo
                                </label>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    id="foto"
                                    type="file"
                                    {...register('foto', { required: true })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
                                    Descripción
                                </label>
                                <textarea
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    id="descripcion"
                                    placeholder="Ingrese la Descripción aquí"
                                    rows="4"
                                    {...register('descripcion', { required: true })}
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechaFinal">
                                    Fecha de expiración de la vigencia
                                </label>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    id="fechaFinal"
                                    type="date"
                                    {...register('fechaFinal', { required: true })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechaAnticipacion">
                                    Fecha para comenzar a recordar
                                </label>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    id="avisoAntelacion"
                                    type="date"
                                    {...register('avisoAntelacion', { required: true })}
                                />
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`rounded-full text-white font-semibold py-2 px-4 w-full md:w-1/2 bg-gray-700 hover:bg-gray-800 transition duration-300 ease-in-out ${isSubmitting ? 'cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? (
                                        <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
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

export default RegistrarPermisoPage;

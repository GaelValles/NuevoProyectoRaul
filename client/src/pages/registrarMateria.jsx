import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/auth.context';
import { Link, useNavigate } from "react-router-dom";
import { createMateriaRequest } from '../api/auth.materia';
import Swal from 'sweetalert2';

function RegistrarMateriaPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { profesor } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (values) => {
        setIsSubmitting(true);
        try {
            const materiaData = {
                ...values,
                grado: parseInt(values.grado), // Convert grado to number
                profesor: profesor.id
            };
            
            const response = await createMateriaRequest(profesor.id, materiaData);
            
            if (response.data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Materia registrada',
                    text: 'La materia se ha registrado correctamente.',
                    timer: 2000,
                    showConfirmButton: false
                });
                navigate('/inicioProfesor');
            }
        } catch (error) {
            console.error('Error al registrar la materia:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Hubo un problema al registrar la materia.',
            });
        } finally {
            setIsSubmitting(false);
        }
    });

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className="max-w-md mx-auto">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-semibold text-gray-900">Registrar Materia</h1>
                            <Link 
                                to="/inicioProfesor" 
                                className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
                            >
                                Volver
                            </Link>
                        </div>
                        
                        <form onSubmit={onSubmit} className="divide-y divide-gray-200">
                            <div className="py-8 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nombre de la Materia</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        {...register('nombre', { required: 'El nombre es requerido' })}
                                    />
                                    {errors.nombre && (
                                        <span className="text-xs text-red-600">{errors.nombre.message}</span>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Grado</label>
                                    <select
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        {...register('grado', { required: 'El grado es requerido' })}
                                    >
                                        <option value="">Seleccione un grado</option>
                                        {[1, 2, 3, 4, 5, 6].map(grado => (
                                            <option key={grado} value={grado}>{grado}° Grado</option>
                                        ))}
                                    </select>
                                    {errors.grado && (
                                        <span className="text-xs text-red-600">{errors.grado.message}</span>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Grupo</label>
                                    <select
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        {...register('grupo', { required: 'El grupo es requerido' })}
                                    >
                                        <option value="">Seleccione un grupo</option>
                                        {['A', 'B', 'C'].map(grupo => (
                                            <option key={grupo} value={grupo}>Grupo {grupo}</option>
                                        ))}
                                    </select>
                                    {errors.grupo && (
                                        <span className="text-xs text-red-600">{errors.grupo.message}</span>
                                    )}
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Registrando...' : 'Registrar Materia'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrarMateriaPage;

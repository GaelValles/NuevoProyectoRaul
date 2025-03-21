import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { registerProfesor } from '../api/auth.profesor';

function RegistrarProfesorPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [previewCV, setPreviewCV] = useState(null);
    const [previewFoto, setPreviewFoto] = useState(null);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('nombre_completo', data.nombre_completo);
            formData.append('telefono', data.telefono);
            formData.append('correo', data.correo);
            formData.append('password', data.password);
            if (data.cv[0]) formData.append('cv', data.cv[0]);
            if (data.foto_perfil[0]) formData.append('foto_perfil', data.foto_perfil[0]);

            await registerProfesor(formData);

            Swal.fire({
                title: '¡Registro exitoso!',
                text: 'El profesor ha sido registrado correctamente.',
                icon: 'success',
                confirmButtonText: 'Continuar'
            });
            navigate('/profesores');
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.response?.data?.message || 'Error al registrar profesor',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleFilePreview = (e, setPreview) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="px-6 py-8 sm:p-10">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">
                                Registro de Profesor
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Complete el formulario con sus datos profesionales
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                {/* Nombre Completo */}
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nombre Completo
                                    </label>
                                    <input
                                        type="text"
                                        {...register('nombre_completo', { 
                                            required: 'El nombre es requerido',
                                            pattern: {
                                                value: /^[A-Za-zÀ-ÿ\s]{3,100}$/,
                                                message: 'Ingrese un nombre válido'
                                            }
                                        })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.nombre_completo && (
                                        <p className="mt-1 text-sm text-red-600">{errors.nombre_completo.message}</p>
                                    )}
                                </div>

                                {/* Teléfono */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Teléfono
                                    </label>
                                    <input
                                        type="tel"
                                        {...register('telefono', { 
                                            required: 'El teléfono es requerido',
                                            pattern: {
                                                value: /^\d{10}$/,
                                                message: 'Ingrese un número de 10 dígitos'
                                            }
                                        })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.telefono && (
                                        <p className="mt-1 text-sm text-red-600">{errors.telefono.message}</p>
                                    )}
                                </div>

                                {/* Correo */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type="email"
                                        {...register('correo', { 
                                            required: 'El correo es requerido',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Ingrese un correo válido'
                                            }
                                        })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.correo && (
                                        <p className="mt-1 text-sm text-red-600">{errors.correo.message}</p>
                                    )}
                                </div>

                                {/* Contraseña */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        {...register('password', { 
                                            required: 'La contraseña es requerida',
                                            minLength: {
                                                value: 6,
                                                message: 'La contraseña debe tener al menos 6 caracteres'
                                            }
                                        })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                    )}
                                </div>

                                {/* CV */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Curriculum Vitae (PDF)
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        {...register('cv', { required: 'El CV es requerido' })}
                                        onChange={(e) => handleFilePreview(e, setPreviewCV)}
                                        className="mt-1 block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100"
                                    />
                                    {errors.cv && (
                                        <p className="mt-1 text-sm text-red-600">{errors.cv.message}</p>
                                    )}
                                </div>

                                {/* Foto de Perfil */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Foto de Perfil
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        {...register('foto_perfil', { required: 'La foto es requerida' })}
                                        onChange={(e) => handleFilePreview(e, setPreviewFoto)}
                                        className="mt-1 block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100"
                                    />
                                    {errors.foto_perfil && (
                                        <p className="mt-1 text-sm text-red-600">{errors.foto_perfil.message}</p>
                                    )}
                                    {previewFoto && (
                                        <img src={previewFoto} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded-full" />
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-4 mt-6">
                                <Link
                                    to="/profesores"
                                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                        disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Registrando...' : 'Registrar Profesor'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrarProfesorPage;

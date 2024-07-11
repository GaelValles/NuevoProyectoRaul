import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/auth.context.jsx';
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidepage from '../components/sidebar.jsx';
import Swal from 'sweetalert2';

function RegistrarPermisoPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, setValue } = useForm();
    const { editarPermiso, getPermisoById } = useAuth();
    const [fotoPreview, setFotoPreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchPermiso = async () => {
            const permisoData = await getPermisoById(id);
            if (camionData) {
                setValue('titulo', camionData.titulo);
                setValue('descripcion', camionData.descripcion);
                setValue('fechaFinal', camionData.fechaFinal);
                setValue('avisoAntelacion', camionData.avisoAntelacion);
                setFotoPreview(permisoData.foto ? permisoData.foto.secure_url : null);
            }
            setLoading(false);
        };
        fetchPermiso();
    }, [id, getPermisoById, setValue]);

    const onSubmit = handleSubmit(async (value) => {
        setIsSubmitting(true);
        const formData = new FormData();
        Object.keys(value).forEach(key => {
            if (key === 'foto' && value[key][0]) {
                formData.append(key, value[key][0]);
            } else {
                formData.append(key, value[key]);
            }
        });

        try {
            await editarPermiso(id, formData);
            Swal.fire({
                icon: 'success',
                title: 'Permiso actualizado',
                text: 'El permiso se ha actualizado correctamente.',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            console.error('Error al actualizar el permiso:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al actualizar el permiso.',
            });
        } finally {
            setIsSubmitting(false);
        }
    });

    if (loading) {
        return <div>Cargando...</div>;
    }

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

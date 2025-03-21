import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/auth.context';
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidepage from '../components/sidebar';
import Swal from 'sweetalert2';

function EditarMateriaPage() {
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
            if (permisoData) {
                setValue('titulo', permisoData.titulo);
                setValue('descripcion', permisoData.descripcion);
                setValue('fechaFinal', permisoData.fechaFinal.split('T')[0]);
                setValue('avisoAntelacion', permisoData.avisoAntelacion.split('T')[0]);
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
            formData.append(key, value[key]);
        });

        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput && fileInput.files.length > 0) {
            formData.append('foto', fileInput.files[0]);
        }

        try {
            await editarPermiso(id, formData);
            Swal.fire({
                icon: 'success',
                title: 'Permiso actualizado',
                text: 'El permiso se ha actualizado correctamente.',
                timer: 2000,
                showConfirmButton: false
            });
            navigate("/permisos");
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

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFotoPreview(URL.createObjectURL(file));
        }
    };

    if (loading) {
        return         <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-70 flex justify-center items-center">
        <div className="border-8 border-gray-300 border-t-blue-500 rounded-full w-20 h-20 animate-spin"></div>
    </div>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidepage />
            <div className="flex flex-col flex-1 justify-center items-center p-4 lg:ml-[300px]">
                <div className="w-full max-w-3xl">
                    <div className="bg-white rounded-lg border-4 border-gray-700 p-8 shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl text-gray-800 font-semibold">Editar Permiso</h1>
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
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight
                                    focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="titulo"
                                    {...register('titulo', { required: true })}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
                                    Descripción
                                </label>
                                <textarea
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight
                                    focus:outline-none focus:border-blue-500"
                                    id="descripcion"
                                    {...register('descripcion', { required: true })}
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechaFinal">
                                    Fecha Final
                                </label>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight
                                    focus:outline-none focus:border-blue-500"
                                    type="date"
                                    id="fechaFinal"
                                    {...register('fechaFinal', { required: true })}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avisoAntelacion">
                                    Aviso de Antelación
                                </label>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight
                                    focus:outline-none focus:border-blue-500"
                                    type="date"
                                    id="avisoAntelacion"
                                    {...register('avisoAntelacion', { required: true })}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foto">
                                    Foto
                                </label>
                                <input
                                    className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                    type="file"
                                    id="foto"
                                    accept="image/*"
                                    onChange={handleFotoChange}
                                />
                                {fotoPreview && (
                                    <div className="mt-2">
                                        <img src={fotoPreview} alt="Foto preview" className="h-40 w-40 object-cover rounded" />
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Guardando...' : 'Guardar'}
                                </button>
                                <Link
                                    to="/permisos"
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

export default EditarMateriaPage;

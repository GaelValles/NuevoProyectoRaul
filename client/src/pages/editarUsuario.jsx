import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/auth.context';
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidepage from '../components/sidebar';
import Swal from 'sweetalert2';

function EditarUsuarioPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, setValue } = useForm();
    const { editarUsuario, getUsuarioById, setUser } = useAuth();
    const [fotoPreview, setFotoPreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchUsuario = async () => {
            const usuarioData = await getUsuarioById(id);
            if (usuarioData) {
                setValue('nombreCompleto', usuarioData.nombreCompleto);
                setValue('email', usuarioData.email);
                setValue('telefono', usuarioData.telefono);
                setFotoPreview(usuarioData.perfil ? usuarioData.perfil.secure_url : null);
            }
            setLoading(false);
        };
        fetchUsuario();
    }, [id, getUsuarioById, setValue]);

    const onSubmit = handleSubmit(async (value) => {
        setIsSubmitting(true);
        const formData = new FormData();
        Object.keys(value).forEach(key => {
            formData.append(key, value[key]);
        });

        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput && fileInput.files.length > 0) {
            formData.append('perfil', fileInput.files[0]);
        }

        try {
            const updatedUser = await editarUsuario(id, formData);
            setUser(updatedUser); // Actualiza el usuario en el contexto
            Swal.fire({
                icon: 'success',
                title: 'Usuario actualizado',
                text: 'El usuario se ha actualizado correctamente.',
                timer: 2000,
                showConfirmButton: false
            });
            navigate("/perfil");
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al actualizar el usuario.',
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
        return <div>Cargando...</div>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidepage />
            <div className="flex flex-col flex-1 justify-center items-center p-4 lg:ml-[300px]">
                <div className="w-full max-w-3xl">
                    <div className="bg-white rounded-lg border-4 border-gray-700 p-8 shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl text-gray-800 font-semibold">Editar Usuario</h1>
                            <Link to="/usuarios" className="text-blue-500 hover:text-blue-700 transition duration-300">
                                <i className="bi bi-arrow-left"></i> Volver
                            </Link>
                        </div>
                        <form onSubmit={onSubmit} encType="multipart/form-data" className="space-y-4">
                            <div className="flex flex-col items-center">
                                {fotoPreview && (
                                    <img src={fotoPreview} alt="Foto preview" className="h-40 w-40 object-cover rounded-full mb-4" />
                                )}
                                <label
                                    htmlFor="perfil"
                                    className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
                                >
                                    Cambiar Foto
                                </label>
                                <input
                                    className="hidden"
                                    type="file"
                                    id="perfil"
                                    accept="image/*"
                                    onChange={handleFotoChange}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombreCompleto">
                                    Nombre Completo
                                </label>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight
                                    focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="nombreCompleto"
                                    {...register('nombreCompleto', { required: true })}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight
                                    focus:outline-none focus:border-blue-500"
                                    type="email"
                                    id="email"
                                    {...register('email', { required: true })}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                                    Teléfono
                                </label>
                                <input
                                    className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight
                                    focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="telefono"
                                    {...register('telefono', { required: true })}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-gray-700 hover:bg-gray-900 w-full text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Guardando...' : 'Guardar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditarUsuarioPage;

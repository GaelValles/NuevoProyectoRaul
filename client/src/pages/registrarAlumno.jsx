import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context';
import Sidepage from '../components/sidebar';
import Swal from 'sweetalert2';

function RegistrarAlumnoPage() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { registrarAlumno } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = handleSubmit(async (values) => {
        setIsLoading(true);
        const formData = new FormData();
        Object.keys(values).forEach(key => {
            if (values[key] instanceof FileList) {
                formData.append(key, values[key][0]);
            } else {
                formData.append(key, values[key]);
            }
        });
        try {
            await registrarAlumno(formData);
            Swal.fire({
                title: 'Alumno registrado',
                text: 'El alumno se ha registrado correctamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            reset();
            
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al registrar el alumno. Inténtalo de nuevo.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    });

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidepage />
            <div className="flex flex-col flex-1 justify-center items-center p-4 lg:ml-[300px]">
                <div className="w-full max-w-4xl">
                    <div className="bg-white rounded-lg border-4 border-gray-700 p-8 shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl text-gray-800 font-semibold">Registrar Alumno</h1>
                            <Link to="/alumnos" className="text-blue-500 hover:text-blue-700 transition duration-300">
                                <i className="bi bi-arrow-left"></i> Volver
                            </Link>
                        </div>
                        <form onSubmit={onSubmit} encType="multipart/form-data" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombreCompleto">
                                        Nombre completo
                                    </label>
                                    <input
                                        className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                        type="text"
                                        id="nombreCompleto"
                                        {...register('nombreCompleto', { required: true })}
                                    />
                                    {errors.nombreCompleto && <p className="text-red-500">El nombre completo es requerido</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="matricula">
                                        Matrícula
                                    </label>
                                    <input
                                        className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                        type="text"
                                        id="matricula"
                                        {...register('matricula', { required: true })}
                                    />
                                    {errors.matricula && <p className="text-red-500">La matrícula es requerida</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="carrera">
                                        Carrera
                                    </label>
                                    <input
                                        className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                        type="text"
                                        id="carrera"
                                        {...register('carrera', { required: true })}
                                    />
                                    {errors.carrera && <p className="text-red-500">La carrera es requerida</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grado">
                                        Grado
                                    </label>
                                    <input
                                        className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                        type="text"
                                        id="grado"
                                        {...register('grado', { required: true })}
                                    />
                                    {errors.grado && <p className="text-red-500">El grado es requerido</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grupo">
                                        Grupo
                                    </label>
                                    <input
                                        className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                        type="text"
                                        id="grupo"
                                        {...register('grupo', { required: true })}
                                    />
                                    {errors.grupo && <p className="text-red-500">El grupo es requerido</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="correo">
                                        Correo
                                    </label>
                                    <input
                                        className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                        type="email"
                                        id="correo"
                                        {...register('correo', { required: true })}
                                    />
                                    {errors.correo && <p className="text-red-500">El correo es requerido</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                                        Teléfono
                                    </label>
                                    <input
                                        className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                        type="tel"
                                        id="telefono"
                                        {...register('telefono', { required: true })}
                                    />
                                    {errors.telefono && <p className="text-red-500">El teléfono es requerido</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                        Contraseña
                                    </label>
                                    <input
                                        className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                        type="password"
                                        id="password"
                                        {...register('password', { required: true })}
                                    />
                                    {errors.password && <p className="text-red-500">La contraseña es requerida</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="perfil">
                                        Foto de perfil
                                    </label>
                                    <input
                                        className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="file"
                                        id="perfil"
                                        {...register('perfil')}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center mt-6">
                                <button
                                    type="submit"
                                    className={`bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Registrando...' : 'Registrar Alumno'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrarAlumnoPage;


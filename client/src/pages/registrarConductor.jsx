import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context';
import Sidepage from '../components/sidebar';
import Swal from 'sweetalert2';

function RegistrarConductorPage() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { registrarConductor } = useAuth();
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
            await registrarConductor(formData);
            Swal.fire({
                title: 'Conductor registrado',
                text: 'El conductor se ha registrado correctamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            reset(); // Resetear el formulario después de enviar
            navigate('/conductores'); // Navegar a la lista de conductores
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al registrar el conductor. Inténtalo de nuevo.',
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
                            <h1 className="text-2xl text-gray-800 font-semibold">Registrar Conductor</h1>
                            <Link to="/conductores" className="text-blue-500 hover:text-blue-700 transition duration-300">
                                <i className="bi bi-arrow-left"></i> Volver
                            </Link>
                        </div>
                        <form onSubmit={onSubmit} encType="multipart/form-data" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                        Nombre completo
                                    </label>
                                    <input
                                        className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                        type="text"
                                        id="nombre"
                                        placeholder="Nombre completo"
                                        {...register('nombre', { required: true })}
                                    />
                                    {errors.nombre && <p className="text-red-500">Nombre es requerido</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechaNacimiento">
                                        Fecha de nacimiento
                                    </label>
                                    <input
                                        className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                        type="date"
                                        id="fechaNacimiento"
                                        {...register('fechaNacimiento', { required: true })}
                                    />
                                    {errors.fechaNacimiento && <p className="text-red-500">La fecha de nacimiento es requerida</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numLicencia">
                                        No. Licencia
                                    </label>
                                    <input
                                        className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                        type="text"
                                        id="numLicencia"
                                        placeholder="No. Licencia"
                                        {...register('numLicencia', { required: true, minLength: 10 })}
                                    />
                                    {errors.numLicencia && <p className="text-red-500">El número de la licencia es requerido</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numVisa">
                                        No. Visa
                                    </label>
                                    <input
                                        className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                        type="text"
                                        id="numVisa"
                                        placeholder="No. Visa"
                                        {...register('numVisa', { required: true, minLength: 12 })}
                                    />
                                    {errors.numVisa && <p className="text-red-500">El número de la visa es requerido</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numGafete">
                                        No. Gafete
                                    </label>
                                    <input
                                        className="border-b-2 border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                        type="text"
                                        id="numGafete"
                                        placeholder="No. Gafete"
                                        {...register('numGafete', { required: true, minLength: 9 })}
                                    />
                                    {errors.numGafete && <p className="text-red-500">El número del gafete es requerido</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex flex-col items-center">
                                    <label className="text-gray-700 text-sm font-bold mb-2">Solicitud de empleo</label>
                                    <input
                                        className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="file"
                                        name="solicitud"
                                        {...register('solicitud', { required: true })}
                                    />
                                    {errors.solicitud && <p className="text-red-500">La solicitud de empleo es requerida</p>}
                                </div>
                                <div className="flex flex-col items-center">
                                    <label className="text-gray-700 text-sm font-bold mb-2">INE</label>
                                    <input
                                        className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="file"
                                        name="ine"
                                        {...register('ine', { required: true })}
                                    />
                                    {errors.ine && <p className="text-red-500">El INE es requerido</p>}
                                </div>
                                <div className="flex flex-col items-center">
                                    <label className="text-gray-700 text-sm font-bold mb-2">Visa</label>
                                    <input
                                        className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="file"
                                        name="visa"
                                        {...register('visa', { required: true })}
                                    />
                                    {errors.visa && <p className="text-red-500">La visa es requerida</p>}
                                </div>
                                <div className="flex flex-col items-center">
                                    <label className="text-gray-700 text-sm font-bold mb-2">Fast Express</label>
                                    <input
                                        className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="file"
                                        name="fast"
                                        {...register('fast', { required: true })}
                                    />
                                    {errors.fast && <p className="text-red-500">El fast express es requerido</p>}
                                </div>
                                <div className="flex flex-col items-center">
                                    <label className="text-gray-700 text-sm font-bold mb-2">AntiDoping</label>
                                    <input
                                        className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="file"
                                        name="antidoping"
                                        {...register('antidoping', { required: true })}
                                    />
                                    {errors.antidoping && <p className="text-red-500">El antidoping es requerido</p>}
                                </div>
                                <div className="flex flex-col items-center">
                                    <label className="text-gray-700 text-sm font-bold mb-2">Antecedentes Penales</label>
                                    <input
                                        className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none                                         focus:bg-white focus:border-gray-500"
                                        type="file"
                                        name="antecedentes"
                                        {...register('antecedentes', { required: true })}
                                    />
                                    {errors.antecedentes && <p className="text-red-500">Los antecedentes penales son requeridos</p>}
                                </div>
                                <div className="flex flex-col items-center">
                                    <label className="text-gray-700 text-sm font-bold mb-2">Domicilio</label>
                                    <input
                                        className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="file"
                                        name="domicilio"
                                        {...register('domicilio', { required: true })}
                                    />
                                    {errors.domicilio && <p className="text-red-500">El documento de domicilio es requerido</p>}
                                </div>
                                <div className="flex flex-col items-center">
                                    <label className="text-gray-700 text-sm font-bold mb-2">Prueba Psicofísica</label>
                                    <input
                                        className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="file"
                                        name="psicofisico"
                                        {...register('psicofisico', { required: true })}
                                    />
                                    {errors.psicofisico && <p className="text-red-500">La prueba psicofísica es requerida</p>}
                                </div>
                                <div className="flex flex-col items-center">
                                    <label className="text-gray-700 text-sm font-bold mb-2">Escuela</label>
                                    <input
                                        className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="file"
                                        name="escuela"
                                        {...register('escuela', { required: true })}
                                    />
                                    {errors.escuela && <p className="text-red-500">La escuela es requerida</p>}
                                </div>
                            </div>
                            <div className="flex justify-center mt-6">
                                <button
                                    type="submit"
                                    className={`bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Registrando...' : 'Registrar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrarConductorPage;


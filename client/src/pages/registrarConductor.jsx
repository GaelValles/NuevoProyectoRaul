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
        <div className="flex justify-center items-center h-screen">
            <Sidepage />
            <div className="w-full max-w-4xl">
                <div className="bg-white rounded-lg border-4 border-gray-700 p-8 shadow-lg hover:shadow-2xl hover:shadow-gray-500 transition duration-300 ease-in-out">
                    <h1 className="text-2xl text-center text-gray-800 font-semibold mt-4">Registrar Conductor</h1>
                    <Link to="/conductores" className="text-blue-500 hover:text-blue-700 transition duration-300">
                                <i className="bi bi-arrow-left"></i> Volver
                            </Link>
                    <form onSubmit={onSubmit} encType="multipart/form-data" className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <div className="mb-4">
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="nombre"
                                    id="nombre"
                                    type="text"
                                    placeholder="Nombre completo"
                                    {...register('nombre', { required: true })}
                                />
                                {errors.nombre && <p className="text-red-500">Nombre es requerido</p>}
                            </div>
                            <div className="mb-4">
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="fechaNacimiento"
                                    id="fechaNacimiento"
                                    type="date"
                                    placeholder="Fecha de nacimiento"
                                    {...register('fechaNacimiento', { required: true })}
                                />
                                {errors.fechaNacimiento && <p className="text-red-500">La fecha de nacimiento es requerida</p>}
                            </div>
                            <div className="mb-4">
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="numLicencia"
                                    id="numLicencia"
                                    type="text"
                                    placeholder="No. Licencia"
                                    {...register('numLicencia', { required: true, minLength: 10 })}
                                />
                                {errors.numLicencia && <p className="text-red-500">El número de la licencia es requerido</p>}
                            </div>
                            <div className="mb-4">
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="numVisa"
                                    id="numVisa"
                                    type="text"
                                    placeholder="No. Visa"
                                    {...register('numVisa', { required: true, minLength: 12 })}
                                />
                                {errors.numVisa && <p className="text-red-500">El número de la visa es requerido</p>}
                            </div>
                            <div className="mb-4">
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="numGafete"
                                    id="numGafete"
                                    type="text"
                                    placeholder="No. Gafete"
                                    {...register('numGafete', { required: true, minLength: 9 })}
                                />
                                {errors.numGafete && <p className="text-red-500">El número del gafete es requerido</p>}
                            </div>
                        </div>
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="solicitud">
                                    Solicitud de empleo
                                </label>
                                <input
                                    className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="solicitud"
                                    id="solicitud"
                                    type="file"
                                    {...register('solicitud', { required: true })}
                                />
                                {errors.solicitud && <p className="text-red-500">La solicitud de empleo es requerida</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ine">
                                    INE
                                </label>
                                <input
                                    className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="ine"
                                    id="ine"
                                    type="file"
                                    {...register('ine', { required: true })}
                                />
                                {errors.ine && <p className="text-red-500">El INE es requerido</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="visa">
                                    Visa
                                </label>
                                <input
                                    className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="visa"
                                    id="visa"
                                    type="file"
                                    {...register('visa', { required: true })}
                                />
                                {errors.visa && <p className="text-red-500">La visa es requerida</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fast">
                                    Fast Express
                                </label>
                                <input
                                    className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="fast"
                                    id="fast"
                                    type="file"
                                    {...register('fast', { required: true })}
                                />
                                {errors.fast && <p className="text-red-500">El fast express es requerido</p>}
                            </div>
                        </div>
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="antidoping">
                                    AntiDoping
                                </label>
                                <input
                                    className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="antidoping"
                                    id="antidoping"
                                    type="file"
                                    {...register('antidoping', { required: true })}
                                />
                                {errors.antidoping && <p className="text-red-500">El antidoping es requerido</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="antecedentes">
                                    Antecedentes Penales
                                </label>
                                <input
                                    className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="antecedentes"
                                    id="antecedentes"
                                    type="file"
                                    {...register('antecedentes', { required: true })}
                                />
                                {errors.antecedentes && <p className="text-red-500">Los antecedentes penales son requeridos</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="domicilio">
                                        Domicilio
                                    </label>
                                <input
                                    className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="domicilio"
                                    id="domicilio"
                                    type="file"
                                    {...register('domicilio', { required: true })}
                                />
                                    {errors.domicilio && <p className="text-red-500">El documento de domicilio es requerido</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="psicofisico">
                                        Prueba Psicofísica
                                    </label>
                                    <input
                                        className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        name="psicofisico"
                                        id="psicofisico"
                                        type="file"
                                        {...register('psicofisico', { required: true })}
                                    />
                                    {errors.psicofisico && <p className="text-red-500">La prueba psicofísica es requerida</p>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aduana">
                                            Licencia de Aduana
                                        </label>
                                        <input
                                                                        className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                                        name="aduana"
                                                                        id="aduana"
                                                                        type="file"
                                                                        {...register('aduana', { required: true })}
                                                                    />
                                                                    {errors.aduana && <p className="text-red-500">La licencia de aduana es requerida</p>}
                                                                </div>
                                                            </div>
                                                            <div className="col-span-1 md:col-span-3 text-center mt-6">
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
                                        );
                                    }
                                    
                                    export default RegistrarConductorPage;
                                    

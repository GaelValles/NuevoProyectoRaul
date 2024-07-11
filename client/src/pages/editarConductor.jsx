import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/auth.context';
import Swal from 'sweetalert2';
import SidePage from "../components/sidebar";

function EditarConductorPage() {
    const { id } = useParams();
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    const { getConductorById, editarConductor } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConductor = async () => {
            const conductorData = await getConductorById(id);
            if (conductorData) {
                setValue('nombre', conductorData.nombre);
                setValue('fechaNacimiento', conductorData.fechaNacimiento);
                setValue('numLicencia', conductorData.numLicencia);
                setValue('numVisa', conductorData.numVisa);
                setValue('numGafete', conductorData.numGafete);
                setValue('solicitudOldUrl', conductorData.solicitud.secure_url);
                setValue('ineOldUrl', conductorData.ine.secure_url);
                setValue('visaOldUrl', conductorData.visa.secure_url);
                setValue('fastOldUrl', conductorData.fast.secure_url);
                setValue('antidopingOldUrl', conductorData.antidoping.secure_url);
                setValue('antecedentesOldUrl', conductorData.antecedentes.secure_url);
                setValue('domicilioOldUrl', conductorData.domicilio.secure_url);
                setValue('psicofisicoOldUrl', conductorData.psicofisico.secure_url);
                setValue('aduanaOldUrl', conductorData.aduana.secure_url);
            }
            setLoading(false);
        };
        fetchConductor();
    }, [id, getConductorById, setValue]);

    const onSubmit = handleSubmit(async (data) => {
        const formData = new FormData();
        formData.append('nombre', data.nombre || '');
        formData.append('fechaNacimiento', data.fechaNacimiento || '');
        formData.append('numLicencia', data.numLicencia || '');
        formData.append('numVisa', data.numVisa || '');
        formData.append('numGafete', data.numGafete || '');
    
        // Función para manejar la actualización de archivos
        const handleFileUpdate = (key, oldUrl, newFile) => {
            if (newFile && newFile.length > 0) {
                if (oldUrl) {
                    formData.append(`${key}OldUrl`, oldUrl); // Enviar URL antigua al backend para eliminación
                }
                formData.append(key, newFile[0]); // Añadir nuevo archivo a FormData
            } else if (oldUrl) {
                formData.append(`${key}OldUrl`, oldUrl); // Enviar URL antigua al backend para mantener el archivo
            }
        };
    
        handleFileUpdate('solicitud', data.solicitudOldUrl, data.solicitud);
        handleFileUpdate('ine', data.ineOldUrl, data.ine);
        handleFileUpdate('visa', data.visaOldUrl, data.visa);
        handleFileUpdate('fast', data.fastOldUrl, data.fast);
        handleFileUpdate('antidoping', data.antidopingOldUrl, data.antidoping);
        handleFileUpdate('antecedentes', data.antecedentesOldUrl, data.antecedentes);
        handleFileUpdate('domicilio', data.domicilioOldUrl, data.domicilio);
        handleFileUpdate('psicofisico', data.psicofisicoOldUrl, data.psicofisico);
        handleFileUpdate('aduana', data.aduanaOldUrl, data.aduana);
    
        try {
            await editarConductor(id, formData); // Aquí deberías enviar `formData`
            Swal.fire({
                title: 'Conductor actualizado',
                text: 'El conductor se ha actualizado correctamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            navigate("/conductores");
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al actualizar el conductor. Inténtalo de nuevo.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <SidePage />
            <div className="w-full max-w-3xl">
                <div className="bg-white rounded-lg border-4 border-gray-700 p-8 shadow-lg hover:shadow-2xl hover:shadow-gray-500 transition duration-300 ease-in-out">
                    <h1 className="text-2xl text-center text-gray-800 font-semibold mt-4">Actualizar Conductor</h1>
                    <Link to="/conductores" className="bi bi-arrow-left flex items-center bg-blue-500 text-white h-10 mt-3 py-2 px-4 rounded-full hover:bg-blue-600 mr-2"></Link>
                    <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                    {...register('solicitud')}
                                    />
                                    {errors.solicitud && <p className="text-red-500">La solicitud es requerida</p>}
                                    {watch('solicitudOldUrl') && <a href={watch('solicitudOldUrl')} target="_blank" rel="noopener noreferrer">Ver archivo actual</a>}
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
                                        {...register('ine')}
                                    />
                                    {errors.ine && <p className="text-red-500">El INE es requerido</p>}
                                    {watch('ineOldUrl') && <a href={watch('ineOldUrl')} target="_blank" rel="noopener noreferrer">Ver archivo actual</a>}
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
                                        {...register('visa')}
                                    />
                                    {errors.visa && <p className="text-red-500">La visa es requerida</p>}
                                    {watch('visaOldUrl') && <a href={watch('visaOldUrl')} target="_blank" rel="noopener noreferrer">Ver archivo actual</a>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fast">
                                        FAST
                                    </label>
                                    <input
                                        className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        name="fast"
                                        id="fast"
                                        type="file"
                                        {...register('fast')}
                                    />
                                    {errors.fast && <p className="text-red-500">El FAST es requerido</p>}
                                    {watch('fastOldUrl') && <a href={watch('fastOldUrl')} target="_blank" rel="noopener noreferrer">Ver archivo actual</a>}
                                </div>
                            </div>
                            <div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="antidoping">
                                        Antidoping
                                    </label>
                                    <input
                                        className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        name="antidoping"
                                        id="antidoping"
                                        type="file"
                                        {...register('antidoping')}
                                    />
                                    {errors.antidoping && <p className="text-red-500">El antidoping es requerido</p>}
                                    {watch('antidopingOldUrl') && <a href={watch('antidopingOldUrl')} target="_blank" rel="noopener noreferrer">Ver archivo actual</a>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="antecedentes">
                                        Antecedentes
                                    </label>
                                    <input
                                        className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        name="antecedentes"
                                        id="antecedentes"
                                        type="file"
                                        {...register('antecedentes')}
                                    />
                                    {errors.antecedentes && <p className="text-red-500">Los antecedentes son requeridos</p>}
                                    {watch('antecedentesOldUrl') && <a href={watch('antecedentesOldUrl')} target="_blank" rel="noopener noreferrer">Ver archivo actual</a>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="domicilio">
                                        Comprobante de domicilio
                                    </label>
                                    <input
                                        className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        name="domicilio"
                                        id="domicilio"
                                        type="file"
                                        {...register('domicilio')}
                                    />
                                    {errors.domicilio && <p className="text-red-500">El comprobante de domicilio es requerido</p>}
                                    {watch('domicilioOldUrl') && <a href={watch('domicilioOldUrl')} target="_blank" rel="noopener noreferrer">Ver archivo actual</a>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="psicofisico">
                                        Examen psicofísico
                                    </label>
                                    <input
                                        className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        name="psicofisico"
                                        id="psicofisico"
                                        type="file"
                                        {...register('psicofisico')}
                                    />
                                    {errors.psicofisico && <p className="text-red-500">El examen psicofísico es requerido</p>}
                                    {watch('psicofisicoOldUrl') && <a href={watch('psicofisicoOldUrl')} target="_blank" rel="noopener noreferrer">Ver archivo actual</a>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aduana">
                                        Aduana
                                    </label>
                                    <input
                                        className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        name="aduana"
                                        id="aduana"
                                        type="file"
                                        {...register('aduana')}
                                    />
                                    {errors.aduana && <p className="text-red-500">La aduana es requerida</p>}
                                    {watch('aduanaOldUrl') && <a href={watch('aduanaOldUrl')} target="_blank" rel="noopener noreferrer">Ver archivo actual</a>}
                                </div>
                            </div>
                            <div className="col-span-1 md:col-span-3">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Actualizar Conductor
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    
    export default EditarConductorPage;
    

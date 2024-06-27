import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context';
import { registerConductor } from '../api/auth.conductor';

 
function RegistrarConductorPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registrarConductor, isAuth } = useAuth();
    const navigate = useNavigate();
   
    useEffect(() => {
        if (isAuth) navigate("/inicio");
    }, [isAuth, navigate]);

    const onSubmit = handleSubmit(async (values) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => formData.append(key, values[key][0] || values[key]));
        try {
            await registrarConductor(formData);
            navigate('/inicio');
        } catch (error) {
            console.error(error);
        }
});

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-4xl">
                <div className="bg-white rounded-lg border-4 border-gray-700 p-8 shadow-lg hover:shadow-2xl hover:shadow-gray-500 transition duration-300 ease-in-out">
                    <h1 className="text-2xl text-center text-gray-800 font-semibold mt-4">Registrar Conductor</h1>
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
                                {errors.nombre && <p className="text-red-500">nombre es requerido</p>}
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
                                    {...register('numLicencia', { required: true, min: 10 })}
                                />
                                {errors.numLicencia && <p className="text-red-500">El numero de la licencia es requerida</p>}
                            </div>
                            <div className="mb-4">
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="numVisa"
                                    id="numVisa"
                                    type="text"
                                    placeholder="No. Visa"
                                    {...register('numVisa', { required: true, min: 12  })}
                                />
                                {errors.numVisa && <p className="text-red-500">El numero de la visa es requerida</p>}
                            </div>
                            <div className="mb-4">
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="numGafete"
                                    id="numGafete"
                                    type="text"
                                    placeholder="No. Gafete"
                                    {...register('numGafete', { required: true, min: 9 })}
                                />
                                {errors.numGafete && <p className="text-red-500">El numero del gafete es requerida</p>}
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
                                {errors.antecedentes && <p className="text-red-500">los antecedentes penales son requeridos</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="domicilio">
                                    Comprobante de Domicilio
                                </label>
                                <input
                                    className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="domicilio"
                                    id="domicilio"
                                    type="file"
                                    {...register('domicilio', { required: true })}
                                />
                                {errors.domicilio && <p className="text-red-500">El domicilio es requerido</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="psicofisico">
                                    Prueba PsicoFisica
                                </label>
                                <input
                                    className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="psicofisico"
                                    id="psicofisico"
                                    type="file"
                                    {...register('psicofisico', { required: true })}
                                />
                                {errors.psicofisico && <p className="text-red-500">La prueba psicofisica es requerida</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aduana">
                                    Licencia de Aduanas
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
                        <div className="col-span-full">
                            <button
                                type="submit"
                                id="botonIngresar"
                                className="rounded-full bg-gray-700 hover:bg-gray-900 text-white font-semibold py-2 px-4 w-full mt-4 transition duration-300 ease-in-out"
                            >
                                Registrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegistrarConductorPage;



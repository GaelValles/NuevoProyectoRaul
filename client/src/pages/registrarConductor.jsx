import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registerConductor } from '../api/auth.conductor';
 
function RegistrarConductorPage() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (value) => {
        console.log(value);
        const res = await registerConductor(value)
        console.log(res)
    });

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-4xl">
                <div className="bg-white rounded-lg border-4 border-gray-700 p-8 shadow-lg hover:shadow-2xl hover:shadow-gray-500 transition duration-300 ease-in-out">
                    <h1 className="text-2xl text-center text-gray-800 font-semibold mt-4">Registrar Conductor</h1>
                    <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <div className="mb-4">
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="nombre"
                                    type="text"
                                    placeholder="Nombre completo"
                                    {...register('nombre', { required: true })}
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="fechaNacimiento"
                                    type="date"
                                    placeholder="Fecha de nacimiento"
                                    {...register('fechaNacimiento', { required: true })}
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="numLicencia"
                                    type="text"
                                    placeholder="No. Licencia"
                                    {...register('numLicencia', { required: true, min: 10 })}
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="numVisa"
                                    type="text"
                                    placeholder="No. Visa"
                                    {...register('numvisa', { required: true, min: 12  })}
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="numGafete"
                                    type="text"
                                    placeholder="No. Gafete"
                                    {...register('numGafete', { required: true, min: 9 })}
                                />
                            </div>
                            
                        </div>
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="solicitud">
                                    Solicitud de empleo
                                </label>
                                <input
                                    className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="solicitud"
                                    type="file"
                                    {...register('solicitud', { required: true })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ine">
                                    INE
                                </label>
                                <input
                                    className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="ine"
                                    type="file"
                                    {...register('ine', { required: true })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="visa">
                                    Visa
                                </label>
                                <input
                                    className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="visa"
                                    type="file"
                                    {...register('visa', { required: true })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fast">
                                    Fast Express
                                </label>
                                <input
                                    className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="fast"
                                    type="file"
                                    {...register('fast', { required: true })}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="antidoping">
                                    AntiDoping
                                </label>
                                <input
                                    className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="antidoping"
                                    type="file"
                                    {...register('antidoping', { required: true })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="antecedentes">
                                    Antecedentes Penales
                                </label>
                                <input
                                    className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="antecedentes"
                                    type="file"
                                    {...register('antecedentes', { required: true })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="domicilio">
                                    Comprobante de Domicilio
                                </label>
                                <input
                                    className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="domicilio"
                                    type="file"
                                    {...register('domicilio', { required: true })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="psicofisico">
                                    Prueba PsicoFisica
                                </label>
                                <input
                                    className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="psicofisico"
                                    type="file"
                                    {...register('psicofisico', { required: true })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aduana">
                                    Licencia de Aduanas
                                </label>
                                <input
                                    className="border border-gray-700 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="aduana"
                                    type="file"
                                    {...register('aduana', { required: true })}
                                />
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

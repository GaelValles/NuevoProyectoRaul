import React from 'react';

function DocsPage() {
    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl
             hover:shadow-gray-400 hover:shadow-lg ">
                <h2 className="text-2xl font-semibold mb-4">Registro de Documentos</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="documentName" className="block text-sm font-medium text-gray-700">Nombre del Documento</label>
                        <input 
                            type="text" 
                            id="documentName" 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="documentType" className="block text-sm font-medium text-gray-700">Tipo de Documento</label>
                        <select 
                            id="documentType" 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option>Seleccionar tipo</option>
                            <option>Identificación</option>
                            <option>Comprobante de Domicilio</option>
                            <option>Certificado de Estudios</option>
                            <option>Otros</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="documentFile" className="block text-sm font-medium text-gray-700">Subir Documento</label>
                        <input 
                            type="file" 
                            id="documentFile" 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className=" rounded-full w-full bg-slate-700 text-white py-2 px-4 shadow-sm hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Registrar Documento
                    </button>
                </form>
            </div>
        </div>
    );
}

export default DocsPage;

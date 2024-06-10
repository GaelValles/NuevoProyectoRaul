import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import fondoImg from '../assets/images/camionLogin.jpg'; // Importa la imagen directamente

function LoginPage() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    const checkFormCompletion = () => {
        const correo = document.getElementById("correo").value;
        const password = document.getElementById("password").value;
        setFormCompleted(correo !== "" && password !== "");
    };

    return (
        <div className="flex h-screen">
            <div className="w-2/5 h-full">
                <img src={fondoImg} className="object-cover h-full w-full" alt="Fondo" />
            </div>
            <div className="w-3/5 flex justify-center items-center">
                <div className="bg-white rounded-xl border-2 border-gray-300 p-6 shadow-lg hover:shadow-2xl hover:shadow-gray-700 transition duration-200 ease-in-out max-w-md h-80 w-96">
                    <h1 className="text-2xl text-center text-gray-800 font-semibold mt-4">Iniciar sesión</h1>
                    <form onSubmit={onSubmit} onChange={checkFormCompletion} className="mt-4">
                        <div className="mb-4">
                            <input
                                className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="correo"
                                type="email"
                                placeholder="Correo electrónico"
                                {...register('correo', { required: true })}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="password"
                                type="password"
                                placeholder="Contraseña"
                                {...register('password', { required: true })}
                            />
                        </div>
                        <button
                            type="submit"
                            id="botonIngresar"
                            className="rounded-full bg-gray-700 hover:bg-gray-900 text-white font-semibold py-2 px-4 w-full mt-4 transition duration-300 ease-in-out"
                        >
                            Ingresar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;

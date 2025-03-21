import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginProfesorRequest } from '../api/auth.profesor';
import ReCAPTCHA from 'react-google-recaptcha';

function LoginPage() {
    const { loginProfesor, errors: loginErrors } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [recaptchaToken, setRecaptchaToken] = useState(null);

    // Manejar el evento de reCAPTCHA
    const onRecaptchaChange = (token) => {
        setRecaptchaToken(token); // Guarda el token generado por reCAPTCHA
    };

    const onSubmit = handleSubmit(async (profesor) => {
        if (!recaptchaToken) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, verifica el reCAPTCHA antes de continuar.',
            });
            return;
        }

        const success = await loginProfesor(profesor);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: '¡Bienvenido!',
                text: 'Has iniciado sesión correctamente',
                customClass: {
                    container: 'font-sans'
                }
            });
            navigate("/inicioProfesor");
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error de acceso',
                text: 'Credenciales incorrectas. Por favor, intente nuevamente.',
                customClass: {
                    container: 'font-sans'
                }
            });
        }
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="w-full max-w-md p-10 bg-white rounded-3xl shadow-2xl space-y-8 transform hover:scale-[1.01] transition-all duration-300">
                <div className="text-center space-y-6">
                    <div className="flex justify-center">
                        <div className="inline-block p-4 rounded-2xl bg-blue-50 border border-blue-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900">Portal Académico</h2>
                        <p className="mt-3 text-gray-600">Bienvenido al sistema institucional</p>
                    </div>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                    {loginErrors.map((error, i) => (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 rounded-r" key={i}>
                            <p className="text-sm">{error}</p>
                        </div>
                    ))}

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="email">
                            Correo Institucional
                        </label>
                        <input
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
                            id="correo"
                            type="email"
                            placeholder="juan@gmail.com"
                            {...register('correo', { required: true })}
                        />
                        {errors.correo && 
                            <p className='text-red-500 text-sm mt-1'>Correo institucional requerido</p>
                        }
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            {...register('password', { required: true })}
                        />
                        {errors.password && 
                            <p className='text-red-500 text-sm mt-1'>Contraseña requerida</p>
                        }
                    </div>

                    {/* reCAPTCHA */}
                    <ReCAPTCHA
                        sitekey="6LexYfsqAAAAAIKr5x5jyO_YFavteE_DaGU-4O95"
                        onChange={onRecaptchaChange}
                    />

                    <button
                        type="submit"
                        className="w-full px-6 py-3 text-white bg-blue-600 rounded-xl font-medium 
                        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                        focus:ring-offset-2 transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Iniciar Sesión
                    </button>

                    <div className="text-center pt-2">
                        <a href="#" 
                           className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;

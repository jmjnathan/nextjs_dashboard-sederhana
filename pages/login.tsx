import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface User {
    username: string;
    password: string; 
}
const Login: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const login = async ({ username, password }: { username: string; password: string }) => {
        try {
        const response = await axios.post <User>('https://fakestoreapi.com/auth/login', { username, password });
        const user = response.data;

        if (user) {
            localStorage.setItem('token', 'yourAuthTokenHere');
            return user;
        } else {
            throw new Error('Invalid username or password');
        }
        } catch (error) {
        throw new Error('Error during login');
        }
    };

    const { mutate } = useMutation<User, Error, { username: string; password: string }>(login, {
        onSuccess: () => {
        alert('Login successful! Redirecting to dashboard...');
        setUsername('');
        setPassword('');
        setTimeout(() => {
            router.push('/dashboard');
        });
        },
        onError: (error) => {
        alert(`Login failed: ${error.message}`);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        mutate({ username, password });
    }

    return (
        <div className="flex justify-center font-montserrat h-screen items-center bg-[#e8e8e8]">
            <div className="bg-[#fffffa] rounded-3xl shadow-xl p-2 object-center w-[500px] items-center">
                <h1 className="text-center text-3xl font-bold font-poppins mt-6">Dummy Shop</h1>
                <p className="text-center text-[14px] italic">"Melayani Anda Dengan Setengah Hati"</p>
                <div className="p-10">
                    <div>
                        <label className="block text-gray-800 text-sm">Username</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="inputUsername"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="font-medium block opacity-50 w-full rounded-md py-1.5 px-2 border-[1px] border-blue-500 focus:text-black"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-800 text-sm mt-2">Password</label>
                        <div className="mt-2 relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="inputPassword"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="font-medium block opacity-50 w-full rounded-md py-1.5 px-2 border-[1px] border-blue-500 focus:text-black"
                                required
                            />
                            {showPassword ? (
                                <FaEyeSlash
                                    className="top-3 right-3 absolute transform transition-transform duration-200 ease-in-out hover:scale-110"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label="Hide Password"
                                />
                            ) : (
                                <FaEye
                                    className="top-3 right-3 absolute transform transition-transform duration-200 ease-in-out hover:scale-110"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label="Show Password"
                                />
                            )}
                        </div>
                    </div>

                    <button
                        className="mt-5 w-full cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
                                    border-blue-600
                                    border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                                    active:border-b-[2px] active:brightness-90 active:translate-y-[2px] font-semibold shadow-lg uppercase"
                        onClick={handleSubmit}
                    >
                        Login
                    </button>

                    <p className="text-center mt-5 text-[12px]">
                        Doesn't have any account?{' '}
                        <a href="/auth/register" className="text-blue-500 hover:text-blue-700">
                            Register now!
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
    
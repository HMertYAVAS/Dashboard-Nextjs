'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Login Here
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // JSON response and parse it
                const data = await response.json();

                const token = data.data.token;

                // token check
                if (token) {
                    localStorage.setItem('token', token);
                    router.push('/dashboard');
                } else {
                    console.error('Token not found in response data');
                }
            } else {
                console.error('Authentication failed');
            }
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">

            <div className='grid-cols-2'>

                <h1 className=' text-2xl mb-10 font-bold text-center'>Login Page</h1>
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="text-cyan-800 w-full p-2 mb-2 border rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-cyan-800 w-full p-2 mb-2 border rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full p-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>

    );
}

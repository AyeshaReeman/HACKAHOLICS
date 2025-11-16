
import React, { useState } from 'react';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<void>;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setIsLoading(false);
      return;
    }

    try {
      await onLogin(email, password);
      // Success will be handled by the parent component (App.tsx) which will unmount this component.
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-brand-background to-blue-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
                <ShieldCheckIcon className="w-16 h-16 text-brand-blue-dark" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">SAFE SHIFT AI</h1>
            <p className="mt-2 text-md text-gray-600">Smart Nurse Handoff & Fatigue Detection</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
            <h2 className="text-center text-2xl font-semibold text-gray-800">Login to Dashboard</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-light focus:border-brand-blue-light sm:text-sm"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-light focus:border-brand-blue-light sm:text-sm"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                </div>

                {error && <p className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-md">{error}</p>}

                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-blue-dark hover:bg-brand-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-light transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-wait"
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </div>
            </form>
        </div>

        <div className="mt-6 bg-blue-50/50 p-4 rounded-lg border border-blue-200 text-sm">
            <h4 className="font-semibold text-gray-700 mb-2 text-center">Demo Credentials</h4>
            <ul className="text-gray-600 space-y-1 text-center">
                <li><span className="font-medium">Nurse:</span> nurse1@hospital.com / <span className="font-mono">nurse123</span></li>
                <li><span className="font-medium">Doctor:</span> doctor1@hospital.com / <span className="font-mono">doctor123</span></li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
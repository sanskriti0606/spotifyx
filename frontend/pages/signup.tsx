import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SignupPage: React.FC = () => {
  const router = useRouter();

  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientName(e.target.value);
    setError(null);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(null);
  };

  const handleCPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCPassword(e.target.value);
    setError(null);
  };

  const emailValidation = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!clientName) {
      setError("Enter your name");
      setLoading(false);
      return;
    }
    if (!email) {
      setError("Enter your email");
      setLoading(false);
      return;
    } else if (!emailValidation(email)) {
      setError("Enter a valid email");
      setLoading(false);
      return;
    }
    if (!password) {
      setError("Enter your password");
      setLoading(false);
      return;
    } else if (password.length < 6) {
      setError("Passwords must be at least 6 characters");
      setLoading(false);
      return;
    }
    if (!cPassword) {
      setError("Confirm your password");
      setLoading(false);
      return;
    } else if (cPassword !== password) {
      setError("Password not matched");
      setLoading(false);
      return;
    }

    // Simulate signup logic
    try {
      // Simulate an API call or signup process
      setTimeout(() => {
        // Clear form fields and redirect on success
        setLoading(false);
        setClientName('');
        setEmail('');
        setPassword('');
        setCPassword('');
        setError(null);
        router.push('/login');
      }, 1000); // Simulate a delay
    } catch (error) {
      setLoading(false);
      setError("Signup failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-spotify-dark text-white">
      <div className="w-full max-w-sm p-6 bg-spotify-light rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <Image
            src="/logo1.png"
            alt="Spotify"
            width={150}
            height={150}
            className="w-24 h-auto"
          />
        </div>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your name"
              value={clientName}
              onChange={handleName}
              className="w-full p-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none"
              required
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={handleEmail}
              className="w-full p-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
              className="w-full p-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={cPassword}
              onChange={handleCPassword}
              className="w-full p-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none"
              required
            />
            {error && <p className="text-red-600 text-xs">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-spotify-green text-white rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300"
            >
              Sign Up
            </button>
            {loading && (
              <div className="flex justify-center mt-4">
                {/* Add a loader or spinner here */}
              </div>
            )}
          </div>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={() => router.back()}
            className="text-spotify-gray hover:text-white text-sm"
          >
            Go back
          </button>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-600">
          © 2023, Spotify-like App, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

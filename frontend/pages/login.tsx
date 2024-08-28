import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/spotifySlice";
import { RotatingLines } from "react-loader-spinner";

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsgLoad, setSuccessMsgLoad] = useState("");
  const [userEmailError, setUserEmailError] = useState("");
  const [userPasswordError, setUserPasswordError] = useState("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserEmailError("");
    setUserPasswordError("");

    if (!email) {
      setErrEmail("Enter your email");
      return;
    }
    if (!password) {
      setErrPassword("Enter your password");
      return;
    }

    // Mock authentication logic
    if (email === "user@example.com" && password === "password123") {
      setLoading(true);
      try {
        // Simulate an API call or authentication process
        setTimeout(() => {
          // Replace with actual user information if needed
          dispatch(setUserInfo({
            _id: "mockUserId",
            userName: "Mock User",
            email: email,
          }));
          setLoading(false);
          setSuccessMsgLoad("Logged in Successfully");
          setTimeout(() => {
            router.push("/");
          }, 2000);
        }, 1000); // Simulate a delay
      } catch (error) {
        setLoading(false);
        console.error("Login Error:", error);
        setUserEmailError("An unknown error occurred. Please try again.");
      }

      setEmail("");
      setPassword("");
    } else {
      setUserEmailError("Invalid email or password.");
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
        {successMsgLoad ? (
          <div className="text-center py-4">
            <p className="text-green-500 font-semibold">{successMsgLoad}</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email address"
                onChange={handleEmail}
                value={email}
                className="w-full p-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none"
                required
              />
              {errEmail && <p className="text-red-600 text-xs">{errEmail}</p>}
              {userEmailError && (
                <p className="text-red-600 text-xs">{userEmailError}</p>
              )}
              <input
                type="password"
                placeholder="Password"
                onChange={handlePassword}
                value={password}
                className="w-full p-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none"
                required
              />
              {errPassword && (
                <p className="text-red-600 text-xs">{errPassword}</p>
              )}
              {userPasswordError && (
                <p className="text-red-600 text-xs">{userPasswordError}</p>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-spotify-green text-white rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300"
              >
                Log In
              </button>
              {loading && (
                <div className="flex justify-center mt-4">
                  <RotatingLines
                    visible={true}
                    width="50"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                  />
                </div>
              )}
            </div>
          </form>
        )}
        <div className="mt-6 text-center">
          <a href="#" className="text-spotify-gray hover:text-white">
            Forgot your password?
          </a>
        </div>
        <div className="mt-4 text-center">
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

export default Login;

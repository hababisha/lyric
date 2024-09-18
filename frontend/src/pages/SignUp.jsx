import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import PasswordInput from '../components/input/PasswordInput';
import { Link } from 'react-router-dom';
import { validateEmail } from '../utils/helper';
import { registerUser } from '../services/authServices';

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
 
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!username) {
      setError("Please enter your name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    setError("");

    try {
        const data = await registerUser({ username, email, password });
        setMessage('Registration successful! You can log in now.');
    } catch (error) {
      console.error('Registration error:', error.response || error); // Log the entire error response
      setMessage(error.response?.data?.message || 'Error during registration. Please try again.');
  }

  };
  return (
    <>
      
      <div className='flex bg-gray-800 items-center justify-center h-screen'>
         <div className='w-96  bg-gray-800 px-7 py-10'>
            <form onSubmit={handleSignUp}>
               <h4 className='text-2xl text-white mb-7'>SignUp</h4>
               
               <input
                type="text"
                placeholder='Name'
                className='w-full text-white text-sm bg-transparent border-[1.5px] px-5 py-3 ronded mb-4 outline-none'
                 value={username}
                 onChange={(e) => setUserName(e.target.value)}
                />
                  <input
                type="text"
                placeholder='Email'
                className='w-full text-white text-sm bg-transparent border-[1.5px] px-5 py-3 ronded mb-4 outline-none'
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                />
              <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />

              {error && <p className='text-red-500'>{error}</p>}
              {errorMessage && <p className = 'text-red-500'>{errorMessage}</p>}

              {message && <p className='text-green-500'>{message}</p>}
               
               <button type='submit' className=' w-full text-sm bg-blue-700 text-white p-2 rounded my-1 hover:bg-blue-600 onSubmit={handleSignUp}'>Create Account</button>

               <p className='text-sm text-center text-white mt-4'>Already have an account? {""}
               
               <Link to="/login" className='font-medium text-primary underline'>Login</Link></p>
               
            </form>
          </div>
      </div>
    </>
  );
};

export default SignUp

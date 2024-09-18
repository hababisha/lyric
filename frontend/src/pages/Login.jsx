import React, { useState} from 'react';
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar'
import PasswordInput from '../components/input/PasswordInput';
import { validateEmail } from '../utils/helper';
import { loginUser } from '../services/authServices'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const Login = () => {

      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [error, setError] = useState(null);
      const [message, setMessage] = useState('');
      const [errorMessage, setErrorMessage] = useState('');
      const navigate = useNavigate(); 

      const handleLogin = async (e) => {
        e.preventDefault();

      setError("")
      try {
         const { token} = await loginUser({ email, password });
         console.log('Token', token);


         
            if (token) {
               localStorage.setItem('authToken', token);
               // Store the token
               setMessage('Login successful!');
               navigate('/add'); // Redirect to the protected route
           } else {
               setErrorMessage('Unexpected response structure. Token not found.');
           
       } 
   } catch (error) {
         // Log the error and handle it
         console.error('Login error:', error.response ? error.response.data : error);
         if (error.response) {
             // Display specific error messages based on status codes
             if (error.response.status === 404) {
                 setErrorMessage('User not found. Please check your email.');
             } else if (error.response.status === 401) {
                 setErrorMessage('Invalid credentials. Please try again.');
             } else {
                 setErrorMessage('Error during login. Please try again.');
             }
         } else {
             setErrorMessage('Error during login. Please try again.');
         }
     }

   };
    return(
      <div className='bg-gray-800'>
      <div className='flex  items-center justify-center h-screen'>
         <div className='w-96  bg-gray-800 px-7 py-10'>
            <form onSubmit={handleLogin} >
               <h4 className='text-2xl text-white mb-7'>Login</h4>
               <input
                type="text"
                placeholder='Email'
                className='w-full text-sm text-white bg-transparent border-[1.5px] px-5 py-3 ronded mb-4 outline-none'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
               <PasswordInput
                  value={password}
                  
                  onChange={(e) => setPassword(e.target.value)}
               />

               {error && <p className='text-red-500'>{error}</p>}
               {errorMessage && <p className = 'text-red-500'>{errorMessage}</p>}
               {message && <p className = 'text-green-500'>{message}</p>}
               
               <button type='submit' className=' w-full text-sm bg-blue-700 text-white p-2 rounded my-1 hover:bg-blue-600 onSubmit={handleLogin}'>Login</button>

               <p className='text-sm text-white text-center mt-4'>Not registered yet? {""}
               
               <Link to="/register" className='font-medium text-primary underline'>Create an Account</Link><br></br>
               <Link to="/" className='font-medium text-primary underline'>Go to Home</Link></p>

            </form>
         </div>
         
      </div>
      
     </div>
    )
    }
  export default Login
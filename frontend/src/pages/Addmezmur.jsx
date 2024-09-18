import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AddMezmur = ({ children }) => {
    const [title, setTitle] = useState('');
    const [lyrics, setLyrics] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('authToken'); // Get the token from local storage

    // If token is not found, redirect to the login page
    if (!token) {
        return <Navigate to="/login" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Reset message
    
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user.id : null; // Get the user ID
        const token = localStorage.getItem('authToken'); // Get the token
    
        try {
            const response = await axios.post('http://localhost:5000/api/lyrics', {
                title,
                lyrics,
                user: userId // Send the actual user ID
            }, {
                headers: {
                    'Authorization': `Bearer ${token}` // Send the token in the authorization header
                }
            });
            
            if (response.status === 201) {
                setMessage('Successfully added!');
                setTimeout(() => {
                    navigate('/'); // Redirect to the home page
                }, 2000);
            }
        } catch (error) {
            setErrorMessage('Error adding lyric. Please try again.');
            console.error('Error adding lyric:', error);
        }
    };

    return (
        <>

<Navbar showSearch={false} />
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6">Add Mezmur</h2>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">Lyrics:</label>
                    <textarea
                        value={lyrics}
                        onChange={(e) => setLyrics(e.target.value)}
                        className="w-full p-2 border rounded"
                        rows="4"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add
                </button>
                {message && <p className="mt-4 text-green-600">{message}</p>}
                {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}

                
            </form>
        </div>
        </>
    );
};

export default AddMezmur;
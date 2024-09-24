import React, { useState } from 'react';
import ProfileInfo from './Cards/ProfileInfo';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { FaPlus } from 'react-icons/fa';


const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken'); // Check for the token


  const onLogout = () => {
    localStorage.removeItem('authToken');// Clear the token on logout
    localStorage.removeItem('user'); // Clear user data on logout
    navigate("/"); // Redirect to the home page
  };

  const handleSearch = () => {
    if (searchQuery) {
      // Navigate to search results page with the query
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  }
  };

  const onClearSearch = () => { 
    setSearchQuery("")
  };

   // Retrieve user data from local storage
    // Safely retrieve user data from local storage
  const userData = localStorage.getItem('user'); // Get the raw user data
  let username = 'Guest'; // Default username
  if (userData) {
    try {
      const user = JSON.parse(userData); // Parse the JSON safely
      username = user.username || 'User'; // Use the name if available
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }
 

  return (
    <div className='bg-gray-800 flex items-center justify-between px-6 py-2 drop-shadow'>
    <Link to="/"><h2 className='text-xl font-medium text-white py-2 hover:text-color-red'>መዝሙር</h2></Link>
 
      {/* <SearchBar
       value={searchQuery}
       onChange={({ target }) => {
        setSearchQuery(target.value);
        }}
       handleSearch={handleSearch}  
       onClearSearch={onClearSearch}

       /> */}


{token ? (
        <ProfileInfo username={username} onLogout={onLogout} /> // Show ProfileInfo if logged in
      ) : (
        <Link
            to="/add"
            className="flex items-center justify-center  text-white hover:underline transition duration-300"
        >
            <FaPlus className="text-xl" />
        </Link>
      )}
</div>
  );
};

export default Navbar

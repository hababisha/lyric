import React from 'react';
import { getInitials } from '../../utils/helper';
import { FaPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';



const ProfileInfo = ({ onLogout }) => {
  return (
    <div className='flex items-center gap-3'>
         <Link
            to="/add"
            className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:underline transition duration-300"
        >
            <FaPlus className="text-xl" />
        </Link>

      <div>
        <button className='text-sm text-white underline' onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import LyricCard from '../components/Cards/LyricCard';
import AddMezmur from './Addmezmur';
import Footer from './Footer';



const Dashboard = () => {
    const [lyrics, setLyrics] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredLyrics, setFilteredLyrics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All'); // For category filtering
    const categories = ['All', 'Tsom', 'Beal', 'Senbet', 'Other']; // Categories

    useEffect(() => {
        const fetchLyrics = async () => {
            try {
                const response = await axios.get('https://lyric-orcin.vercel.app/api/lyrics'); // Adjust the endpoint as necessary
                setLyrics(response.data);
                setFilteredLyrics(response.data);

            } catch (error) {
                console.error('Error fetching lyrics:', error);
            }finally {
                setLoading(false);
            }
        };

        fetchLyrics();
    }, []);
   
       
     // Update filtered lyrics whenever search query or selected category changes
    useEffect(() => {
        let results = lyrics;

        //Filter by selected category
        if (selectedCategory !== 'All') {
            results = results.filter(lyric => lyric.category === selectedCategory);
        }

       // Further filter by search query
        if (searchQuery) {
            results = results.filter(lyric =>
                lyric.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredLyrics(results);
    }, [searchQuery, selectedCategory, lyrics]);

        
    


    return (
        <>
        <div className="flex flex-col h-[90vh]">
        <div className='flex-grow'>
        <Navbar showSearch={true} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <div className="container mx-auto p-4">
            <h2 className="text-lg text-gray-900 font-bold mb-6 flex justify-center">በስመ አብ ወወልድ ወመንፈስ ቅዱስ አሃዱ አምላክ አሜን፡፡</h2>
            
            <div className='mb-7 flex justify-center'>
            <SearchBar
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                handleSearch={() => {}}
                onClearSearch={() => setSearchQuery("")}
                
            /></div>


            <div className="mb-6 flex justify-center">
                    <label className="block mb-2 text-sm font-medium mt-2 text-gray-700">Filter by Category</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full max-w-[150px] p-2 mx-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                 
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredLyrics.length > 0 ? (
                            filteredLyrics.map(lyric => (
                                <LyricCard key={lyric.id} lyric={lyric} />
                            ))
                        ) : (
                            <div>No results found.</div>
                        )}
                    </div>
                )}
            </div>
           </div>

        </div>
        <Footer />

        </>
    );
};

export default Dashboard;
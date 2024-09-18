import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import LyricCard from '../components/Cards/LyricCard';


const Dashboard = () => {
    const [lyrics, setLyrics] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredLyrics, setFilteredLyrics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLyrics = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/lyrics'); // Adjust the endpoint as necessary
                setLyrics(response.data);
            } catch (error) {
                console.error('Error fetching lyrics:', error);
            }finally {
                setLoading(false);
            }
        };

        fetchLyrics();
    }, []);
    useEffect(() => {
        if (searchQuery) {
            const results = lyrics.filter(lyric =>
                lyric.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredLyrics(results);
        } else {
            setFilteredLyrics([]);
        }
    }, [searchQuery, lyrics]);


    return (
        <div>
        <Navbar showSearch={true} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />        <div className="container mx-auto p-4">
            <h2 className="text-3xl text-gray-900 font-bold mb-6 flex justify-center">በስመ አብ ወወልድ ወመንፈስ ቅዱስ አሃዱ አምላክ አሜን፡፡</h2>
            
            <div className='mb-7 flex justify-center'>
            <SearchBar
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                handleSearch={() => {}}
                onClearSearch={() => setSearchQuery("")}
                
            /></div>
             {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(searchQuery ? filteredLyrics : lyrics).map(lyric => (
                            <LyricCard key={lyric.id} lyric={lyric} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
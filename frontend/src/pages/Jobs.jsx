import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllJobs } from '../api/jobApi';
import Navbar from '../components/Navbar';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (query = '') => {
    setLoading(true);
    try {
      const res = await getAllJobs(query);
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(search);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <h1 className="text-4xl font-extrabold text-gray-900">Explore Opportunities</h1>
          <form onSubmit={handleSearch} className="flex w-full md:w-auto gap-2">
            <input type="text" placeholder="Search by title or location..." className="p-3 border border-gray-200 rounded-xl w-full md:w-80 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-100">Search</button>
          </form>
        </header>

        {loading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map(job => (
              <div key={job.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">{job.jobType}</span>
                  <span className="text-gray-400 text-sm">{job.location}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
                <p className="text-gray-500 line-clamp-2 text-sm mb-4">{job.description}</p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
                  <span className="font-bold text-blue-600">{job.salaryRange}</span>
                  <Link to={`/jobs/${job.id}`} className="text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1">Details →</Link>
                </div>
              </div>
            ))}
            {jobs.length === 0 && <p className="col-span-full text-center text-gray-500 py-10 text-lg">No jobs found matching your search.</p>}
          </div>
        )}
      </div>
    </>
  );
}

export default Jobs;

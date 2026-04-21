import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllJobs, deleteJob } from '../api/jobApi';
import Navbar from '../components/Navbar';

function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const res = await getMyJobs(); 
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      await deleteJob(id);
      fetchMyJobs();
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">Employer Dashboard</h1>
          <Link to="/post-job" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">Post New Job</Link>
        </div>

        <div className="grid gap-6">
          {jobs.map(job => (
            <div key={job.id} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{job.title}</h3>
                <p className="text-gray-500 mb-2">{job.location} • {job.jobType}</p>
                <div className="flex gap-4">
                  <span className="text-sm font-medium text-blue-600">Posted on {new Date(job.createdAt).toLocaleDateString()}</span>
                  <span className="text-sm font-medium text-gray-400">|</span>
                  <span className="text-sm font-medium text-gray-600">{job.deadline}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Link to={`/applicants/${job.id}`} className="bg-slate-100 text-slate-700 px-6 py-2.5 rounded-lg font-bold hover:bg-slate-200 transition">View Applicants</Link>
                <button onClick={() => handleDelete(job.id)} className="bg-red-50 text-red-600 px-6 py-2.5 rounded-lg font-bold hover:bg-red-100 transition">Delete</button>
              </div>
            </div>
          ))}
          {jobs.length === 0 && <p className="text-center text-gray-500 py-20 font-medium text-lg">You haven't posted any jobs yet. Start by posting your first job!</p>}
        </div>
      </div>
    </>
  );
}

export default EmployerDashboard;

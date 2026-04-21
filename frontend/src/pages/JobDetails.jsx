import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById } from '../api/jobApi';
import { applyToJob } from '../api/applicationApi';
import Navbar from '../components/Navbar';

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await getJobById(id);
      setJob(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleApply = async () => {
    if (!user) return navigate('/login');
    if (user.role !== 'SEEKER') return alert('Only Job Seekers can apply');
    
    try {
      await applyToJob(id);
      alert('Applied successfully!');
      navigate('/dashboard/seeker');
    } catch (err) {
      alert('You have already applied to this job');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!job) return <div>Job not found</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-10">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-blue-600 p-10 text-white">
            <div className="flex justify-between items-center mb-6">
              <span className="bg-blue-400 bg-opacity-30 px-4 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">{job.jobType}</span>
              <span className="text-blue-100 text-sm">Posted on {new Date(job.createdAt).toLocaleDateString()}</span>
            </div>
            <h1 className="text-4xl font-extrabold mb-2">{job.title}</h1>
            <p className="text-xl text-blue-100">{job.company.name} • {job.location}</p>
          </div>
          
          <div className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              <div className="bg-slate-50 p-6 rounded-2xl">
                <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Salary Range</h3>
                <p className="text-2xl font-bold text-gray-800">{job.salaryRange}</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl">
                <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Deadline</h3>
                <p className="text-2xl font-bold text-gray-800">{job.deadline}</p>
              </div>
            </div>

            <div className="prose max-w-none mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{job.description}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 border-t pt-10">
              <button onClick={handleApply} className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200">Apply for this position</button>
              <button onClick={() => navigate(-1)} className="px-8 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition">Go Back</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobDetails;

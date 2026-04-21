import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../api/jobApi';
import Navbar from '../components/Navbar';

function PostJob() {
  const [formData, setFormData] = useState({ title: '', description: '', location: '', jobType: 'FULL_TIME', salaryRange: '', deadline: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createJob(formData);
      navigate('/dashboard/employer');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 mt-10">
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
          <h2 className="text-3xl font-extrabold mb-8 text-gray-900 text-center">Post a New Job</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 uppercase tracking-wide">Job Title</label>
              <input type="text" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Software Engineer" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 uppercase tracking-wide">Location</label>
              <input type="text" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Remote / New York" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2 uppercase tracking-wide">Job Description</label>
            <textarea className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 h-40" placeholder="Describe the role, responsibilities, and requirements..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 uppercase tracking-wide">Job Type</label>
              <select className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white" value={formData.jobType} onChange={(e) => setFormData({...formData, jobType: e.target.value})}>
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 uppercase tracking-wide">Salary Range</label>
              <input type="text" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="$50k - $80k" value={formData.salaryRange} onChange={(e) => setFormData({...formData, salaryRange: e.target.value})} />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 uppercase tracking-wide">Deadline</label>
              <input type="date" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" value={formData.deadline} onChange={(e) => setFormData({...formData, deadline: e.target.value})} required />
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-blue-600 text-white p-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200">Post Job Opportunity</button>
            <button type="button" onClick={() => navigate(-1)} className="px-8 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PostJob;

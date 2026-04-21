import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getApplicantsForJob, updateApplicationStatus } from '../api/applicationApi';
import Navbar from '../components/Navbar';

function Applicants() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const fetchApplicants = async () => {
    try {
      const res = await getApplicantsForJob(jobId);
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await updateApplicationStatus(appId, newStatus);
      fetchApplicants();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center md:text-left">Applicants for this position</h1>
        
        <div className="grid gap-6">
          {applications.map(app => (
            <div key={app.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{app.seeker.user.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{app.seeker.user.email}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {app.seeker.skills?.split(',').map(skill => (
                    <span key={skill} className="bg-slate-50 text-slate-600 px-3 py-1 rounded-full text-xs font-medium border border-slate-100">{skill.trim()}</span>
                  ))}
                </div>
                {app.seeker.resumeUrl && (
                  <a href={`http://localhost:8080/uploads/resumes/${app.seeker.resumeUrl}`} target="_blank" rel="noreferrer" className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">View Resume ↗</a>
                )}
              </div>
              
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 text-center md:text-left">Update Status</p>
                <div className="flex gap-2">
                  <select 
                    value={app.status} 
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    className="p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-sm bg-white cursor-pointer"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="REVIEWED">Reviewed</option>
                    <option value="ACCEPTED">Accepted</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
          {applications.length === 0 && <p className="text-center text-gray-500 py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">No applicants yet.</p>}
        </div>
      </div>
    </>
  );
}

export default Applicants;

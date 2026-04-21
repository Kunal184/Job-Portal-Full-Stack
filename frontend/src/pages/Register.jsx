import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/authApi';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'SEEKER' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Email might already be taken.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 py-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-[400px] border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
        {error && <p className="text-red-500 mb-4 bg-red-50 p-3 rounded-lg text-sm">{error}</p>}
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
          <input type="text" className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
          <input type="email" className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
          <input type="password" className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">I am an:</label>
          <div className="flex gap-4">
            <button type="button" onClick={() => setFormData({...formData, role: 'SEEKER'})} className={`flex-1 p-3 rounded-lg border transition ${formData.role === 'SEEKER' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}>Job Seeker</button>
            <button type="button" onClick={() => setFormData({...formData, role: 'EMPLOYER'})} className={`flex-1 p-3 rounded-lg border transition ${formData.role === 'EMPLOYER' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}>Employer</button>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">Register</button>
        <p className="mt-6 text-center text-gray-500 text-sm">Already have an account? <Link to="/login" className="text-blue-600 hover:underline font-semibold">Login</Link></p>
      </form>
    </div>
  );
}

export default Register;

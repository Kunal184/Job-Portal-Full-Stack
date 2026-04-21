import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">JobPortal</Link>
      <div className="space-x-6 flex items-center">
        <Link to="/jobs" className="text-gray-600 hover:text-blue-600">Browse Jobs</Link>
        {user ? (
          <>
            {user.role === 'SEEKER' && <Link to="/dashboard/seeker" className="text-gray-600 hover:text-blue-600">My Applications</Link>}
            {user.role === 'EMPLOYER' && <Link to="/dashboard/employer" className="text-gray-600 hover:text-blue-600">Manage Jobs</Link>}
            <Link to="/profile" className="text-gray-600 hover:text-blue-600">Profile ({user.name})</Link>
            <button onClick={logout} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

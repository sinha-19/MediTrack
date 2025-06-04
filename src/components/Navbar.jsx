import { Link, useLocation } from 'react-router-dom'
function Navbar() {
  const location = useLocation()
  const isActive = (path) => {
    return location.pathname === path ? 'text-primary-600 font-medium' : 'text-gray-600 hover:text-primary-500'
  }
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-gray-800">MediTrack</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className={`${isActive('/')} transition-colors`}>Home</Link>
            <Link to="/dashboard" className={`${isActive('/dashboard')} transition-colors`}>Dashboard</Link>
            <Link to="/add" className={`${isActive('/add')} transition-colors`}>Add Medicine</Link>
          </div>
          <div className="md:hidden">
            <button className="p-2 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
export default Navbar
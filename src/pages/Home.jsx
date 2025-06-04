import { Link } from 'react-router-dom'
function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to MediTrack</h1>
        <p className="text-xl text-gray-600">Your personal medicine reminder and tracking assistant</p>
      </section>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="card flex flex-col items-center text-center p-8 transition-transform hover:scale-105">
          <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Never Miss a Dose</h2>
          <p className="text-gray-600 mb-4">Get timely reminders for your medicine schedule. MediTrack ensures you take your medications on time, every time.</p>
          <Link to="/dashboard" className="btn btn-primary mt-auto">
            View Dashboard
          </Link>
        </div>
        <div className="card flex flex-col items-center text-center p-8 transition-transform hover:scale-105">
          <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Track Your Progress</h2>
          <p className="text-gray-600 mb-4">Keep track of your medication intake history. Monitor your adherence and build healthy habits.</p>
          <Link to="/add" className="btn btn-primary mt-auto">
            Add Medicine
          </Link>
        </div>
      </div>
      <section className="card mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-4">
              <span className="font-semibold text-primary-600">1</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Add Your Medicines</h3>
              <p className="text-gray-600">Enter your medication details including name, dosage, and schedule.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-4">
              <span className="font-semibold text-primary-600">2</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Receive Reminders</h3>
              <p className="text-gray-600">Get browser notifications when it's time to take your medicine.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-4">
              <span className="font-semibold text-primary-600">3</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Track Your Intake</h3>
              <p className="text-gray-600">Mark medicines as taken or skipped and monitor your adherence over time.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center">
        <Link to="/add" className="btn btn-primary px-6 py-3">
          Get Started Now
        </Link>
      </div>
    </div>
  )
}
export default Home
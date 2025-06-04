import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MedicineCard from '../components/MedicineCard'
import ProgressSummary from '../components/ProgressSummary'
import { getMedicines, recordIntake, deleteMedicine } from '../utils/localStorage'
import { setupMedicineReminders, requestNotificationPermission } from '../utils/notifications'
function Dashboard() {
  const [medicines, setMedicines] = useState([])
  const [notificationEnabled, setNotificationEnabled] = useState(false)
  useEffect(() => {
    const loadedMedicines = getMedicines();
    setMedicines(loadedMedicines);
    const checkNotificationPermission = async () => {
      const permissionGranted = await requestNotificationPermission();
      setNotificationEnabled(permissionGranted);
      if (permissionGranted) {
        setupMedicineReminders(loadedMedicines);
      }
    };
    checkNotificationPermission();
    const intervalId = setInterval(() => {
      setMedicines(getMedicines());
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);
  const handleTaken = (medicineId, time) => {
    recordIntake(medicineId, 'taken', new Date().toISOString(), time);
    setMedicines(getMedicines());
  };
  const handleSkipped = (medicineId, time) => {
    recordIntake(medicineId, 'skipped', new Date().toISOString(), time);
    setMedicines(getMedicines());
  };
  const handleDelete = (medicineId) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      deleteMedicine(medicineId);
      setMedicines(getMedicines());
    }
  };
  const requestNotifications = async () => {
    const permissionGranted = await requestNotificationPermission();
    setNotificationEnabled(permissionGranted);
    if (permissionGranted) {
      setupMedicineReminders(medicines);
    }
  };
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Medicine Dashboard</h1>
        <Link to="/add" className="btn btn-primary">
          Add Medicine
        </Link>
      </div>  
      {!notificationEnabled && (
        <div className="bg-warning-50 border-l-4 border-warning-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-warning-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-warning-700">
                Enable notifications to receive medicine reminders.
                <button
                  onClick={requestNotifications}
                  className="ml-2 font-medium underline text-warning-800 hover:text-warning-900"
                >
                  Enable Now
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
      {medicines.length > 0 ? (
        <>
          <ProgressSummary medicines={medicines} />  
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Medicines</h2>
            {medicines.map(medicine => (
              <MedicineCard 
                key={medicine.id} 
                medicine={medicine}
                onTaken={handleTaken}
                onSkipped={handleSkipped}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No medicines added yet</h3>
          <p className="text-gray-600 mb-6">Add your first medicine to start tracking</p>
          <Link to="/add" className="btn btn-primary">
            Add Your First Medicine
          </Link>
        </div>
      )}
    </div>
  )
}
export default Dashboard
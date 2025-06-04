import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MedicineSearch from '../components/MedicineSearch'
import { addMedicine } from '../utils/localStorage'
import { setupMedicineReminders } from '../utils/notifications'
function AddMedicine() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    scheduledTime: []
  })
  const [medicineDetails, setMedicineDetails] = useState(null)
  const [errors, setErrors] = useState({})
  const commonTimes = [
    { label: 'Morning (8:00 AM)', value: '08:00' },
    { label: 'Noon (12:00 PM)', value: '12:00' },
    { label: 'Afternoon (2:00 PM)', value: '14:00' },
    { label: 'Evening (6:00 PM)', value: '18:00' },
    { label: 'Night (10:00 PM)', value: '22:00' }
  ]
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }))
    }
  }
  const handleTimeToggle = (timeValue) => {
    setFormData(prev => {
      const currentTimes = [...prev.scheduledTime]   
      if (currentTimes.includes(timeValue)) {
        return {
          ...prev,
          scheduledTime: currentTimes.filter(time => time !== timeValue)
        }
      } else {
        return {
          ...prev,
          scheduledTime: [...currentTimes, timeValue].sort()
        }
      }
    })
    if (errors.scheduledTime) {
      setErrors(prev => ({
        ...prev,
        scheduledTime: null
      }))
    }
  }
  const handleMedicineSelect = (medicine) => {
    setMedicineDetails(medicine)
    setFormData(prev => ({
      ...prev,
      name: medicine.brandName || medicine.genericName,
      dosage: prev.dosage || 'Once daily'
    }))
  }
  const validateForm = () => {
    const newErrors = {} 
    if (!formData.name.trim()) {
      newErrors.name = 'Medicine name is required'
    }
    if (!formData.dosage.trim()) {
      newErrors.dosage = 'Dosage information is required'
    }
    if (formData.scheduledTime.length === 0) {
      newErrors.scheduledTime = 'At least one time must be selected'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const handleSubmit = (e) => {
    e.preventDefault() 
    if (!validateForm()) {
      return
    }
    const newMedicine = {
      ...formData,
      description: medicineDetails?.description || '',
      manufacturer: medicineDetails?.manufacturer || '',
      warnings: medicineDetails?.warnings || '',
      activeIngredients: medicineDetails?.activeIngredients || ''
    }
    const addedMedicine = addMedicine(newMedicine)
    setupMedicineReminders([addedMedicine])
    navigate('/dashboard')
  }
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Medicine</h1>   
      <div className="card">
        <form onSubmit={handleSubmit}>
          <MedicineSearch onSelect={handleMedicineSelect} />
          <div className="mb-4">
            <label htmlFor="name" className="label">Medicine Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`input ${errors.name ? 'border-danger-500 focus:ring-danger-500' : ''}`}
              placeholder="Enter medicine name"
            />
            {errors.name && <p className="mt-1 text-sm text-danger-500">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="dosage" className="label">Dosage</label>
            <input
              type="text"
              id="dosage"
              name="dosage"
              value={formData.dosage}
              onChange={handleInputChange}
              className={`input ${errors.dosage ? 'border-danger-500 focus:ring-danger-500' : ''}`}
              placeholder="E.g., 1 tablet, 5ml, etc."
            />
            {errors.dosage && <p className="mt-1 text-sm text-danger-500">{errors.dosage}</p>}
          </div>
          <div className="mb-6">
            <label className="label">Schedule</label>
            <p className="text-sm text-gray-600 mb-2">Select when to take this medicine:</p>
            <div className="flex flex-wrap gap-2">
              {commonTimes.map((time, index) => (
                <button
                  key={index}
                  type="button"
                  className={`btn ${
                    formData.scheduledTime.includes(time.value)
                      ? 'bg-primary-100 text-primary-800 border-primary-300'
                      : 'btn-secondary'
                  }`}
                  onClick={() => handleTimeToggle(time.value)}
                >
                  {time.label}
                </button>
              ))}
            </div>
            
            {errors.scheduledTime && (
              <p className="mt-1 text-sm text-danger-500">{errors.scheduledTime}</p>
            )}
          </div>
          {medicineDetails && medicineDetails.description && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Medicine Information</h3>
              <p className="text-sm text-gray-600">{medicineDetails.description}</p>
              {medicineDetails.warnings && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-danger-600">Warnings</h4>
                  <p className="text-xs text-gray-600">{medicineDetails.warnings}</p>
                </div>
              )}
            </div>
          )}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Medicine
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddMedicine
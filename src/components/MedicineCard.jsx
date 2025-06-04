import { useState } from 'react'
function MedicineCard({ medicine, onTaken, onSkipped, onDelete }) {
  const [expanded, setExpanded] = useState(false)
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };
  const isTimePassed = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const scheduledTime = new Date();
    scheduledTime.setHours(hours, minutes, 0, 0);
    return scheduledTime < new Date();
  };
  const isTaken = (timeStr) => {
    if (!medicine.history) return false;
    const today = new Date().toDateString();
    return medicine.history.some(record => 
      new Date(record.date).toDateString() === today && 
      record.scheduledTime === timeStr &&
      record.status === 'taken'
    );
  };
  const isSkipped = (timeStr) => {
    if (!medicine.history) return false;
    const today = new Date().toDateString();
    return medicine.history.some(record => 
      new Date(record.date).toDateString() === today && 
      record.scheduledTime === timeStr &&
      record.status === 'skipped'
    );
  };
  const scheduledTimes = Array.isArray(medicine.scheduledTime) 
    ? medicine.scheduledTime 
    : [medicine.scheduledTime];
  return (
    <div className="card mb-4 overflow-hidden transition-shadow hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{medicine.name}</h3>
          <p className="text-gray-600">{medicine.dosage}</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setExpanded(!expanded)}
            className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {expanded ? (
                <path strokeLinecap="round\" strokeLinejoin="round\" strokeWidth={2} d="M5 15l7-7 7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              )}
            </svg>
          </button>
          <button 
            onClick={() => onDelete(medicine.id)}
            className="p-2 text-gray-500 hover:text-danger-500 transition-colors"
            aria-label="Delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {scheduledTimes.map((time, index) => {
            const taken = isTaken(time);
            const skipped = isSkipped(time);
            const passed = isTimePassed(time);
            let statusBadge = null;
            if (taken) {
              statusBadge = <span className="badge badge-success">Taken</span>;
            } else if (skipped) {
              statusBadge = <span className="badge badge-danger">Skipped</span>;
            } else if (passed) {
              statusBadge = <span className="badge badge-warning">Missed</span>;
            } else {
              statusBadge = <span className="badge badge-primary">Upcoming</span>;
            }
            return (
              <div key={index} className="flex flex-col items-center p-2 border rounded-md">
                <span className="text-sm font-medium">{formatTime(time)}</span>
                {statusBadge}
                {!taken && !skipped && (
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => onTaken(medicine.id, time)}
                      className="btn btn-success py-1 px-2 text-xs"
                      disabled={taken}
                    >
                      Take
                    </button>
                    <button
                      onClick={() => onSkipped(medicine.id, time)}
                      className="btn btn-danger py-1 px-2 text-xs"
                      disabled={skipped}
                    >
                      Skip
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {expanded && medicine.description && (
        <div className="mt-4 pt-4 border-t">
          <h4 className="font-medium text-gray-800">Description</h4>
          <p className="text-sm text-gray-600">{medicine.description}</p>
          {medicine.manufacturer && (
            <div className="mt-2">
              <h4 className="font-medium text-gray-800">Manufacturer</h4>
              <p className="text-sm text-gray-600">{medicine.manufacturer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
export default MedicineCard
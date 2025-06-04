function ProgressSummary({ medicines }) {
  const calculateStats = () => {
    const today = new Date().toDateString();
    let total = 0;
    let taken = 0;
    let skipped = 0;
    let missed = 0;
    medicines.forEach(medicine => {
      const scheduledTimes = Array.isArray(medicine.scheduledTime) 
        ? medicine.scheduledTime 
        : [medicine.scheduledTime];
      scheduledTimes.forEach(time => {
        total++;
        const record = medicine.history?.find(r => 
          new Date(r.date).toDateString() === today && 
          r.scheduledTime === time
        );
        if (record) {
          if (record.status === 'taken') {
            taken++;
          } else if (record.status === 'skipped') {
            skipped++;
          }
        } else {
          const [hours, minutes] = time.split(':').map(Number);
          const scheduledTime = new Date();
          scheduledTime.setHours(hours, minutes, 0, 0);
          if (scheduledTime < new Date()) {
            missed++;
          }
        }
      });
    });
    const adherenceRate = total > 0 ? Math.round((taken / total) * 100) : 0;
    return {
      total,
      taken,
      skipped,
      missed,
      upcoming: total - taken - skipped - missed,
      adherenceRate
    };
  };
  const stats = calculateStats();
  const getAdherenceColor = (rate) => {
    if (rate >= 80) return 'text-success-500';
    if (rate >= 50) return 'text-warning-500';
    return 'text-danger-500';
  };
  return (
    <div className="card mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Today's Progress</h2>  
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <div className="text-3xl font-bold text-primary-500">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Scheduled</div>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <div className="text-3xl font-bold text-success-500">{stats.taken}</div>
            <div className="text-sm text-gray-600">Taken</div>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-2">
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <div className={`text-3xl font-bold ${getAdherenceColor(stats.adherenceRate)}`}>
              {stats.adherenceRate}%
            </div>
            <div className="text-sm text-gray-600">Adherence Rate</div>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <span className="text-sm font-medium text-danger-500">{stats.missed}</span>
            <span className="text-xs text-gray-500 block">Missed</span>
          </div>
          <div>
            <span className="text-sm font-medium text-warning-500">{stats.skipped}</span>
            <span className="text-xs text-gray-500 block">Skipped</span>
          </div>
          <div>
            <span className="text-sm font-medium text-primary-500">{stats.upcoming}</span>
            <span className="text-xs text-gray-500 block">Upcoming</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProgressSummary
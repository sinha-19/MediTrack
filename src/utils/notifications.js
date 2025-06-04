export const isNotificationSupported = () => {
  return 'Notification' in window;
};
export const requestNotificationPermission = async () => {
  if (!isNotificationSupported()) {
    return false;
  }
  if (Notification.permission === 'granted') {
    return true;
  }
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};
export const sendNotification = (title, options = {}) => {
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      icon: '/notification-icon.png',
      badge: '/badge-icon.png',
      ...options
    });  
    notification.onclick = function() {
      window.focus();
      notification.close();
    };
    return notification;
  }
  return null;
};
export const setupMedicineReminders = (medicines) => {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return;
  }
  if (window.medicineTimers) {
    window.medicineTimers.forEach(timer => clearTimeout(timer));
  }
  window.medicineTimers = [];
  medicines.forEach(medicine => {
    const scheduledTimes = Array.isArray(medicine.scheduledTime) 
      ? medicine.scheduledTime 
      : [medicine.scheduledTime];
    scheduledTimes.forEach(timeStr => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      const now = new Date();
      const scheduledTime = new Date();
      scheduledTime.setHours(hours, minutes, 0, 0);
      if (scheduledTime <= now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
      }
      const msUntilScheduled = scheduledTime - now;
      const timerId = setTimeout(() => {
        sendNotification(`Time to take ${medicine.name}`, {
          body: `Dosage: ${medicine.dosage}`,
          vibrate: [100, 50, 100],
          requireInteraction: true,
          tag: `medicine-${medicine.id}-${timeStr}`,
          data: {
            medicineId: medicine.id,
            scheduledTime: timeStr
          }
        });
        setupMedicineReminders([medicine]);
      }, msUntilScheduled);
      window.medicineTimers.push(timerId);
    });
  });
};
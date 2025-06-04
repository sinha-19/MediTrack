const STORAGE_KEY = 'meditrack_medicines';
export const getMedicines = () => {
  const medicines = localStorage.getItem(STORAGE_KEY);
  return medicines ? JSON.parse(medicines) : [];
};
export const saveMedicines = (medicines) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(medicines));
};
export const addMedicine = (medicine) => {
  const medicines = getMedicines();
  const newMedicine = {
    ...medicine,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    history: []
  };
  medicines.push(newMedicine);
  saveMedicines(medicines);
  return newMedicine;
};
export const updateMedicine = (id, updatedMedicine) => {
  const medicines = getMedicines();
  const index = medicines.findIndex(med => med.id === id);
  if (index !== -1) {
    medicines[index] = { ...medicines[index], ...updatedMedicine };
    saveMedicines(medicines);
    return medicines[index];
  }
  return null;
};
export const deleteMedicine = (id) => {
  const medicines = getMedicines();
  const updatedMedicines = medicines.filter(med => med.id !== id);
  saveMedicines(updatedMedicines);
};
export const recordIntake = (id, status, time = new Date().toISOString()) => {
  const medicines = getMedicines();
  const index = medicines.findIndex(med => med.id === id);
  if (index !== -1) {
    if (!medicines[index].history) {
      medicines[index].history = [];
    }
    medicines[index].history.push({
      date: time,
      status: status, 
      scheduledTime: medicines[index].scheduledTime
    });
    saveMedicines(medicines);
    return medicines[index];
  }
  return null;
};
export const getTodayIntake = () => {
  const medicines = getMedicines();
  const today = new Date().toDateString();
  return medicines.map(medicine => {
    const todayRecords = medicine.history?.filter(record => 
      new Date(record.date).toDateString() === today
    ) || [];
    return {
      ...medicine,
      todayRecords
    };
  });
};
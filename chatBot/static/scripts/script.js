document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('medication-form');
    const medicationList = document.getElementById('medication-list');
    const alarmSound = document.getElementById('alarm-sound');
    let editIndex = null;
    let snoozeTimeout = null;
  
    form.addEventListener('submit', event => {
      event.preventDefault();
  
      const name = document.getElementById('name').value;
      const dosage = document.getElementById('dosage').value;
      const time = document.getElementById('time').value;
  
      const medication = { name, dosage, time };
  
      if (editIndex !== null) {
        updateMedication(medication, editIndex);
      } else {
        addMedication(medication);
        saveMedication(medication);
      }
  
      form.reset();
      editIndex = null;
    });
  
    function addMedication(medication) {
      const div = document.createElement('div');
      div.className = 'medication-item';
  
      const medicationInfo = document.createElement('div');
      medicationInfo.textContent = `${medication.name} - ${medication.dosage} at ${medication.time}`;
      div.appendChild(medicationInfo);
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.onclick = () => editMedication(medication, div);
      div.appendChild(editButton);
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => deleteMedication(div);
      div.appendChild(deleteButton);
  
      medicationList.appendChild(div);
    }
  
    function saveMedication(medication) {
      const medications = JSON.parse(localStorage.getItem('medications')) || [];
      medications.push(medication);
      localStorage.setItem('medications', JSON.stringify(medications));
    }
  
    function loadMedications() {
      const medications = JSON.parse(localStorage.getItem('medications')) || [];
      medications.forEach(addMedication);
    }
  
    function editMedication(medication, div) {
      document.getElementById('name').value = medication.name;
      document.getElementById('dosage').value = medication.dosage;
      document.getElementById('time').value = medication.time;
  
      const index = Array.from(medicationList.children).indexOf(div);
      editIndex = index;
      deleteMedication(div);
    }
  
    function updateMedication(medication, index) {
      const medications = JSON.parse(localStorage.getItem('medications')) || [];
      medications[index] = medication;
      localStorage.setItem('medications', JSON.stringify(medications));
  
      medicationList.innerHTML = '';
      loadMedications();
    }
  
    function deleteMedication(div) {
      const index = Array.from(medicationList.children).indexOf(div);
      const medications = JSON.parse(localStorage.getItem('medications')) || [];
      medications.splice(index, 1);
      localStorage.setItem('medications', JSON.stringify(medications));
  
      medicationList.removeChild(div);
    }
  
    function checkNotifications() {
      const now = new Date();
      const currentTime = now.toTimeString().substring(0, 5);
      const medications = JSON.parse(localStorage.getItem('medications')) || [];
  
      medications.forEach(medication => {
        if (medication.time === currentTime) {
          showNotification(medication);
          playAlarm();
        }
      });
    }
  
    function showNotification(medication) {
      if (Notification.permission === 'granted') {
        new Notification('Medication Reminder', {
          body: `${medication.name} - ${medication.dosage}`,
        });
      }
    }
  
    function playAlarm() {
      try {
        alarmSound.play();
        const snoozeButton = document.createElement('button');
        snoozeButton.textContent = 'Snooze';
        snoozeButton.onclick = snoozeAlarm;
        document.body.appendChild(snoozeButton);
      } catch (error) {
        console.error('Error playing alarm:', error);
      }
    }
  
    function snoozeAlarm() {
      alarmSound.pause();
      clearTimeout(snoozeTimeout);
      snoozeTimeout = setTimeout(checkNotifications, 300000); // 5 minutes
      document.body.removeChild(snoozeButton);
    }
  
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  
    loadMedications();
    setInterval(checkNotifications, 60000); // Check every minute
  });
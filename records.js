document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/submissions'); // Assuming your backend route is /submissions
    const data = await response.json();

    const tableBody = document.querySelector('#recordsTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach(record => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${record.fullName || ''}</td>
        <td>${record.dob || ''}</td>
        <td>${record.qualification === 'Others' ? record.otherQualification || 'Others' : record.qualification}</td>
        <td>${record.comments || ''}</td>
      `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching records:', error);
  }
});

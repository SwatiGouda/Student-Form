const qualificationSelect = document.getElementById('qualification');
const othersText = document.getElementById('othersText');
const othersLabel = document.getElementById('othersLabel');
const formMessage = document.getElementById('formMessage');
const dobInput = document.getElementById('dob');

// Set max date for dob as today
dobInput.max = new Date().toISOString().split("T")[0];

qualificationSelect.addEventListener('change', () => {
  if (qualificationSelect.value === "Others") {
    othersText.style.display = 'block';
    othersLabel.style.display = 'block';
    othersText.required = true;
  } else {
    othersText.style.display = 'none';
    othersLabel.style.display = 'none';
    othersText.required = false;
    othersText.value = '';
    document.getElementById('othersError').textContent = '';
  }
});

// Only allow letters and spaces in message/comments
document.getElementById('message').addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
});

document.getElementById('userForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  formMessage.textContent = '';
  formMessage.style.color = '';

  const fullName = document.getElementById('fullName').value.trim();
  const dob = dobInput.value;
  const qualification = qualificationSelect.value;
  const others = othersText.value.trim();
  const message = document.getElementById('message').value.trim();

  // Clear previous errors
  document.querySelectorAll('.error').forEach(span => span.textContent = '');

  let isValid = true;

  if (!fullName) {
    document.getElementById('fullNameError').textContent = "Full Name is required.";
    isValid = false;
  }
  if (!dob) {
    document.getElementById('dobError').textContent = "Date of Birth is required.";
    isValid = false;
  }
  if (!qualification) {
    document.getElementById('qualificationError').textContent = "Qualification is required.";
    isValid = false;
  }
  if (qualification === "Others" && !others) {
    document.getElementById('othersError').textContent = "Please specify your qualification.";
    isValid = false;
  }
  if (!message) {
    document.getElementById('messageError').textContent = "Message/Comments is required.";
    isValid = false;
  }

  if (!isValid) {
    return; // stop submit on validation errors
  }

  // Prepare data to send
  const data = {
    fullName,
    dob,
    qualification: qualification === "Others" ? others : qualification,
    message
  };

  try {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      formMessage.style.color = 'green';
      formMessage.textContent = "Data submitted successfully!";
      this.reset();
      othersText.style.display = 'none';
      othersLabel.style.display = 'none';
    } else {
      const error = await res.json();
      formMessage.style.color = '#c62828';
      formMessage.textContent = error.message || "Failed to submit.";
    }
  } catch (error) {
    formMessage.style.color = '#c62828';
    formMessage.textContent = "Error connecting to server.";
  }

    setTimeout(() => {
    window.location.href = 'records.html';
  }, 1500);
});

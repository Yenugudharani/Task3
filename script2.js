// Contact Form Validation
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const errorMessage = document.getElementById("error-message");

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (!name || !email || !message) {
    errorMessage.textContent = "Please fill in all fields.";
    return;
  }

  if (!email.match(emailPattern)) {
    errorMessage.textContent = "Invalid email format.";
    return;
  }

  errorMessage.textContent = "";
  alert(`✅ Thank you ${name}, your message has been submitted successfully!`);
  document.getElementById("contactForm").reset();
});

// To-do List Functionality
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (!taskText) {
    alert("Please enter a task.");
    return;
  }

  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");
  li.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = " ❌";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.onclick = () => li.remove();
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
  alert("✅ Task added successfully: " + taskText);
  taskInput.value = "";
}

// Add event listener for add task button
document.getElementById("addTaskBtn").addEventListener("click", addTask);

// Footer button
function showMessage() {
  alert("Hello! Thanks for clicking the button.");
}

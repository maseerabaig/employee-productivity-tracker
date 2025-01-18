
document.addEventListener("DOMContentLoaded", () => {
    const employerButton = document.getElementById("employerButton");
    const employeeButton = document.getElementById("employeeButton");
    const roleSelectionSection = document.getElementById("roleSelectionSection");
    const contentSection = document.getElementById("contentSection");
    const welcomeMessage = document.getElementById("welcomeMessage");
    const employerView = document.getElementById("employerView");
    const employeeView = document.getElementById("employeeView");
    const backButton = document.getElementById("backButton");
    
    // Existing Report Data
    const reportData = [
      { name: "John Doe", tasksCompleted: 35 },
      { name: "Jane Smith", tasksCompleted: 28 },
      { name: "Alex Johnson", tasksCompleted: 18 },
      { name: "Emily Davis", tasksCompleted: 50 },
      { name: "Michael Brown", tasksCompleted: 22 },
    ];
  
    const employeeTasksData = [
      { title: "Update Website", description: "Fix bugs in the front-end code", timeSpent: 5, status: "Completed" },
      { title: "Team Meeting", description: "Discuss project milestones", timeSpent: 2, status: "In Progress" },
      { title: "Prepare Report", description: "Create monthly productivity report", timeSpent: 3, status: "Pending" }
    ];
  
    // Function to render the productivity table (Employer View)
    function renderProductivityTable() {
      const productivityTableBody = document.querySelector("#productivityTable");
      productivityTableBody.innerHTML = ""; // Clear the current table data
  
      reportData.forEach((employee) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${employee.name}</td>
          <td>${employee.tasksCompleted}</td>
        `;
        productivityTableBody.appendChild(row);
      });
    }
  
    // Function to render the employee's tasks (Employee View)
    function renderEmployeeTasks() {
      const employeeTasksTableBody = document.querySelector("#employeeTasks");
      employeeTasksTableBody.innerHTML = ""; // Clear the current table data
  
      employeeTasksData.forEach((task) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${task.title}</td>
          <td>${task.description}</td>
          <td>${task.timeSpent}</td>
          <td>${task.status}</td>
        `;
        employeeTasksTableBody.appendChild(row);
      });
    }
  
    // Function to setup Employer View
    function setupEmployerView() {
      welcomeMessage.textContent = "Welcome, Employer!";
      employerView.classList.remove("hidden");
      employeeView.classList.add("hidden");
      backButton.classList.remove("hidden"); // Show the back button
      renderProductivityTable();
    }
  
    // Function to setup Employee View
    function setupEmployeeView() {
      welcomeMessage.textContent = "Welcome, Employee!";
      employeeView.classList.remove("hidden");
      employerView.classList.add("hidden");
      backButton.classList.remove("hidden"); // Show the back button
      renderEmployeeTasks();
    }
  
    // Handle Back Button
    function goBack() {
      roleSelectionSection.classList.remove("hidden");
      contentSection.classList.add("hidden");
      backButton.classList.add("hidden"); // Hide the back button again
    }
  
    // Event Listeners for role selection
    employerButton.addEventListener("click", () => {
      roleSelectionSection.classList.add("hidden");
      contentSection.classList.remove("hidden");
      setupEmployerView();
    });
  
    employeeButton.addEventListener("click", () => {
      roleSelectionSection.classList.add("hidden");
      contentSection.classList.remove("hidden");
      setupEmployeeView();
    });
  
    // Event listener for back button
    backButton.addEventListener("click", goBack);
  });
  
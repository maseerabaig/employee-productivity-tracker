// DOM Elements
const taskLogBtn = document.getElementById("taskLogBtn");
const dashboardBtn = document.getElementById("dashboardBtn");
const taskLog = document.getElementById("taskLog");
const dashboard = document.getElementById("dashboard");
const taskForm = document.getElementById("taskForm");
const taskTimeline = document.getElementById("taskTimeline");
const taskTable = document
  .getElementById("taskTable")
  .getElementsByTagName("tbody")[0];
const filterType = document.getElementById("filterType");
const filterPriority = document.getElementById("filterPriority");
const generateReportBtn = document.getElementById("generateReportBtn");

// Task array to store logged tasks
let tasks = [];

// Event Listeners
taskLogBtn.addEventListener("click", showTaskLog);
dashboardBtn.addEventListener("click", showDashboard);
taskForm.addEventListener("submit", logTask);
filterType.addEventListener("change", updateTaskTable);
filterPriority.addEventListener("change", updateTaskTable);
generateReportBtn.addEventListener("click", generateReport);

// Functions
function showTaskLog() {
  taskLog.classList.add("active");
  dashboard.classList.remove("active");
}


function showDashboard() {
  dashboard.classList.add("active");
  taskLog.classList.remove("active");
  updateDashboard();
}

function logTask(e) {
  e.preventDefault();
  const task = {
    title: document.getElementById("taskTitle").value,
    description: document.getElementById("taskDescription").value,
    timeSpent: parseInt(document.getElementById("timeSpent").value),
    priority: document.getElementById("taskPriority").value,
    category: document.getElementById("taskCategory").value,
    reference: document.getElementById("taskReference").value,
    timestamp: new Date().toISOString(),
  };
  tasks.push(task);
  updateTaskTimeline();
  updateDashboard();
  taskForm.reset();
}

function updateTaskTimeline() {
  taskTimeline.innerHTML = "";
  tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Time Spent: ${task.timeSpent} minutes</p>
            <p>Priority: ${task.priority}</p>
            <p>Category: ${task.category}</p>
            <p>Reference: ${task.reference}</p>
            <p>Logged: ${new Date(task.timestamp).toLocaleString()}</p>
        `;
    taskTimeline.appendChild(taskElement);
  });
}

function updateDashboard() {
  updateTaskTable();
  updateProductivityChart();
  updateTaskBreakdown();
}

function updateTaskTable() {
  taskTable.innerHTML = "";
  const filteredTasks = tasks.filter((task) => {
    const typeMatch = filterType.value
      ? task.category === filterType.value
      : true;
    const priorityMatch = filterPriority.value
      ? task.priority === filterPriority.value
      : true;
    return typeMatch && priorityMatch;
  });

  filteredTasks.forEach((task) => {
    const row = taskTable.insertRow();
    row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.timeSpent}</td>
            <td>${task.priority}</td>
            <td>${task.category}</td>
            <td>${task.reference}</td>
        `;
  });
}

function updateProductivityChart() {
  const ctx = document.getElementById("productivityChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: tasks.map((task) =>
        new Date(task.timestamp).toLocaleDateString()
      ),
      datasets: [
        {
          label: "Productivity (minutes)",
          data: tasks.map((task) => task.timeSpent),
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

const leaderboardBtn = document.getElementById("leaderboardBtn");

leaderboardBtn.addEventListener("click", openLeaderboard);

function openLeaderboard() {
  window.location.href = "../Gamification/index.html"; // Path to the leaderboard file
}



function updateTaskBreakdown() {
  const ctx = document.getElementById("taskBreakdown").getContext("2d");
  const categories = ["BAU", "Ad Hoc", "Project-Based"];
  const categoryCounts = categories.map(
    (category) => tasks.filter((task) => task.category === category).length
  );

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: categories,
      datasets: [
        {
          data: categoryCounts,
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Task Breakdown by Category",
        },
      },
    },
  });
}

function generateReport() {
  const reportData = tasks.map((task) => ({
    Title: task.title,
    Description: task.description,
    "Time Spent (minutes)": task.timeSpent,
    Priority: task.priority,
    Category: task.category,
    Reference: task.reference,
    Logged: new Date(task.timestamp).toLocaleString(),
  }));

  // Convert reportData to CSV or any desired format and trigger download
  const csvContent =
    "data:text/csv;charset=utf-8," +
    reportData.map((e) => Object.values(e).join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "task_report.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Initialize the app
showTaskLog();




// notifications.js

// Import necessary functions from the existing app


// Change the path here to and get the tasks array from Tikesh home page index.js file(also adjust the path accordingly - for testing)
import { tasks } from './path-to-existing-folder/index.js'; 

// Function to calculate performance score based on tasks
function calculatePerformance() {
  const performance = tasks.map(task => {
    // For simplicity, we're using the total time spent as a performance indicator
    return task.timeSpent;
  });

  const averagePerformance = performance.reduce((sum, time) => sum + time, 0) / performance.length;

  return averagePerformance;
}

// Function to send productivity alerts
function sendProductivityAlerts() {
  const lowPerformers = tasks.filter(task => task.timeSpent < 30); // Tasks with less than 30 minutes are considered low performance
  const highPerformers = tasks.filter(task => task.timeSpent >= 90); // Tasks with more than 90 minutes are considered high performance
  
  lowPerformers.forEach(task => {
    sendNotification(task, "low");
  });

  highPerformers.forEach(task => {
    sendNotification(task, "high");
  });
}

// Function to send a notification
function sendNotification(task, performanceType) {
  const taskOwner = task.reference || "Unknown Employee"; // You can use employee reference for personalization
  const message = performanceType === "low" 
    ? `Hello ${taskOwner}, your performance in the task "${task.title}" was below average. Consider allocating more time or ask for help!`
    : `Great job ${taskOwner}! Keep up the excellent work on the task "${task.title}". You're performing at a high level!`;

  console.log(`Notification for ${taskOwner}: ${message}`);
  // Here, you can replace the console log with an actual notification system like browser push notifications or email
}

// Function to send deadline reminders (assuming we add a "deadline" field to each task)
function sendDeadlineReminders() {
  const today = new Date();
  tasks.forEach(task => {
    const deadline = new Date(task.deadline);
    const timeDiff = deadline - today;
    if (timeDiff < 0) {
      console.log(`Task "${task.title}" is overdue. Please complete it as soon as possible.`);
    } else if (timeDiff < 86400000) { // 1 day in milliseconds
      console.log(`Reminder: Task "${task.title}" is due tomorrow!`);
    }
  });
}

// Function to check and send all necessary notifications
function checkNotifications() {
  sendProductivityAlerts();
  sendDeadlineReminders();
}

// Set an interval to check for notifications every hour (3600000 ms)
setInterval(checkNotifications, 3600000); // Checks once every hour

// Export functions to use in the main app
export { sendProductivityAlerts, sendDeadlineReminders, checkNotifications };

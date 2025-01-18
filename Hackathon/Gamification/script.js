const reportData = [
    { name: 'John Doe', tasksCompleted: 35 },
    { name: 'Jane Smith', tasksCompleted: 28 },
    { name: 'Alex Johnson', tasksCompleted: 18 },
    { name: 'Emily Davis', tasksCompleted: 50 },
    { name: 'Michael Brown', tasksCompleted: 22 }
];

const predefinedChallenges = [
    { name: 'Complete 50 Tasks This Month', goal: 'Complete 50 tasks as a team', reward: 'Team Badge' },
    { name: 'Complete 10 Ad Hoc Tasks This Week', goal: 'Complete 10 ad hoc tasks', reward: 'Bonus Points' },
    { name: 'Achieve 100% Task Completion', goal: 'Finish all assigned tasks this month', reward: 'VIP Access' },
];

function renderLeaderboard() {
    const leaderboardTableBody = document.querySelector('#leaderboardTable tbody');
    leaderboardTableBody.innerHTML = ''; // Clear the current leaderboard

    reportData.sort((a, b) => b.tasksCompleted - a.tasksCompleted);

    reportData.forEach((employee, index) => {
        const row = document.createElement('tr');
        let rewardIcon = '';

        if (index === 0) {
            rewardIcon = '🥇'; // Gold medal emoji for the top performer
        } else if (index === 1) {
            rewardIcon = '🥈'; // Silver medal emoji for second place
        } else if (index === 2) {
            rewardIcon = '🥉'; // Bronze medal emoji for third place
        }

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${employee.name}</td>
            <td>${employee.tasksCompleted}</td>
            <td>${rewardIcon}</td>
        `;
        leaderboardTableBody.appendChild(row);
    });
}

function renderChallenges() {
    const challengeList = document.getElementById('challengeList');
    challengeList.innerHTML = '';

    predefinedChallenges.forEach((challenge) => {
        const challengeItem = document.createElement('div');
        challengeItem.classList.add('challenge');
        challengeItem.innerHTML = `
            <h4>${challenge.name}</h4>
            <p><strong>Goal:</strong> ${challenge.goal}</p>
            <p><strong>Reward:</strong> ${challenge.reward}</p>
        `;
        challengeList.appendChild(challengeItem);
    });
}

renderLeaderboard();
renderChallenges();

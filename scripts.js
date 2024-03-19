// Function to fetch Codeforces submissions
function fetchCodeforcesSubmissions(handle) {
    fetch(`https://codeforces.com/api/user.status?handle=${handle}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'OK') {
                displaySubmissions(data.result, 'codeforces-submissions-container');
            } else {
                console.error('Failed to fetch Codeforces submissions:', data.comment);
            }
        })
        .catch(error => console.error('Error fetching Codeforces submissions:', error));
}

// Function to display Codeforces submissions
function displaySubmissions(submissions, containerId) {
    const submissionsContainer = document.getElementById(containerId);
    for (let i = 0; i < Math.min(submissions.length, 10); i++) {
        // Convert Unix timestamp to human-readable date
        const submissionDate = new Date(submissions[i].creationTimeSeconds * 1000).toLocaleString();

        const submissionElement = document.createElement('div');
        submissionElement.classList.add('submission');
        submissionElement.innerHTML = `
            <span class="submission-id">${submissions[i].id}</span>
            <span class="submission-problem">${submissions[i].problem.name}</span>
            <span class="submission-verdict">${submissions[i].verdict}</span>
            <span class="submission-date">${submissionDate}</span> 
        `;
        submissionsContainer.appendChild(submissionElement);
    }
}

// LeetCode Stats API endpoint
const leetCodeStatsEndpoint = `https://leetcode-stats-api.herokuapp.com/abibyte`;

// Fetch LeetCode stats
fetch(leetCodeStatsEndpoint)
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            displayLeetCodeStats(data);
        } else {
            console.error('Failed to fetch LeetCode stats:', data.message);
        }
    })
    .catch(error => console.error('Error fetching LeetCode stats:', error));

// Function to display LeetCode stats
function displayLeetCodeStats(stats) {
    const leetCodeStatsContainer = document.getElementById('leetcode-submissions-container');
    leetCodeStatsContainer.innerHTML = `
        <p>Total Solved: ${stats.totalSolved}</p>
        <p>Total Questions: ${stats.totalQuestions}</p>
        <p>Easy Solved: ${stats.easySolved} / Total Easy: ${stats.totalEasy}</p>
        <p>Medium Solved: ${stats.mediumSolved} / Total Medium: ${stats.totalMedium}</p>
        <p>Hard Solved: ${stats.hardSolved} / Total Hard: ${stats.totalHard}</p>
        <p>Acceptance Rate: ${stats.acceptanceRate}%</p>
        <p>Ranking: ${stats.ranking}</p>
        <p>Contribution Points: ${stats.contributionPoints}</p>
        <p>Reputation: ${stats.reputation}</p>
    `;
}

// Fetch Codeforces submissions
fetchCodeforcesSubmissions('abinashlingank');

// // Fetch LeetCode data
// fetchLeetCodeData('abinashlingank');

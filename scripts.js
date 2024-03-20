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
    const today = new Date();
    today.setHours(0, 0, 0, 0); // set to start of today

    submissions = submissions.filter(submission => {
        const submissionDate = new Date(submission.creationTimeSeconds * 1000);
        return submissionDate >= today;
    });

    for (let i = 0; i < submissions.length; i++) {
        // Convert Unix timestamp to human-readable date
        const submissionDate = new Date(submissions[i].creationTimeSeconds * 1000).toLocaleString();

        const submissionElement = document.createElement('div');
        submissionElement.classList.add('submission');
        submissionElement.innerHTML = `
            <span class="submission-id">${submissionDate}</span> 
            <span class="submission-verdict">${submissions[i].verdict}</span><br>
            <span class="submission-problem">${submissions[i].problem.name}</span>
        `;
        submissionsContainer.appendChild(submissionElement);
    }
}

// Function to fetch LeetCode stats and submissions
function fetchLeetCodeData(username) {
    fetch(`https://stats-server-one.vercel.app/user-profile/${username}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.allQuestionsCount) {
                // displayLeetCodeStats(data, 'leetcode-stats-container');
                displayRecentSubmissions(data.recentSubmissionList, 'leetcode-submissions-container');
            } else {
                console.error('Failed to fetch LeetCode data:', data);
            }
        })
        .catch(error => console.error('Error fetching LeetCode data:', error));
}

// Function to display LeetCode stats
function displayLeetCodeStats(data) {
    const leetCodeStatsContainer = document.getElementById('leetcode-stats-container');
    if (data && data.acSubmissionNum) {
        const solvedCount = data.acSubmissionNum.reduce((total, item) => total + item.count, 0);
        leetCodeStatsContainer.innerHTML = `
            <p>Total Solved: ${solvedCount}</p>
            <p>Total Questions: ${data.totalSubmissionNum.find(item => item.difficulty === 'All').count}</p>
            <p>Easy Solved: ${data.acSubmissionNum.find(item => item.difficulty === 'Easy').count} / Total Easy: ${data.totalSubmissionNum.find(item => item.difficulty === 'Easy').count}</p>
            <p>Medium Solved: ${data.acSubmissionNum.find(item => item.difficulty === 'Medium').count} / Total Medium: ${data.totalSubmissionNum.find(item => item.difficulty === 'Medium').count}</p>
            <p>Hard Solved: ${data.acSubmissionNum.find(item => item.difficulty === 'Hard').count} / Total Hard: ${data.totalSubmissionNum.find(item => item.difficulty === 'Hard').count}</p>
            <p>Ranking: ${data.matchedUser.profile.ranking}</p>
            <p>Reputation: ${data.matchedUser.profile.reputation}</p>
        `;
    } else {
        leetCodeStatsContainer.innerHTML = '<p>LeetCode stats not available</p>';
    }
}

// Function to fetch LeetCode data
function fetchLeetCodeStats(username) {
    // LeetCode Stats API endpoint
    const leetCodeStatsEndpoint = `https://leetcode-stats-api.herokuapp.com/${username}`;

    // Fetch LeetCode stats
    fetch(leetCodeStatsEndpoint)
        .then(response => response.json())
        .then(data => {
            displayLeetCodeStats(data, 'leetcode-stats-container');
        })
        .catch(error => console.error('Error fetching LeetCode stats:', error));
}

// Function to display LeetCode status
function displayLeetCodeStats(stats, containerId) {
    const leetCodeStatsContainer = document.getElementById(containerId);
    leetCodeStatsContainer.innerHTML = `
        <p>Total Solved: ${stats.totalSolved} / Total Questions: ${stats.totalQuestions}</p>    
        <p>Easy Solved: ${stats.easySolved} / Total Easy: ${stats.totalEasy}</p>
        <p>Medium Solved: ${stats.mediumSolved} / Total Medium: ${stats.totalMedium}</p>
        <p>Hard Solved: ${stats.hardSolved} / Total Hard: ${stats.totalHard}</p>
        <!--<p>Ranking: ${stats.ranking}</p>-->
        <!--<p>Acceptance Rate: ${stats.acceptanceRate}%</p>
        <p>Contribution Points: ${stats.contributionPoints}</p>
        <p>Reputation: ${stats.reputation}</p>-->
    `;
}

// Function to display recent submissions
function displayRecentSubmissions(submissions, containerId) {
    const submissionsContainer = document.getElementById(containerId);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // set to start of today

    submissions = submissions.filter(submission => {
        const submissionDate = new Date(parseInt(submission.timestamp) * 1000);
        return submissionDate >= today;
    });

    for (let i = 0; i < submissions.length; i++) {
        const submission = submissions[i];
        const submissionElement = document.createElement('div');
        submissionElement.classList.add('submission');
        submissionElement.innerHTML = `
            <span class="submission-id">${new Date(parseInt(submission.timestamp) * 1000).toLocaleString()}</span>
            <span class="submission-verdict">${submission.statusDisplay}</span><br>
            <span class="submission-problem">${submission.title}</span>
        `;
        submissionsContainer.appendChild(submissionElement);
    }
}

// Fetch LeetCode data on page load
fetchLeetCodeData('abibyte');

fetchLeetCodeStats('abibyte');

// Fetch Codeforces submissions
fetchCodeforcesSubmissions('abinashlingank');

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

// Function to fetch LeetCode data
function fetchLeetCodeData(username) {
    // LeetCode Stats API endpoint
    const leetCodeStatsEndpoint = `https://alfa-leetcode-api.onrender.com/${username}/acSubmission`;

    // Fetch LeetCode submissions
    fetch(leetCodeStatsEndpoint)
        .then(response => response.json())
        .then(data => {
            if (data.count > 0) {
                displayLeetCodeSubmissions(data.submission, 'leetcode-submissions-container');
            } else {
                console.error('No LeetCode submissions found for the user:', username);
            }
        })
        .catch(error => console.error('Error fetching LeetCode submissions:', error));
}

// Function to display LeetCode submissions
function displayLeetCodeSubmissions(submissions, containerId) {
    const submissionsContainer = document.getElementById(containerId);
    for (let i = 0; i < Math.min(submissions.length, 10); i++) {
        // Convert Unix timestamp to human-readable date
        const submissionDate = new Date(parseInt(submissions[i].timestamp) * 1000).toLocaleString();

        const submissionElement = document.createElement('div');
        submissionElement.classList.add('submission');
        submissionElement.innerHTML = `
            <span class="submission-title">${submissions[i].title}</span>
            <span class="submission-status">${submissions[i].statusDisplay}</span>
            <span class="submission-date">${submissionDate}</span> 
        `;
        submissionsContainer.appendChild(submissionElement);
    }
}

// Fetch Codeforces submissions
fetchCodeforcesSubmissions('abinashlingank');

// Fetch LeetCode data
fetchLeetCodeData('abinashlingank');

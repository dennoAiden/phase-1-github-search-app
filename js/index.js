document.addEventListener('DOMContentLoaded', () => {
    const githubForm = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');

    githubForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchValue = event.target.search.value;
        searchGithubUsers(searchValue);
    });

    function searchGithubUsers(query) {
        fetch(`https://api.github.com/search/users?q=${query}`)
            .then(response => response.json())
            .then(data => {
                displayUsers(data.items);
            })
            .catch(error => console.error('Error fetching users:', error));
    }

    function displayUsers(users) {
        userList.innerHTML = ''; // Clear previous results
        users.forEach(user => {
            const userItem = document.createElement('li');
            userItem.innerHTML = `
                <img src="${user.avatar_url}" alt="${user.login}" width="50">
                <a href="${user.html_url}" target="_blank">${user.login}</a>
            `;
            userItem.addEventListener('click', () => {
                fetchUserRepos(user.login);
            });
            userList.appendChild(userItem);
        });
    }

    function fetchUserRepos(username) {
        fetch(`https://api.github.com/users/${username}/repos`)
            .then(response => response.json())
            .then(data => {
                displayRepos(data);
            })
            .catch(error => console.error('Error fetching repos:', error));
    }

    function displayRepos(repos) {
        reposList.innerHTML = ''; // Clear previous results
        repos.forEach(repo => {
            const repoItem = document.createElement('li');
            repoItem.textContent = repo.name;
            reposList.appendChild(repoItem);
        });
    }
});

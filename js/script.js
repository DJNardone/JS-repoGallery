// displays profile information
const profileInfo = document.querySelector(".overview");
// displays repo title list
const repoList = document.querySelector(".repo-list");
// UI for repo title list
const classRepos = document.querySelector(".repos");
// displays individual repo data
const displayRepoData = document.querySelector(".repo-data");
// back to repo gallery button
const backButton = document.querySelector(".view-repos");
// input for search bar
const filterInput = document.querySelector(".filter-repos")
// GitHub username 
const username = "djnardone";

// API fetch for GitHub user profile
const getProfile = async function () {
    const res = await fetch (
        `https://api.github.com/users/${username}`
    );
    const data = await res.json();
    //console.log(data);
    showUserInfo(data);
};

getProfile();

// displays user profile info
const showUserInfo = function (data) {
        const imageUrl = data.avatar_url;
        const name = data.name;
        const bio = data.bio;
        const location = data.location;
        const numRepos = data.public_repos;

        let userDiv = document.createElement("div");
        userDiv.classList.add("user-info");
        userDiv.innerHTML = `
            <figure>
                <img alt="user avatar" src=${imageUrl} />
            </figure>
            <div>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Bio:</strong> ${bio}</p>
                <p><strong>Location:</strong> ${location}</p>
                <p><strong>Number of public repos:</strong> ${numRepos}</p>
            </div>`;
            
        profileInfo.append(userDiv);
};

// API fetch for repo list
const getRepos = async function () {
    const res = await fetch (
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    );
    const repoData = await res.json();
    //console.log(repoData);
    showRepoInfo(repoData);
};

getRepos();

// displays list of repos as titled/clickable buttons
const showRepoInfo = function (repos) {
    filterInput.classList.remove("hide");
    for (let result of repos) {
        const showRepoName = result.full_name;
        let li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `
            <h3>${showRepoName}</h3>`;
        repoList.append(li);
    };
};

// event handler for repo title buttons
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        let repoName = e.target.innerText;
        //console.log(repoName);
        getRepoInfo(repoName);
    };
});

// API fetch for repo info when title button is clicked
const getRepoInfo = async function (repoName) {
    const res = await fetch (
        `https://api.github.com/repos/${repoName}`
    );
    const repoInfo = await res.json();
    //console.log(repoInfo);
    const fetchLanguages = await fetch (
        `https://api.github.com/repos/${repoName}/languages`
    );
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    const languages = [];
        for (let key in languageData) {
            languages.push(key);
            //console.log(languages);
        };    
    highlightRepoInfo(repoInfo, languages);
};

// displays specific info when repo-title button is clicked
const highlightRepoInfo = function (repoInfo, languages) {
    displayRepoData.innerHTML = "";
    const infoDiv = document.createElement("div");
    infoDiv.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
        `;
    displayRepoData.append(infoDiv);
    displayRepoData.classList.remove("hide");
    classRepos.classList.add("hide");
    backButton.classList.remove("hide");
};

backButton.addEventListener("click", function () {
    classRepos.classList.remove("hide");
    displayRepoData.classList.add("hide");
    backButton.classList.add("hide");
});

filterInput.addEventListener("input", function(e) {
    let searchValue = e.target.value;
    //console.log(searchValue);
    const repos = document.querySelectorAll(".repo");
    const searchLowerValue = searchValue.toLowerCase();
    for (let repo of repos) {
        const repoLower = repo.innerText.toLowerCase();
        if (repoLower.includes(searchLowerValue)) {
            repo.classList.remove("hide");
        }   else {
            repo.classList.add("hide");
        }
    }
});
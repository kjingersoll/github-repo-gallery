const profile = document.querySelector(".overview");
const reposList = document.querySelector(".repo-list");
const repos = document.querySelector(".repos");
const reposData = document.querySelector(".repo-data");
const showReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");
const username = "kjingersoll";

const getUser = async function () {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();
  displayUser(data);
};

const displayUser = function (data) {
  const userInfo = document.createElement("div");
  userInfo.classList.add("user-info");
  userInfo.innerHTML = `<figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>` ;
  profile.append(userInfo);
};

getUser();

const getRepos = async function () {
  const repos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const reposData = await repos.json();
  displayRepos(reposData);
  filterInput.classList.remove("hide");
};

const displayRepos = function (repos) {
  for (let item of repos) {
    const repoInfo = document.createElement("li");
    repoInfo.classList.add("repo");
    repoInfo.innerHTML = `<h3>${item.name}</h3>`;
    reposList.append(repoInfo);
  }
};

getRepos();

reposList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    let repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

const getRepoInfo = async function (repoName) {
  const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await res.json();
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languagesData = await fetchLanguages.json();
  const languages = [];
  for (const language in languagesData) {
    languages.push(language);
  };
  displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
  reposData.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a> `;
  reposData.append(div);
  reposData.classList.remove("hide");
  repos.classList.add("hide");
  showReposButton.classList.remove("hide");
};

showReposButton.addEventListener("click", function() {
  repos.classList.remove("hide");
  reposData.classList.add("hide");
  showReposButton.classList.add("hide");
});

filterInput.addEventListener("input", function(e) {
  let inputText = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const searchLower = inputText.toLowerCase();
  for (let repo of repos) {
    const repoLower = repo.innerText.toLowerCase();
    if (repoLower.includes(searchLower)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});

const profile = document.querySelector(".overview");
const reposList = document.querySelector(".repo-list");
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

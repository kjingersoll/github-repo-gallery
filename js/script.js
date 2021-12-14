const profile = document.querySelector(".overview");
const username = "kjingersoll";

const getGitHub = async function () {
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

getGitHub();

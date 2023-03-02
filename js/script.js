// displays profile information
const profileInfo = document.querySelector(".overview");
// GitHub username 
const username = "djnardone";

const getProfile = async function () {
    const res = await fetch (
        `https://api.github.com/users/${username}`
    );
    const data = await res.json();
    //console.log(data);
    showUserInfo(data);
};

getProfile();

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
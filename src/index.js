const usersUrl = "https://jsonplaceholder.typicode.com/users";
const postsUrl = "https://jsonplaceholder.typicode.com/posts";

const usersDisplay = document.querySelector("#userDataDisplay");
const modal = document.getElementById("myModal");
const modalContent = document.getElementById("modalContent");
const span = document.getElementsByClassName("close")[0];

const getUsers = async () => {
  try {
    await fetch(usersUrl)
      .then((response) => response.json())
      .then((data) => {
        const allUsers = data;
        allUsers.forEach((user) => {
          const usersData = `<td id = ${user.id}>${user.id}</td>
                    <td style="padding-left: 30px">${user.name}
                        <button style="float: right; margin-right: 40px; background-color: azure; border: 1px solid black; width: 80px; border-radius: 10px; cursor: pointer"id = ${user.id} onclick="getPosts(this.id)">Posts</button>
                    </td>`;
          usersDisplay.insertAdjacentHTML("beforebegin", usersData);
        });
      });
  } catch (error) {
    console.log(error);
  }
};

const getPosts = async (clickedId) => {
  await fetch(postsUrl)
    .then((response) => response.json())
    .then((data) => {
      const allPosts = data;
      allPosts.forEach((post) => {
        if (clickedId == post.userId) {
          modal.style.display = "block";
          span.onclick = function () {
            modal.style.display = "none";
            window.location.reload();
          };
          window.onclick = function (event) {
            if (event.target == modal) {
              modal.style.display = "none";
              window.location.reload();
            }
          };

          const individualPosts = `<h2>${post.title}</h2><p>${post.body}</p>`;
          modalContent.insertAdjacentHTML("beforebegin", individualPosts);
          console.log(clickedId);
          console.log(post.userId);
        }
      });
    });
};

getUsers();
getPosts();

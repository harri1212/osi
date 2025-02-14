document.addEventListener("DOMContentLoaded", () => {
    const postButton = document.getElementById("postButton");
    const postContent = document.getElementById("postContent");
    const postsContainer = document.getElementById("posts");
    const trendContainer = document.getElementById("trendPosts");
    const tabs = document.querySelectorAll("nav ul li a");
    const sections = document.querySelectorAll(".tab");
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    function savePosts() {
        localStorage.setItem("posts", JSON.stringify(posts));
    }

    function renderPosts() {
        postsContainer.innerHTML = "";
        trendContainer.innerHTML = "";
        posts.sort((a, b) => b.likes - a.likes);
        posts.forEach((post, index) => {
            const postElement = document.createElement("div");
            postElement.className = "post";
            postElement.innerHTML = `
                <p>${post.content}</p>
                <button class="likeButton">❤️ ${post.likes}</button>
                <button class="deleteButton">削除</button>
            `;
            postsContainer.appendChild(postElement);

            if (index < 5) {
                const trendElement = postElement.cloneNode(true);
                trendContainer.appendChild(trendElement);
            }

            postElement.querySelector(".likeButton").addEventListener("click", () => {
                post.likes++;
                savePosts();
                renderPosts();
            });

            postElement.querySelector(".deleteButton").addEventListener("click", () => {
                posts.splice(index, 1);
                savePosts();
                renderPosts();
            });
        });
    }

    postButton.addEventListener("click", () => {
        const content = postContent.value.trim();
        if (content) {
            posts.push({ content, likes: 0 });
            savePosts();
            renderPosts();
            postContent.value = "";
        }
    });

    renderPosts();

    tabs.forEach(tab => {
        tab.addEventListener("click", (e) => {
            e.preventDefault();
            sections.forEach(section => section.classList.remove("active"));
            document.getElementById(tab.dataset.tab).classList.add("active");
        });
    });
});
const repoOwner = "harri1212";
const repoName = "oshi-sns";
const filePath = "posts.json";
const token = "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"; // GitHubのPersonal Access Token

async function getPosts() {
  const url = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${filePath}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("データ取得失敗");
    const data = await response.json();
    return data.posts;
  } catch (error) {
    console.error("投稿データの取得に失敗:", error);
    return [];
  }
}

async function loadPosts() {
  const posts = await getPosts();
  const postContainer = document.getElementById("postContainer");
  postContainer.innerHTML = "";

  posts.forEach(post => {
    const div = document.createElement("div");
    div.textContent = post.content;
    postContainer.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", loadPosts);


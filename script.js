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

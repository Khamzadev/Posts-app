let contentDiv = document.getElementById("content");

const homePage = `
    <div class="container">
      <h1>Post App &#128209;</h1>
      <div id="searchWrapper">
        <input
          type="text"
          name="searchBar"
          id="searchBar"
          placeholder="search post"
        />
      </div>
      <ul id="postList"></ul>
    </div>

    <div id="pagination">
      <ul id="pagesList"></ul>
    </div>`;

const postPage = (post) => {
  return `
    <div class=" post post1">
      <h2>${post[0].title}</h1>
      <p>
        ${post[0].body}
      </p>
    </div>

    <div id="pagination">
      <ul id="pagesList"></ul>
    </div>`;
};

const loadSinglePost = async (postId) => {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?id=${postId}`
    );
    contentDiv.innerHTML = postPage(await res.json());
  } catch (err) {
    console.error(err);
  }
};

window.onpopstate = () => {
  window.location.reload();
};

if (
  (window.location.pathname === "/index.html" && !window.location.hash) ||
  (window.location.pathname === "/" && !window.location.hash)
) {
  contentDiv.innerHTML = homePage;
} else {
  loadSinglePost(window.location.hash.slice(1));
}

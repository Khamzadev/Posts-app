const postList = document.getElementById("postList");
const pagesList = document.getElementById("pagesList");
const searchBar = document.getElementById("searchBar");
const NotFound = document.getElementById("empty");

let hpPosts = [];
let currentPage = 1;
let perPage = 12;

// Фильтрация по поиску
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  if (searchString) {
    const filteredPosts = hpPosts.filter((post) => {
      return (
        post.title.toLowerCase().includes(searchString) &&
        post.body.toLowerCase().includes(searchString)
      );
    });
    displayPosts(filteredPosts);
  } else {
    setPageAndArr(1);
  }
});


// Пагинация и устаноыка первой страницы
const setPageAndArr = (pageNum) => {
  const trimStart = (pageNum - 1) * perPage;
  const trimEnd = trimStart + perPage;
  displayPosts(hpPosts.slice(trimStart, trimEnd));
  currentPage = pageNum;
};

// Загрузка элементов, зарос и установка данных
const loadPost = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    hpPosts = await res.json();
    hpPosts.map((el) => (el.edit = false));
    displayPosts(hpPosts);
    displayPages(hpPosts);
    setPageAndArr(1);
  } catch (err) {
    console.error(err);
  }
};

// Функция вывода на постов DOM
const displayPosts = (posts) => {
  postList.innerHTML = "";
  const htmlString = posts
    .map((post) => {
      return !post.edit
        ? `
            <li class="post">
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <a href="#${post.id}" class="post-link">Подробнее</a >
                <img class="delete-post" onClick="deletePost(${post.id})" src="./delete-bin-line.svg" alt="Trash">
               
                <img class="edit-post" onClick="editPost(${post.id})" src="./pencil-line.svg" alt="Pencil"/>
                
            </li>
        `
        : `
            <li class="post">
                <textarea class="text" type="text" value="${post.title}">${post.title}</textarea>
                <hr/>
                <textarea class="text desc" type="text" value="${post.body}">${post.body}</textarea>
                <button class="back-btn" onClick="editPost(${post.id})">
                  Назад
                </buttom>
            </li>
        `;
    })
    .join("");
  postList.innerHTML = htmlString;
};

//Удаление поста
const deletePost = (id) => {
  hpPosts = hpPosts.filter((el) => el.id != id);
  displayPosts(hpPosts);
  displayPages(hpPosts);
  setPageAndArr(currentPage);
};

//Редактирование поста
const editPost = (id) => {
  hpPosts = hpPosts.map((el) =>
    el.id === id ? { ...el, edit: !el.edit } : el
  );
  displayPosts(hpPosts);
  displayPages(hpPosts);
  setPageAndArr(currentPage);
};

// Функция вывода на страниц DOM
const displayPages = (data) => {
  let totalPages = Math.ceil(data.length / perPage);
  pagesList.innerHTML = "";
  for (let i = 0; i < totalPages; i++) {
    let num = i + 1;
    pagesList.innerHTML += `
            <li id="pageList">
                <button onClick={setPageAndArr(${num})}>${num}</button>
            </li>
        `;
  }
};

loadPost();

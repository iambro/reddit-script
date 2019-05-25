/* VARIABLES */
const postsList = {
  posts: [],
  count: 0
};
let lastDay = false;
let sortBy = "";
let ascendingOrder = true;

/* FUNCTIONS */

fetch("https://www.reddit.com/r/funny.json")
  .then(response => response.json())
  .then(content => {
    content.data.children.map(post => {
      const element = {
        title: post.data.title,
        upvotes: post.data.ups,
        score: post.data.score,
        num_comments: post.data.num_comments,
        created: convertDate(post.data.created)
      };
      postsList.posts.push(element);
    });
    postsList.count = content.data.dist;
    showList(postsList.posts);
    topPost();
  });

function convertDate(el) {
  const timeDifference = 8 * 60 * 60 * 1000;
  const date = new Date(el * 1000 - timeDifference);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hh = ("0" + date.getHours()).slice(-2);
  const mm = ("0" + date.getMinutes()).slice(-2);
  return `${day}.${month}.${year} ${hh}:${mm}`;
}

function createPost(post) {
  const tr = document.createElement("tr");
  Object.keys(post).map(item => {
    const content = document.createTextNode(post[item]);
    const td = document.createElement("td");
    td.appendChild(content);
    tr.appendChild(td);
  });
  document.getElementById("tableBody").appendChild(tr);
}

function deleteList() {
  const tableBody = document.getElementById("tableBody");
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
}

function showList(list) {
  list.map(post => {
    createPost(post);
  });
}

function filter() {
  lastDay = !lastDay;
  if (lastDay) {
    deleteList();
    const filteredList = postsList.posts.filter(
      post => compareDate(post.created) < 24 * 60 * 60 * 1000
    );
    showList(filteredList);
  } else {
    deleteList();
    showList(postsList.posts);
  }
}

function sort(e) {
  e.target === undefined ? (sortBy = e.value) : (sortBy = e.target.value);
  if (sortBy === "created") {
    postsList.posts.sort((a, b) =>
      ascendingOrder
        ? compareDate(b[sortBy]) > compareDate(a[sortBy])
          ? 1
          : -1
        : compareDate(b[sortBy]) < compareDate(a[sortBy])
        ? 1
        : -1
    );
  } else {
    postsList.posts.sort((a, b) =>
      ascendingOrder
        ? a[sortBy] > b[sortBy]
          ? 1
          : -1
        : a[sortBy] < b[sortBy]
        ? 1
        : -1
    );
  }
  deleteList();
  showList(postsList.posts);
}

function order() {
  ascendingOrder = !ascendingOrder;
  sort(document.getElementById("sort-input"));
}

function compareDate(date) {
  const s = date.split(/\D/);
  const properDate = new Date(s[2], s[1] - 1, s[0], s[3], s[4]);
  const currentDate = new Date();
  return +currentDate - +properDate;
}

function topPost(){
  const maxArr = postsList.posts.map(post => (post.upvotes/post.num_comments))
  const index = maxArr.indexOf(Math.max(...maxArr));
  const content = `${postsList.posts[index].title} [${Math.round(maxArr[index]*100)/100}]`
  const h = document.createElement('H1');
  const text = document.createTextNode(content);
  h.appendChild(text);
  document.getElementById("top-post").appendChild(h);
}

/* LISTENERS */

document.getElementById("filter-input").addEventListener("change", filter);
document.getElementById("sort-input").addEventListener("change", sort);
document.getElementById("order-btn").addEventListener("click", order);

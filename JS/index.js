const postsList = {
  posts: [],
  count: 0
};

let lastDay = false;
let sortBy = "";
let ascendingOrder = true;

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
    showList(postsList);
  });

function convertDate(el) {
  const date = new Date(el * 1000);
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
  list.posts.map(post => {
    createPost(post);
  });
}

function sort(e) {
  postsList.posts.filter(post => console.log(post.score));
}

function filter() {
  lastDay = !lastDay;

  if (lastDay) {
    deleteList();
    showList(dupa);
  } else {
    deleteList();
    showList(postsList);
  }
}

function order() {
  console.log("order");
}

document.getElementById("filter-input").addEventListener("change", filter);
document.getElementById("sort-input").addEventListener("change", sort);
document.getElementById("order-btn").addEventListener("click", order);

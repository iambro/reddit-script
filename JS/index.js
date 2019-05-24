const postsList = {
  posts: [],
  count: 0
};

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
  });

function convertDate(el) {
  const date = new Date();
  const year = date.getFullYear(el);
  const month = ("0" + (date.getMonth(el) + 1)).slice(-2);
  const day = ("0" + date.getDay(el)).slice(-2);
  const hh = ("0" + date.getHours(el)).slice(-2);
  const mm = ("0" + date.getMinutes(el)).slice(-2);
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

function showList() {
  postsList.posts.map(post => {
    createPost(post);
  });
}

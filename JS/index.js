let postsList = {
  posts: [],
  count: 0
};

function convertDate(el) {
  const date = new Date();
  const year = date.getFullYear(el);
  const month = ("0" + (date.getMonth(el) + 1)).slice(-2);
  const day = ("0" + date.getDay(el)).slice(-2);
  const hh = ("0" + date.getHours(el)).slice(-2);
  const mm = ("0" + date.getMinutes(el)).slice(-2);
  return `${day}.${month}.${year} ${hh}:${mm}`;
}

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

//   {
//     "posts": [
//         {
//             "title": "put title here",
//             "upvotes": 1234,
//             "score": 1000,
//             "num_comments": 100,
//             "created": "16.05.2019 12:12",
//         },
//         ...
//     ],
//     "count": 10
//     }

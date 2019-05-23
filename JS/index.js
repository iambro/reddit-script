const post = "data.children[1].data.title";

let postsObject = {
  posts: [],
  count: 0
};

function convertDate(x) {
  const year = x.getFullYear();
  const month = x.getMonth();
  const day = x.getDay();
  return `${year}-${month}-${day}`;
}

fetch("https://www.reddit.com/r/funny.json")
  .then(response => response.json())
  .then(content => {
    content.data.children.map(post => {
      const date = new Date(post.data.created);
      const element = {
        title: post.data.title,
        upvotes: post.data.ups,
        score: post.data.score,
        num_comments: post.data.num_comments,
        created: convertDate(date)
      };
      postsObject.posts.push(element);
    });
    postsObject.count = content.data.dist;
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

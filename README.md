# Reddit script
Recruitment task

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Live page](#live-page)

## General info
This project is a recruitment task. An application is using Reddit API and allows to filetr and sort posts list from https://www.reddit.com/r/funny.json/

Functionality: 
* The data are fetched on page load.
* The default order of list of posts is as original.
* All data are stored in object "postsList". "posts" array contains all posts. "count" property shows number of posts.
* An article below header shows the title of the post with the highest ratio of upvotes to number of comments. Number in brackets is the ratio. If there are several posts with the same ratio, the latest one is displayed.
* Header contains 3 inputs:
    * Sort - allows to sort list by one of parameter: number of comments, upvotes, score or date.
    * Order - allows to change order between ascending and descending. The default is ascending.
    * Filter - allows to filter the list of posts to show results from last 24h only.
* The above functions can work simultaneously.


## Technologies
Project is created with:
* HTML5
* CSS3 (SASS)
* JavaScript

## Live page
https://iambro.github.io/reddit-script/

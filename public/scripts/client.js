const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// const renderTweets = function(tweets) {
// // loops through tweets
// // calls createTweetElement for each tweet
// // takes return value and appends it to the tweets container
// for (let tweet of tweets) {
//  $(".feed").append(createTweetElement(tweet));
//   }
// }

const createTweetElement = function(tweet) {

  const { user, content, created_at } = tweet;
  date = new Date(created_at).toUTCString();
  
  let existingTweet = `
  <article class="existing-tweet">
    <div class="existing-tweet-top">
      <img ${user.avatars} /> 
      <p>${user.name}</p>
      <p class="push">${user.handle}</p>
    </div>
    <div class="tweet-body">
      <p>
        ${content.text}
      </p>
    </div>
    <footer class="existing-tweet-bottom">
      <p>
        10 days
      </p> 
    </footer> `;
    return existingTweet;
}

$(document).ready(function() {
  renderTweets(data);
})

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let tweet of tweets) {
   $(".feed").append(createTweetElement(tweet));
  }
}


$(document).ready(function() {
$(".new-tweet form").submit(function(event) {
  event.preventDefault();
  const $data = $(this).serialize()
  console.log($(this).value);
  if ($(".textarea").val() === "" || $(".textarea").val() === null || $(".textarea").val() === undefined ||$(".textarea").val().length > 140){
    alert("Error");
    return;
  } 
  $.ajax({
    type: 'POST',
    url: "/tweets",
    data: $data,
    dataType: JSON,
    success: loadTweets()
  })
  // .done(function(data) {
  //   loadTweets();
  // })
});
});

const loadTweets = function () {
  $.ajax( "/tweets", {
    method: "GET"
  })
  .then(response => {
    renderTweets(response);
  })
};

loadTweets();



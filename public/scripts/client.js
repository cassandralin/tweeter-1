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

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function(tweet) {

  const { user, content, created_at } = tweet;
  date = new Date(created_at).toUTCString();
  
  let existingTweet = `
  <article class="existing-tweet">
    <div class="existing-tweet-top">
      <img ${escape(user.avatars)} /> 
      <p>${escape(user.name)}</p>
      <p class="push">${escape(user.handle)}</p>
    </div>
    <div class="tweet-body">
      <p>
        ${escape(content.text)}
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
  for (let tweet of tweets) {
   $(".feed").append(createTweetElement(tweet));
  }
}

$(document).ready(function() {
  $(".toggle").click(function() { // if clicked 
    $(".new-tweet").slideToggle();
  })
  $(".error").hide();
  $(".errorTwo").hide();
  $(".new-tweet form").submit(function(event) {
    event.preventDefault();
    const $data = $(this).serialize()
    if ($data.slice(5) === "" || $data.slice(5) === null) {
      $(".error").slideDown();
      return;
    } else if (data.slice(5).length > 140) {
      $(".errorTwo").slideDown();
      return;
    } else {
    $(".error").slideUp();
    $(".errorTwo").slideUp();
    $.ajax({
      type: 'POST',
      url: "/tweets",
      data: $data,
      dataType: JSON,
      success: loadTweets()
    })}
  });
  });

const loadTweets = function () {
  $.ajax( "/tweets", {
    method: "GET"
  })
  .then(response => {
    $(".feed").empty();
    renderTweets(response);
  })
};

loadTweets();



<<<<<<< HEAD
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

=======
>>>>>>> 1d091a97ecabc98b7f3a22409192330ff0c1bfcd


const escape = (str) => {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = (tweetData) => {
  const { name, avatar, handle } = tweetData.user;
  const { text } = tweetData.content;
  const dateCreated = tweetData.created_at;
  return `<article class="tweet">
            <header>
              <div>
                <img src="${avatar}" />
                <span>${name}</span>
              </div>
              <span class="tweet-handle">${handle}</span>
            </header>
            <section>
              <span class="tweet-text">${escape(text)}</span>
            </section>
            <footer>
              <span>${(dateCreated)}</span>
              <div class="tweet-icons">
                <i class="fas fa-flag"></i>
                <i class="fas fa-retweet"></i>
                <i class="fas fa-heart"></i>
              </div>
            </footer>
          </article>`
 };

const renderTweets = (tweets) => {
  $('#tweets-container').empty();
  for (const tweet of tweets) {
    const tweetElement = createTweetElement(tweet);
    $('#tweets-container').prepend(tweetElement);
  }
}

const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET', dataType: "json" })
  .then(function (result) {
    renderTweets(result);
  });
}

$(document).ready(() => {

  loadTweets();

  const $form = $('#new-tweet-form');
  const $text = $('#tweet-area');

  $form.submit((event) => {

    event.preventDefault();

    if ($text.val().length > 140) {
      $(".error").text("The tweet must be under the character count!");
      return
    } else if (!$text.val()) {
      $(".error").text("Comon, saay sumpin!");
      return
    }

    $.ajax({
      url: '/tweets', 
      method: 'POST',
      data: $form.serialize(),
      success:() => {
        loadTweets();
        $('#counter').text(140);
        $('#tweet-area').val('').focus();
      },
      error: (error) => {
        console.log(error);
      }
    })
  });

  $(".toggle-btn").click(() => {
    $(".new-tweet").slideToggle("slow");
    $(".new-tweet textarea").focus();
  });
  //The new tweet area is hidden until called upon
  $(".new-tweet").hide();
})
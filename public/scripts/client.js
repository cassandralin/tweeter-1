const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// push the tweets to append
const renderTweets = function(tweets) {
  let markupArray = [];

  for (const tweet of tweets) {
    markupArray.push(createTweetElement(tweet));
  }

  let contain = markupArray.reverse().join("");
  $("#tweets-container").prepend(contain);
};

// mockup of the articles to be replaced
const createTweetElement = function(data) {
  const markup = `
  <article class="tweet"> 
  <header class="tweetHeader"> 
    <div class="userInfo">
      <img class="userAvatar" src="${data.user.avatars}">
      <p class="userName"> ${data.user.name} </p>
    </div>
    <p class="handle"> ${data.user.handle}</p>
  </header>
    <div class="actualTweet">
    ${escape(data.content.text)}
    </div>
  <footer>
    <div class="date"> ${moment(data.created_at).fromNow()} </div>
    <div class="icons">     
      <img src="https://image.flaticon.com/icons/svg/2288/2288826.svg" width="20" height="20" align="right">
      <img src="https://image.flaticon.com/icons/svg/1388/1388946.svg" width="20" height="20" align="right">
      <img src="https://www.flaticon.com/premium-icon/icons/svg/1549/1549775.svg" width="20" height="20" align="right">
    </div>
  </footer>
</article>
  `;
  return markup;
};

// waiting for the document to be ready
$(document).ready(function() {
  $(".textForm").submit(function(event) {
    // alert("Handler for .submit() called.");
    event.preventDefault();

    if($(".textArea").val().length >140 ) {

      $('#error').slideToggle("slow")
      setTimeout(() => {
        $('#error').slideToggle("slow")
      },6000)


    } else if ($(".textArea").val().length === 0 || $(".textArea").val() === null || $(".textArea").val() === "" ) {

      $('#error').slideToggle("slow")
      setTimeout(() => {
        $('#error').slideToggle("slow")
      },6000)
      
    } else {

      $.ajax("/tweets", {
      method: "POST",
      data: $(this).serialize()
    })
    .then(function(response) {
      console.log('Success: ', response);
      console.log($(event).serialize());
      loadTweets()
      $(".textArea").val("");
      $('.counter').text(140);
    }) 
  }
  
});

const loadTweets = function() {
  $.ajax("/tweets", { 
    method: "GET" 
  })
  .then( response => {
    $('#tweets-container').empty(); 
    renderTweets(response);
    })
  };
loadTweets();

  $('.toggleArrows').click(function(){
    $('.new-tweet').slideToggle("slow", function(){
      console.log("animation COmplete");
      $('.textArea').focus()
    })
  })
});

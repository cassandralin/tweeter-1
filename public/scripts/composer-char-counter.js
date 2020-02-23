<<<<<<< HEAD
$(document).ready(function() {
  $(".textbox").on("keydown", function() {
    let num = 140;
    let value = this.value.length;
    $(".counter").text(num - value);
    if (value <= num) {
    $(".counter").css("color", "green");
    } else {
        $('.counter').css("color", "red");
    }
  });
  
});





=======
$(document).ready(() => {
  const max = 140;
  $("#tweet-area").keyup(() => {
    $(".error").text('');q
    const count = $(`#tweet-area`).val().length;
    const remaining = max - count;
    $("#counter").text(remaining);
    if (remaining > 0) {
      $("#counter").css("color", "ED6A5A");
    } else {
      $("#counter").css("color", "red");
    }
  });
})
>>>>>>> 1d091a97ecabc98b7f3a22409192330ff0c1bfcd

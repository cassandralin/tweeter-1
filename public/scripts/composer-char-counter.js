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






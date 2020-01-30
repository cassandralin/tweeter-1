$(document).ready(function() {
  $(".counter").addClass("green")
  $(".textbox").on("keydown", function() {
    let num = 140;
    let value = this.value.length;
    $(".counter").text(num - value);
    if (value <= num) {
      $(".green").click(function () {
        $(".counter").val(--num);
        $(".count").css("colour", "green");
    })
    } else {
      $(".red").click(function () {
        $(".counter").val(++num);
        $('.counter').css("colour", "red");
    })
    }
  });
  
});




// $("textbox").keypress(function() {
//   console.log("Handler for .keypress() called");
// })

// $container.find("form") 
// $(e.target).serialize
// const $form = $(e.target)
// $container.append


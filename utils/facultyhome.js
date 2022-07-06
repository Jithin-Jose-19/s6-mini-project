$(document).ready(function () {
    //Open Drop Down
    $(".custom-select").click(function (e) {
      e.preventDefault();
  
      if ($(".custom-select-wrapper").hasClass("open-dropdown")) {
        $(".custom-select-wrapper").removeClass("open-dropdown");
        $(this).parent().parent().toggleClass("open-dropdown");
      } else {
        $(this).parent().parent().toggleClass("open-dropdown");
      }
    });
  
    // On click get Current Selected tag Value
  
    $("ul li span").click(function (e) {
      if ($(".custom-select-wrapper").hasClass("open-dropdown")) {
        var current_value = $(this).text();
        console.log(current_value);
        $(".open-dropdown .custom-select").val(current_value);
        $(".custom-select-wrapper").removeClass("open-dropdown");
      }
    });
  
    // close when click on Body
    $("html").click(function (event) {
      if ($(event.target).closest(".custom-select").length === 0) {
        $(".custom-select-wrapper").removeClass("open-dropdown");
      }
    });
  });
  
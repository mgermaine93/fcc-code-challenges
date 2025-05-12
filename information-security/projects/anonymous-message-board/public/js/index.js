$(function () {
  $("#newThread").submit(function () {
    var board = $("#board1").val();
    $(this).attr("action", "/api/threads/" + board);
  });
  $("#newReply").submit(function () {
    var board = $("#board4").val();
    $(this).attr("action", "/api/replies/" + board);
  });
  $("#reportThread").submit(function (e) {
    var url = "/api/threads/" + $("#board2").val();
    $.ajax({
      type: "PUT",
      url: url,
      data: $(this).serialize(),
      success: function (data) {
        alert(data);
      },
    });
    e.preventDefault();
  });
  $("#deleteThread").submit(function (e) {
    var url = "/api/threads/" + $("#board3").val();
    $.ajax({
      type: "DELETE",
      url: url,
      data: $(this).serialize(),
      success: function (data) {
        alert(data);
      },
    });
    e.preventDefault();
  });
  $("#reportReply").submit(function (e) {
    var url = "/api/replies/" + $("#board5").val();
    $.ajax({
      type: "PUT",
      url: url,
      data: $(this).serialize(),
      success: function (data) {
        alert(data);
      },
    });
    e.preventDefault();
  });
  $("#deleteReply").submit(function (e) {
    var url = "/api/replies/" + $("#board6").val();
    $.ajax({
      type: "DELETE",
      url: url,
      data: $(this).serialize(),
      success: function (data) {
        alert(data);
      },
    });
    e.preventDefault();
  });
});
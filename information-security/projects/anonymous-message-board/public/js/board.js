$(function () {
  var currentBoard = window.location.pathname.slice(3);
  if (currentBoard.charAt(currentBoard.length - 1) === "/") {
    currentBoard = currentBoard.substring(0, currentBoard.length - 1);
  }
  var url = "/api/threads/" + currentBoard;
  $("#boardTitle").text("Welcome to " + currentBoard);
  $.ajax({
    type: "GET",
    url: url,
    success: function (data) {
      console.log(data);
      var boardThreads = [];
      //
      // THIS ARRAY SET UP IS FOR CODE READABILITIES AND TESTING!
      // THIS IS NOT WHAT IT WOULD LOOK LIKE TO GO LIVE
      //
      data.forEach(function (ele) {
        console.log(ele); //can I use typeScript please?!
        var thread = ['<div class="thread">'];
        thread.push(
          '<div class="top"><p class="id">id: ' +
            ele._id +
            "&nbsp&nbsp&nbsp&nbsp<strong>" +
            ele.created_on +
            "</strong></p>",
        );
        thread.push('<div class="threadHead">');
        thread.push(
          '<form id="deleteThread"><input type="hidden" value="' +
            ele._id +
            '" name="thread_id" required=""><input type="text" placeholder="password" name="delete_password" required=""><input type="submit" value="Delete"></form>',
        );
        thread.push(
          '<form id="reportThread"><input type="hidden" name="thread_id" value="' +
            ele._id +
            '"><input type="submit" value="Report"></form></div></div>',
        );
        thread.push("<p>" + ele.text + "</p>");
        thread.push('<div class="replies">');
        var hiddenCount = ele.replycount - 3;
        if (hiddenCount < 1) {
          hiddenCount = 0;
        }
        thread.push(
          "<h6>" +
            ele.replycount +
            " replies total (" +
            hiddenCount +
            ' hidden)- <a href="' +
            window.location.pathname +
            "/" +
            ele._id +
            '">See the full thread here</a>.</h6>',
        );
        ele.replies.forEach(function (rep) {
          thread.push('<div class="reply">');
          thread.push(
            '<div class="top"><p class="id">id: ' +
              rep._id +
              "&nbsp&nbsp&nbsp&nbsp<strong>" +
              rep.created_on +
              "</strong></p>",
          );
          thread.push(
            '<div class="replyHead"><form id="deleteReply"><input type="hidden" value="' +
              ele._id +
              '" name="thread_id" required=""><input type="hidden" value="' +
              rep._id +
              '" name="reply_id" required=""><input type="text" placeholder="password" name="delete_password" required=""><input type="submit" value="Delete"></form>',
          );
          thread.push(
            '<form id="reportReply"><input type="hidden" name="thread_id" value="' +
              ele._id +
              '"><input type="hidden" name="reply_id" value="' +
              rep._id +
              '"><input type="submit" value="Report"></form></div></div>',
          );
          thread.push("<p>" + rep.text + "</p>");
          thread.push("</div>");
        });
        thread.push('<div class="newReply">');
        thread.push(
          '<form action="/api/replies/' +
            currentBoard +
            '" method="post" id="newReply">',
        );
        thread.push(
          '<input type="hidden" name="thread_id" value="' + ele._id + '">',
        );
        thread.push(
          '<textarea rows="5" cols="80" type="text" placeholder="Quick reply..." name="text" required=""></textarea>',
        );
        thread.push(
          '<div class="submitReply"><input type="text" placeholder="password to delete" name="delete_password" required=""><input style="margin-left: 5px" type="submit" value="Submit"><div>',
        );
        thread.push("</form></div></div></div></div></div>");
        boardThreads.push(thread.join(""));
      });
      boardThreads.push('<p class="footer"><a href="/">HOME</a></p>');
      $("#boardDisplay").html(boardThreads.join(""));
    },
  });

  $("#newThread").submit(function () {
    $(this).attr("action", "/api/threads/" + currentBoard);
  });

  $("#boardDisplay").on("submit", "#reportThread", function (e) {
    var url = "/api/threads/" + currentBoard;
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
  $("#boardDisplay").on("submit", "#reportReply", function (e) {
    var url = "/api/replies/" + currentBoard;
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
  $("#boardDisplay").on("submit", "#deleteThread", function (e) {
    var url = "/api/threads/" + currentBoard;
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
  $("#boardDisplay").on("submit", "#deleteReply", function (e) {
    var url = "/api/replies/" + currentBoard;
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

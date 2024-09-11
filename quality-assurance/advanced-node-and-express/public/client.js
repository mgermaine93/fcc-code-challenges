$(document).ready(function () {

  /*global io*/
  // only works when connecting to a socket hosted on the same url/server
  let socket = io();

  socket.on('user', data => {
    $('#num-users').text(data.currentUsers + ' users online');
    let message =
      data.username +
      (data.connected ? ' has joined the chat.' : ' has left the chat.');
    $('#messages').append($('<li>').html('<b>' + message + '</b>'));
  });

  socket.on('chat message', data => {
    let username = data.username;
    let message = data.message;
    $('#messages').append($('<li>').html('<b>' + username + ' : ' + message + '</b>'));
  });

  // Form submission with new message in field with id 'm'
  // this is the part that does the actual messaging part
  $('form').submit(function () {
    var messageToSend = $('#m').val();
    socket.emit('chat message', messageToSend);
    // clears the text/message box
    $('#m').val('');
    return false; // prevent form submit from refreshing page
  });
});
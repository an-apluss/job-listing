$(document).ready(function () {
  //this is the siginin implementation
  $('#signinForm').submit(function (event) {
    event.preventDefault();
    let userName = $('#username').val();
    let password = $('#password').val();

    $.ajax({
      url: 'http://localhost:3000/users',
      method: 'GET',
      dataType: 'json'
    })
    .done(function (response) {
      let foundUser = response.find(user => user.userName === userName && user.password === password);
      if (foundUser && foundUser.is_admin) {
        localStorage.setItem('jsonServerUser', JSON.stringify(foundUser));
        window.location.href = 'dashboard.html';
      } else {
        alert(`You are unauthorized to proceed`);
      }
    })
  });

});

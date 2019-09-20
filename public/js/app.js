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

  // this is the signup implemwntation
  $('#signupForm').submit(function (event) {
    event.preventDefault();
    let firstName = $('#first_name').val();
    let lastName = $('#last_name').val();
    let userName = $('#username').val();
    let password = $('#password').val();

    let newUserData = JSON.stringify({firstName, lastName, userName, is_admin: false, password});

    if (!firstName || !lastName || !userName || !password) alert(`All fields are required`);
    else if (password.length < 6) alert(`Password must be mininum of 6`);
    else {
      $.ajax({
        url: `http://localhost:3000/users?userName=${userName}`,
        method: 'GET',
        data: userName,
        success: function(response) {
        if(response.length) {
          alert('Username already exist');
        } else {
          $.ajax({
            url: 'http://localhost:3000/users',
            method: 'POST',
            dataType: 'json',
            data: newUserData,
            contentType: 'application/json',
            encode: true
          })
          .done(function(response) {
            console.log(response);
            localStorage.setItem('jsonServerUser', JSON.stringify(response));
            window.location.href = 'dashboard.html';
          });
        }
      } 
      }) 
    }  
  });

});

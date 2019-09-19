$('document').ready(function() {
  let userData = JSON.parse(localStorage.getItem('jsonServerUser'));
  if (localStorage && userData && userData.is_admin) {
    const toast = $('#toast');
    
    $('#createJobForm').submit(function(event) {
      event.preventDefault();
      const title = $('#title').val(),
            description = $('#description').val(),
            job_type = $('#job_type option:selected').text(),
            industry = $('#industry option:selected').text(),
            company = $('#company').val(),
            amount = $('#amount').val(),
            location = $('#location').val();

      if (!title || !description || !company || !job_type || !industry || !amount || !location) {
        toast.removeClass('success');
        toast.text('All fields are required');
        toast.addClass('error');

        setTimeout(function() {
          toast.removeClass('error');
        }, 5000);
      } else {
        const date = new Date();
        const newJob = {
          title, 
          description,
          company, 
          job_type, 
          industry, 
          amount, 
          location,
          posted_date: `${date.getFullYear()}/${(date.getMonth()+1)}/${date.getDate()}`,
          posted_by: userData.id
        };

        $.ajax({
            url: 'http://localhost:3000/jobs',
            method: 'POST',
            data: newJob,
            dataType: 'json',
            success: function(response) {
              toast.removeClass('error');
              toast.text('Job successfully created');
              toast.addClass('success');

              setTimeout(function() {
                toast.removeClass('success');
              }, 5000);
            }
        });
      }
    });
  }else{
    window.location.href = 'signin.html';
  }


  $('#logout').on('click', function(event) {
    event.preventDefault();
    let userData = JSON.parse(localStorage.getItem('jsonServerUser'));
    if (localStorage && userData) {
      localStorage.removeItem('jsonServerUser');
      window.location.href = 'signin.html';
    }
  });

});
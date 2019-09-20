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

    $.ajax({
      url: 'http://localhost:3000/jobs',
      method: 'GET',
      success: function(job_listing) {
        if (job_listing.length) {
          for (let job_detail of job_listing) {
            $('#job_listing_summary').append(
              `
              <tr id="job_record_${job_detail.id}">
                <th scope="row">${job_detail.id}</th>
                <td>${job_detail.title}</td>
                <td>${job_detail.company}</td>
                <td><button class="edit btn btn-light mr-3" data-id="${job_detail.id}">Update</button><button class="delete btn btn-danger" data-id="${job_detail.id}">Delete</button></td>
              </tr>
              `
            )
          }
        }
      }
    });

    $('#job_listing_btn').on('click', function(event) {
      event.preventDefault();
      $('#editJobForm').fadeOut();
      $('#createJobForm').fadeOut();
      $('#job_listing_table').fadeIn();
    });
  
    $('#job_registration_btn').on('click', function(event) {
      $('#editJobForm').fadeOut();
      $('#job_listing_table').fadeOut();
      $('#createJobForm').fadeIn();
    });

    
    $(document).on('click', '.delete', function(){
      const currentTag = `#job_record_${$(this).data('id')}`;
      const jobId = $(this).data('id');
      
      $.ajax({
        url: `http://localhost:3000/jobs/${jobId}`,
        type: 'DELETE',
        success: function(response) {
          $(currentTag).remove();
          toast.removeClass('error');
          toast.text('Job successfully deleted');
          toast.addClass('success');

          setTimeout(function() {
            toast.removeClass('success');
          }, 5000);
        }
      })
    })

    $(document).on('click', '.edit', function(event) {
      $('#createJobForm').fadeOut();
      $('#job_listing_table').fadeOut();
      $('#editJobForm').fadeIn();

      const jobId = $(this).data('id');

      $.ajax({
        url: `http://localhost:3000/jobs/${jobId}`,
        method: 'GET',
        success: function(response) {
          $('#title_u').val(response.title),
          $('#description_u').val(response.description),
          $('#job_type_u option:selected').text(response.job_type),
          $('#industry_u option:selected').text(response.industry),
          $('#company_u').val(response.company),
          $('#amount_u').val(response.amount),
          $('#location_u').val(response.location);
          $('#job_id').val(response.id)
        }
      })
    });

    $('#editJobForm').submit(function(event) {
      event.preventDefault();
      const jobId = $('#job_id').val();
      const title = $('#title_u').val(),
        description = $('#description_u').val(),
        job_type = $('#job_type_u option:selected').text(),
        industry = $('#industry_u option:selected').text(),
        company = $('#company_u').val(),
        amount = $('#amount_u').val(),
        location = $('#location_u').val();

      const formData = {
        title, 
        description,
        company, 
        job_type, 
        industry, 
        amount, 
        location,
      }
      
      $.ajax({
        url: `http://localhost:3000/jobs/${jobId}`,
        method: 'PATCH',
        data: formData,
        success: function(response) {
          
          toast.removeClass('error');
          toast.text('Job successfully updated');
          toast.addClass('success');

          setTimeout(function() {
            toast.removeClass('success');
          }, 5000);
        }
      });

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

$(document).ready(function() {
  let currentURL = window.location.href;
  let jobId = currentURL.split('?')[1].slice(3);
  console.log(jobId);
  $.ajax({
    url: `http://localhost:3000/jobs`,
    method: 'GET',
    success: function(jobDetail) {
      if (jobDetail.length) {
        const foundJob = jobDetail.find(job => job.id == jobId);
        if (foundJob) {
          $('.wrapper').append(
            `
            <div class="row">
            <div class="col-md-8 offset-md-2"><h2>${foundJob.title}</h2></div>
          </div>
          <div class="row">
            <div class="col-md-8 offset-md-2">
              <p>
                ${foundJob.description}
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6 col-md-4 offset-md-2">
              <p><h6>Posted Date</h6>${foundJob.posted_date}</p>
            </div>
            <div class="col-sm-6 col-md-4">
              <p><h6>Job Type</h6>${foundJob.job_type}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6 col-md-4 offset-md-2">
                <p><h6>Industry</h6>${foundJob.industry}</p>
            </div>
            <div class="col-sm-6 col-md-4">
              <p><h6>Company</h6>${foundJob.company}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6 col-md-4 offset-md-2">
              <p><h6>Location</h6>${foundJob.location}</p>
            </div>
            <div class="col-sm-6 col-md-4">
              <p><h6>Salary</h6>&#35;${foundJob.amount}</p>
            </div>
          </div>
            `
          )
        }else{

        }
      }
    }
  })
});
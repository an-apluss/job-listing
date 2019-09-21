function truncateString(string, numberOfCharacter) {
  if (string.length <= numberOfCharacter) return string;
  return `${string.slice(0, numberOfCharacter + 1)}...`;
}

$(document).ready(function() {
  $('.carousel').carousel();

  $.ajax({
    url: 'http://localhost:3000/jobs',
    method: 'GET',
    success: function(job_listing) {
      console.log(job_listing);
      
      if (job_listing.length) {
        for (let job_detail of job_listing) {
         $('#job_listing').append(
            `
            <div class="col-md-6" style="width: 30rem;">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">${job_detail.title}</h4>
                  <p class="card-text">${truncateString(job_detail.description, 90)}</p>
                  <p class="card-text">
                    <span>&#35;</span><span class="price">${job_detail.amount}</span>
                    <span class="date">${job_detail.posted_date}</span>
                  </p>
                  <a href="single.html?id=${job_detail.id}" class="btn btn-view">View</a>
                </div>
              </div>
            </div>`
          )
        }
      }
    }
  });
});

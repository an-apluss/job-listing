# Job Listing

### Project Description
* A web Application to display available job for applicant.

## Getting Started

### Installation

- Clone this repository using `git clone https://github.com/an-apluss/job-listing.git .`
- Ensure you already have `nodejs` installed on your local machine or download <a href="https://www.nodejs.org/">here</a>
- Run `npm install -g json-server` to install json-server dependencies
- Inside the project directory run `json-server --watch db.json` to start the json-server

### Features
Admin creates a Job listing.
User can read all Job listing created.
User can read a single Job listing.
Admin can update a Job listing.
Admin can delete a Job Listing.

## Built With

<ul>
<li><a href="https://www.npmjs.com/package/json-server?activeTab=readme">JSON-Server</a></li>
<li><a href="https://developer.mozilla.org/kab/docs/Web/HTML">HTML</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS">CSS</a></li>
<li><a href="https://api.jquery.com/">JQuery</a></li>
<li><a href="https://api.jquery.com/jquery.ajax/">AJAX</a></li>
</ul>


## API End Points
|        DESCRIPTION                            | HTTP METHOD | ROUTES                                  |
| :-------------------------------------------: | ----------- | --------------------------------------- |
| Sign up User                                  | POST        | /users/                                 |
| Sign in User                                  | GET         | /users/                                 |
| Create a job listing                          | POST        | /jobs/                                  |
| Fetch all job listing                         | GET         | /jobs/                                  |
| Update a particular job detail                | PATCH       | /jobs/{job-id}/                         |
| Fetch a particular job                        | GET         | /jobs/{job-id}/                         |
| Delete a particular job                       | DELETE      | /jobs/{job-id}/                         |

## License

&copy; Anuoluwapo Akinseye

Licensed under the [MIT License](https://github.com/an-apluss/job-listing/blob/develop/LICENSE)
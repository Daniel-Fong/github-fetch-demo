/**
 * Fetch user repos
 */
const getRepos = function () {
  fetch('https://api.github.com/users/andreacardybailey/repos')
    .then(response => response.json())
    .then(jsonData => {
      extractData(jsonData);
    });
};

/**
 * Extract data from API response that will be used on my page
 * Data: name, url, date created, description
 */
const extractData = function (data) {
  data.forEach(repo => {

    let {
      name,
      html_url,
      created_at,
      description
    } = repo;

    let date_created = new Date(created_at);
    $('.repos').append(createTemplate(name, html_url, date_created, description));
  });
};

/**
 * Create HTML template as the result
 * @param {String} name
 * @param {String} html_url
 * @param {Date} date_created
 * @param {String} description
 * @returns {String} - the template
 */
const createTemplate = function (name, html_url, date_created, description) {
  let template = `
    <section>
      <h2><a href="${html_url}">${name}</a></h2>
      <ul>
        <li>Description: ${description}</li>
        <li>
          Date Created: ${date_created.getMonth() + 1}/${date_created.getDate()}/${date_created.getFullYear()}
        </li>
      </ul>
    </section>
  `;
  return template;
};

$(getRepos);
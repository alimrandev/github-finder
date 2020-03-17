class GitHub {
  constructor(name) {
    this.name = name;
  }
  async getUser() {
    const response = await fetch(`https://api.github.com/users/${this.name}`);
    const responseData = await response.json();
    const responseRepo = await fetch(`https://api.github.com/users/${this.name}/repos`);
    const responseRepoData = await responseRepo.json();
    return {
      url: responseData.html_url,
      img: responseData.avatar_url,
      blog: responseData.blog,
      company: responseData.company,
      location: responseData.location,
      totalPublicRepo: responseData.public_repos,
      publicGists: responseData.public_gists,
      followers: responseData.followers,
      following: responseData.following,
      memberSince: responseData.created_at,
      repository: responseRepoData,
    }
  }
}

class UI {
  constructor() {
    this.image = document.getElementById('user-img');
    this.profileLink = document.querySelector('.profile-link');
    this.totalPublicRepo = document.getElementById('repos');
    this.publicGists = document.getElementById('gists');
    this.followers = document.getElementById('followers');
    this.following = document.getElementById('following');
    this.company = document.getElementById('company');
    this.blog = document.getElementById('blog');
    this.location = document.getElementById('location');
    this.since = document.getElementById('since');

  }
  paint({ url, img, blog, company, location, totalPublicRepo, publicGists, followers, following, memberSince, repository }) {
    const ul = document.querySelector('#latestRepo');
    ul.innerHTML = ''
    // last five repo
    // grave last to 5th no
    const lastFiveNo = repository.length - 5;
    // grave last five
    const lastFiveRepo = repository.slice(lastFiveNo,repository.length)
    // looping latest repository 
    lastFiveRepo.forEach(data => {
        ul.innerHTML += `
          <li class ="list-group-item">
            <div class="row">
              <div class="col-sm-6">
                <a href="${data.html_url}" class="repo-name">${data.name}</a>
              </div>
              <div class="col-sm-6">
                <button type="button" class="btn btn-primary btn-sm" id="repos">Stars:${data.stargazers_count}</button>
                <button type="button" class="btn btn-success btn-sm" id="repos">Watcher:${data.watchers}</button>
                <button type="button" class="btn btn-warning btn-sm" id="repos">Fork:${data.forks}</button>
              </div>
            </div>
          </li>
      `
    });

    this.image.setAttribute('src', img);
    this.profileLink.setAttribute('href', url);
    this.publicGists.textContent = `Public Gists : ${publicGists}`;
    this.totalPublicRepo.textContent = `Public Repo : ${totalPublicRepo}`;
    this.followers.textContent = `Followers : ${followers}`;
    this.following.textContent = `Following : ${following}`;
    this.company.textContent = `Company : ${company}`;
    this.blog.textContent = `Website/Blog : ${blog}`;
    this.location.textContent = `Location : ${location}`;
    this.since.textContent = `Member Since : ${memberSince}`;
  }
  showAlert(msg){
    const div = document.createElement('div');
    div.classList = 'alert alert-danger';
    div.id = 'removeMsg'
    div.textContent = msg;
    const para = document.querySelector('.para');
    para.insertAdjacentElement('afterend',div)

    setTimeout(()=>{
      document.getElementById('removeMsg').remove()
    },2000)
  }
}
const ui = new UI()
// instantiate 

document.getElementById('user-input').addEventListener('keyup', e => {
  const value = e.target.value.toLowerCase();
  if(value.length != 0){
    userData(value)
  }
  // const gitHub = new GitHub(value)

  e.preventDefault()
})

function userData(value) {
  const gitHub = new GitHub(value);
  gitHub.getUser().then(data => {
    ui.paint(data)
  }).catch(data => {
    ui.showAlert('User not found')
  })
}



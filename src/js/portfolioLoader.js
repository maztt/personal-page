const portfolio = document.getElementById('portfolio')
const loadProjectsButton = document.getElementById('load-projects-btn')

const projectsToShow = 3
let currentProjects = projectsToShow

function showProjects(startIndex, endIndex, data) {
  for (let i = startIndex; i < endIndex; i++) {
    const articleProjectWrapper = document.createElement("article")
    articleProjectWrapper.classList.add("portfolio__project")
    const project = data[i]
    articleProjectWrapper.innerHTML = `
      <div class="project-info">
          <h2 class="project-name">
            ${project.name}<span class="dot">.</span>
          </h2>
          <p class="project-description">
            ${project.description}
          </p>
          <div class="project-details">
            <a href="${project.repo}" target="_blank"
              ><button>Details ...</button></a
            >
          </div>
        </div>
        <div class="project-display">
          <a href="${project.site}" target="_blank">
            <div class="card-wrapper">
              <img
                class="project-preview"
                src="${project.image}"
                alt="Project Preview"
              />
            </div>
          </a>
        </div>
      </div>
    `;

    if (i % 2 === 0) {
      const swapDiv = articleProjectWrapper.lastElementChild
      articleProjectWrapper.insertBefore(swapDiv, articleProjectWrapper.firstElementChild)
    }
    
    portfolio.insertBefore(articleProjectWrapper, loadProjectsButton.parentElement)
  }
}

fetch("./src/data/projects.json")
  .then(response => response.json())
  .then(data => {
    showProjects(0, projectsToShow, data);

    loadProjectsButton.addEventListener("click", () => {
      const startIndex = currentProjects;
      const endIndex = currentProjects + projectsToShow;
      if (startIndex >= data.length) {
        loadProjectsButton.style.display = "none";
        return
      }
      if (endIndex >= data.length) {
        loadProjectsButton.style.display = "none";
      }
      showProjects(startIndex, endIndex, data);
      currentProjects = endIndex;
    });
  })
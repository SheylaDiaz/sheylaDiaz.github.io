 "use strict"

    const username = 'SheylaDiaz'; 
    const projectsDiv = document.getElementById('projects');

    async function fetchGitHubProjects() {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) throw new Error('Failed to fetch repos');

        const repos = await response.json();

        if (repos.length === 0) {
          projectsDiv.innerHTML = '<p>No projects found.</p>';
          return;
        }
        repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        const repoHTML = repos.map(repo => `
          <div class="repo">
            <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
         
          </div>
        `).join('');

        projectsDiv.innerHTML = repoHTML;

      } catch (error) {
        projectsDiv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
      }
    }

    fetchGitHubProjects();
 
 "use strict"

 const imgElement = document.getElementById('randomImage');
    const button = document.getElementById('fetchBtn');

    const UNSPLASH_ACCESS_KEY = '';

    async function fetchRandomImage() {
      try {
        const response = await fetch(
          'https://api.unsplash.com/photos/random',
          {
            headers: {
              Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
            }
          }
        );

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        imgElement.src = data.urls.regular; 
        imgElement.alt = data.alt_description || 'Random Unsplash Image';

      } catch (error) {
        console.error('Error fetching image:', error);
      }
    }

    fetchRandomImage();

    button.addEventListener('click', fetchRandomImage);
 
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
 
const search = document.getElementById("search");
const suggestions = document.getElementById("suggestions");
const repoList = document.getElementById("repo-list");

search.addEventListener("input", () => {
  console.log(search.value);
});

async function getRepos(query) {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${query}`,
  );

  const data = await response.json();
  return data.items || [];
}

search.addEventListener("input", async () => {
  const query = search.value.trim();

  if (query === "") {
    suggestions.innerHTML = "";
    suggestions.style.display = "none";
    return;
  }

  suggestions.style.display = "block";

  const repos = await getRepos(query);

  suggestions.innerHTML = "";

  repos.slice(0, 5).forEach((repo) => {
    const userLi = document.createElement("li");

    userLi.classList.add("suggestion");
    userLi.textContent = repo.name;

    suggestions.append(userLi);

    userLi.addEventListener("click", () => {
      const card = document.createElement("div");

      card.classList.add("repo");

      card.innerHTML = `
    Name: ${repo.name}<br>
    Owner: ${repo.owner.login}<br>
    Stars: ${repo.stargazers_count}
    <span class ="delete">X</span>`;

      const deleteBtn = card.querySelector(".delete");
      deleteBtn.addEventListener("click", () => {
        card.remove();
      });
      repoList.append(card);
    });
  });
});

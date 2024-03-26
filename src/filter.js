// filter.js
let selectedCategory = null;
let selectedRole = null;

function applyFiltering() {
  console.log(
    `Applying filtering with selectedCategory: ${selectedCategory} and selectedRole: ${selectedRole}`,
  );
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    const categoryElement = section.querySelector("[data-category]");
    const roleElement = section.querySelector("[data-role]");

    const category = categoryElement ? categoryElement.dataset.category : null;
    const role = roleElement ? roleElement.dataset.role : null;

    console.log(
      `Checking section with category: ${category} and role: ${role}`,
    );
    if (
      (selectedCategory !== null && category === selectedCategory) ||
      (selectedRole !== null && role === selectedRole)
    ) {
      section.style.display = "block";
      console.log(
        `Showing section with category: ${category} and role: ${role}`,
      );
    } else {
      section.style.display = "none";
      console.log(
        `Hiding section with category: ${category} and role: ${role}`,
      );
    }
  });
}

function addClickListener(element, isCategory) {
  element.addEventListener("click", () => {
    if (isCategory) {
      selectedCategory = element.textContent;
      console.log(`Selected category: ${selectedCategory}`);
    } else {
      selectedRole = element.textContent;
      console.log(`Selected role: ${selectedRole}`);
    }

    // Add an entry to the browser's history
    history.pushState({ selectedCategory, selectedRole }, "");

    applyFiltering();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll("h2");
  categories.forEach((category) => {
    addClickListener(category, true);
  });

  const roles = document.querySelectorAll("p.button");
  roles.forEach((role) => {
    addClickListener(role, false);
  });

  applyFiltering();
});

// Handle the popstate event
window.addEventListener("popstate", function (event) {
  // Update selected category and role from the state
  if (event.state) {
    selectedCategory = event.state.selectedCategory;
    selectedRole = event.state.selectedRole;
  } else {
    selectedCategory = null;
    selectedRole = null;
  }

  // Apply the filtering
  applyFiltering();
});

// Export the addClickListener function so it can be used in script.js
export { addClickListener };

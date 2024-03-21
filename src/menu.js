const dataPath = "data.json";
let currentOpenDropdown = null; // Variable to keep track of the open dropdown
let currentActiveButton = null; // Variable to keep track of the active button

function setActiveButton(button) {
  // Reset the previously active button if there is one
  if (currentActiveButton) {
    currentActiveButton.classList.remove("bg-blue-500", "text-white"); // Adjust these classes as needed
    currentActiveButton.classList.add("hover:text-white"); // Return hover effect
  }

  // Set the new active button
  currentActiveButton = button;
  if (currentActiveButton) {
    currentActiveButton.classList.add("bg-blue-500", "text-white"); // Example classes for active state
    currentActiveButton.classList.remove("hover:text-white"); // Optionally remove hover effect when active
  }
}

function groupByCategory(data) {
  return data.reduce((acc, item) => {
    const key = item.category || "uncategorized";
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
}

fetch(dataPath)
  .then((response) => response.json())
  .then((data) => {
    const groupedData = groupByCategory(data);
    const menuContainer = document.getElementById("menu");

    Object.entries(groupedData).forEach(([category, items]) => {
      const categoryWrapper = document.createElement("div");
      categoryWrapper.classList.add("text-center", "mx-2");

      const button = document.createElement("button");
      button.innerText = category.toUpperCase();
      button.classList.add("p-0.5", "hover:text-white", "text-xl", "font-bold");

      const dropdown = document.createElement("div");
      dropdown.classList.add("hidden", "absolute", "mt-2", "z-50", "text-left");

      button.onclick = function (event) {
        event.preventDefault();
        dropdown.classList.toggle("hidden");
        if (dropdown.classList.contains("hidden")) {
          setActiveButton(null); // No active button if the dropdown is closed
        } else {
          setActiveButton(button); // Set active button
        }

        if (currentOpenDropdown && currentOpenDropdown !== dropdown) {
          currentOpenDropdown.classList.add("hidden");
        }

        currentOpenDropdown = dropdown.classList.contains("hidden")
          ? null
          : dropdown;
      };

      items.forEach((item) => {
        const dropdownItem = document.createElement("a");
        dropdownItem.href = "#";
        dropdownItem.innerText = item.title;
        dropdownItem.classList.add(
          "block",
          "px-0.5",
          "py-0.5",
          "text-xs",
          "hover:text-white",
        );
        dropdownItem.onclick = function (event) {
          event.preventDefault();
          dropdown.classList.add("hidden");
          toggleCategoryVisibility(category.toLowerCase(), item.title);
          currentOpenDropdown = null;
          setActiveButton(null); // Reset active button when item is selected
        };

        dropdown.appendChild(dropdownItem);
      });

      categoryWrapper.appendChild(button);
      categoryWrapper.appendChild(dropdown);
      menuContainer.appendChild(categoryWrapper);
    });
  })
  .catch((error) => console.error("Error loading the data:", error));

document.addEventListener("click", function (event) {
  if (currentOpenDropdown && !event.target.closest(".text-center")) {
    currentOpenDropdown.classList.add("hidden");
    currentOpenDropdown = null;
    setActiveButton(null); // Reset active button when clicking outside
  }
});

function toggleCategoryVisibility(selectedCategory, selectedItemTitle) {
  const categories = document.querySelectorAll(".category-container");
  categories.forEach((category) => {
    if (category.id.toLowerCase() === selectedCategory) {
      category.style.display = "";
      const sections = category.querySelectorAll("section");
      sections.forEach((section) => {
        section.style.display =
          section.getAttribute("data-title") === selectedItemTitle
            ? ""
            : "none";
      });
    } else {
      category.style.display = "none";
    }
  });
}

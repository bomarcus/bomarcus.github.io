const dataPath = "data.json";

let currentActiveButton = null; // Tracks the active button

function setActiveButton(button) {
  // Clear previously active button
  if (currentActiveButton) {
    currentActiveButton.classList.remove("text-white");
    currentActiveButton.classList.add("text-gray-800");
  }

  currentActiveButton = button;

  // Highlight new active button
  if (currentActiveButton) {
    currentActiveButton.classList.add("text-white");
    currentActiveButton.classList.remove("text-gray-800");
  }
}

function showAllCategoryItems(category) {
  const categories = document.querySelectorAll(".category-container");
  categories.forEach((cat) => {
    cat.style.display =
      cat.id.toLowerCase() === category.toLowerCase() ? "" : "none";

    // If matching category, make all items visible
    if (cat.id.toLowerCase() === category.toLowerCase()) {
      const sections = cat.querySelectorAll("section");
      sections.forEach((section) => (section.style.display = "")); // Make all sections visible
    }
  });

  // Highlight the category button
  setActiveButton(
    document.querySelector(`button[data-category='${category}']`),
  );
}

fetch(dataPath)
  .then((response) => response.json())
  .then((data) => {
    const groupedData = groupByCategory(data);
    const menuContainer = document.getElementById("menu");

    Object.entries(groupedData).forEach(([category, items]) => {
      const button = document.createElement("button");
      button.innerText = category.toUpperCase();
      button.dataset.category = category;
      button.classList.add(
        "button",
        "p-2", //
        "font-bold",
      );

      //@apply bg-red-500 text-gray-800/75;
      // Click event to show all items in category
      button.onclick = () => showAllCategoryItems(category);

      const dropdown = document.createElement("div");
      dropdown.classList.add("hidden", "absolute", "z-10", "text-gray-800");

      // Populate dropdown items
      items.forEach((item) => {
        const dropdownItem = document.createElement("a");
        dropdownItem.href = "#";
        dropdownItem.innerText = item.title;
        dropdownItem.classList.add(
          "block",
          "px-2",
          "py-1",
          "text-sm",
          "button",
        );

        dropdown.appendChild(dropdownItem);

        // Updated click event for dropdown items to include event.stopPropagation()
        dropdownItem.onclick = function (event) {
          event.preventDefault(); // Prevent the default anchor action
          event.stopPropagation(); // Stop event from bubbling up

          // Assuming 'category' is the correct category name for this item
          toggleCategoryVisibility(category, item.title);
        };
      });

      const container = document.createElement("div");
      container.classList.add("relative", "inline-block");
      container.appendChild(button);
      container.appendChild(dropdown);

      // Hover events to show/hide dropdown
      container.onmouseenter = () => dropdown.classList.remove("hidden");
      container.onmouseleave = () => dropdown.classList.add("hidden");

      menuContainer.appendChild(container);
    });
  })
  .catch((error) => console.error("Error loading the data:", error));

function groupByCategory(data) {
  return data.reduce((acc, item) => {
    const key = item.category || "uncategorized";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

function toggleCategoryVisibility(selectedCategory, selectedItemTitle) {
  const categories = document.querySelectorAll(".category-container");
  categories.forEach((category) => {
    const isVisible =
      category.id.toLowerCase() === selectedCategory.toLowerCase();
    category.style.display = isVisible ? "" : "none";

    if (isVisible) {
      const sections = category.querySelectorAll("section");
      sections.forEach((section) => {
        const isItemVisible =
          section.getAttribute("data-title").toLowerCase() ===
          selectedItemTitle.toLowerCase();
        section.style.display = isItemVisible ? "" : "none";
      });
    }
  });

  // Adjusting the logic here to ensure the right button is targeted
  const categoryButton = document.querySelector(
    `button[data-category="${selectedCategory}"]`,
  );
  if (categoryButton) {
    setActiveButton(categoryButton);
  } else {
    console.error("Could not find category button for:", selectedCategory);
  }
}

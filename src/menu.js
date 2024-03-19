const dataPath = "data.json";

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

    menuContainer.classList.add(
      "flex",
      "flex-wrap",
      "gap-0",
      "justify-center",
      "items-start",
      "py-0.5",
      "rounded-lg",
      "mx-auto",
      "mt-0.5",
      "px-0.5"
    );
    menuContainer.style.maxWidth = "960px";

    Object.entries(groupedData).forEach(([category, items]) => {
      const categoryWrapper = document.createElement("div");
      categoryWrapper.classList.add("text-center", "mx-2");

      const button = document.createElement("button");
      button.innerText = category.toUpperCase();
      button.classList.add(
        "p-0.5",
        "hover:text-white",
        "focus:outline-none",
        "text-xl",
        "font-bold"
      );

      // Toggles dropdown visibility on click
      button.onclick = function (event) {
        event.preventDefault(); // Prevent the default button action
        dropdown.classList.toggle("hidden"); // Toggle dropdown visibility
      };

      const dropdown = document.createElement("div");
      dropdown.classList.add("hidden", "absolute", "mt-2", "z-50", "text-left");

      // Populate dropdown items
      items.forEach((item) => {
        const dropdownItem = document.createElement("a");
        dropdownItem.href = "#";
        dropdownItem.innerText = item.title;
        dropdownItem.classList.add(
          "block",
          "px-0.5",
          "py-0.5",
          "text-xl",
          "hover:text-white"
        );
        dropdownItem.onclick = function (event) {
          event.preventDefault(); // Prevent default anchor action
          dropdown.classList.add("hidden"); // Close the dropdown
          toggleCategoryVisibility(category.toLowerCase(), item.title);
        };

        dropdown.appendChild(dropdownItem);
      });

      categoryWrapper.appendChild(button);
      categoryWrapper.appendChild(dropdown);
      menuContainer.appendChild(categoryWrapper);
    });
  })
  .catch((error) => console.error("Error loading the data:", error));

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

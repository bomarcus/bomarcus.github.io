function setupMenuAndObserver(data) {
  let menu = document.getElementById("dynamic-menu");
  if (!menu) {
    menu = document.createElement("div");
    menu.id = "dynamic-menu";
    menu.classList.add("menu", "flex", "flex-wrap", "justify-center", "sticky", "top-0", "z-50", "bg-red-500", "dark:bg-gray-800");
    const mainContainer = document.getElementById("main-container");
    mainContainer.parentNode.insertBefore(menu, mainContainer);
  } else {
    menu.innerHTML = "";
  }

  let menuItemsHtml = data.map(item => {
    const id = item.title.toLowerCase().replace(/ /g, "_");
    return `<div data-id="${id}" class="menu-item font-space-mono text-xs whitespace-nowrap mr-4 ">${item.title}</div>`;
  }).join("");
  menu.innerHTML = menuItemsHtml;

  menu.addEventListener("click", (event) => {
    if (event.target.classList.contains("menu-item")) {
      const id = event.target.getAttribute("data-id");
      const anchor = document.getElementById(`anchor_${id}`);
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  let currentBoldMenuItem = null;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id").replace("anchor_", "");
          const menuItem = document.querySelector(`[data-id='${id}']`);
          if (currentBoldMenuItem) {
            currentBoldMenuItem.classList.remove("active");
          }
          menuItem.classList.add("active");
          currentBoldMenuItem = menuItem;
        }
      });
    },
    { threshold: 0.5, rootMargin: "0px" }
  );

  data.forEach((item) => {
    const id = item.title.toLowerCase().replace(/ /g, "_");
    const section = document.getElementById(id);
    if (section) {
      const anchor = document.createElement("div");
      anchor.style.position = "relative";
      anchor.style.top = "-100px";
      anchor.id = `anchor_${id}`;
      section.parentNode.insertBefore(anchor, section);
      observer.observe(anchor);
    }
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      setupMenuAndObserver(data);
    })
    .catch((error) => {
      console.error("Error loading JSON:", error);
    });
});
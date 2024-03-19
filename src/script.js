let currentlyPlayingVideo = null;
let currentlyPlayingAudio = null;

document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item, index) => {
        createMediaSection(item, index + 1);
      });
      // Additional setup as needed
    })
    .catch((error) => console.error("Error loading JSON:", error))
    .catch((error) => {
      console.error("Error loading JSON:", error);
      console.log("Failed to load some videos due to the above error.");
    });
});

function createMediaSection(item, index) {
  // Find the container for the item's category
  const categoryContainer = document.getElementById(
    item.category.toLowerCase()
  );
  if (!categoryContainer) {
    console.warn(`No container found for category: ${item.category}`);
    return;
  }

  const section = document.createElement("section");
  section.className = "w-3/4 mx-auto py-4 text-xs";
  section.id = `${item.category.toLowerCase()}_${index}`;
  section.setAttribute("data-title", item.title); // Add data-title attribute

  const categoryTitle = document.createElement("h2");
  categoryTitle.textContent = item.category;
  // Tailwind CSS for text alignment and font styling
  categoryTitle.className = "text-xl font-bold";
  section.appendChild(categoryTitle);

  const indexHeading = document.createElement("h2");
  indexHeading.textContent = `${item.title}`;
  // Tailwind CSS for text alignment and font styling
  indexHeading.className = "text-xl font-bold";
  section.appendChild(indexHeading);

  if (item.audioFormat) {
    const audioFormat = document.createElement("p");
    audioFormat.textContent = "Audio Format: " + item.audioFormat;
    // Tailwind CSS for text styling
    audioFormat.className = "text-base";
    section.appendChild(audioFormat);
  }

  if (item.subtitle) {
    const subtitle = document.createElement("p");
    subtitle.textContent = item.subtitle;
    // Tailwind CSS for text styling
    subtitle.className = "text-base";
    section.appendChild(subtitle);
  }

  if (item.description) {
    const description = document.createElement("p");
    description.textContent = item.description;
    // Tailwind CSS for text styling and top margin
    description.className = "text-base mt-4";
    section.appendChild(description);
  }

  if (item.videoUrls && Array.isArray(item.videoUrls)) {
    item.videoUrls.forEach((videoUrl) => {
      const shakaVideo = document.createElement("video");
      shakaVideo.className = "shaka-player w-full"; // Tailwind CSS for width
      const url = typeof videoUrl === "object" ? videoUrl.url : videoUrl;

      if (typeof videoUrl === "object") {
        const videoTitle = document.createElement("p");
        videoTitle.textContent = videoUrl.videoTitle;
        // Tailwind CSS for text alignment and styling
        videoTitle.className = "text-center font-medium mt-4";
        section.appendChild(videoTitle);

        shakaVideo.src = url;
        section.appendChild(shakaVideo);

        const videoDescription = document.createElement("p");
        videoDescription.textContent = videoUrl.videoDescription;
        // Tailwind CSS for text alignment, styling, and italic font
        videoDescription.className = "text-base text-center italic mt-3 ";
        section.appendChild(videoDescription);

        const videoMoreInfo = document.createElement("p");
        videoMoreInfo.textContent = videoUrl.videoMoreInfo;
        // Tailwind CSS for text alignment
        videoMoreInfo.className = "text-base text-center mt-2";
        section.appendChild(videoMoreInfo);

        // Add a divider after each videoMoreInfo
        const divider = document.createElement("hr");
        divider.style.borderTop = "0.5px solid currentColor"; // Half the size and same color as the text
        section.appendChild(divider);
      }

      shakaVideo.addEventListener("play", () => {
        if (currentlyPlayingAudio) {
          currentlyPlayingAudio.pause();
        }
        if (currentlyPlayingVideo && currentlyPlayingVideo !== shakaVideo) {
          currentlyPlayingVideo.pause();
        }
        currentlyPlayingVideo = shakaVideo;
      });

      initializeShakaPlayer(shakaVideo, url);
    });
  }

  if (item.audioUrls && Array.isArray(item.audioUrls)) {
    item.audioUrls.forEach((audioUrl, audioIndex) => {
      const audioDiv = document.createElement("div");
      audioDiv.className = "audio-player wavesurfer-container"; // No specific Tailwind CSS needed here
      audioDiv.id = `audio-player-${index}-${audioIndex}`;
      section.appendChild(audioDiv);

      const url = typeof audioUrl === "object" ? audioUrl.url : audioUrl;

      if (typeof audioUrl === "object") {
        const audioDescription = document.createElement("p");
        audioDescription.textContent = audioUrl.audioDescription;
        // Tailwind CSS for text alignment and italic font
        audioDescription.className = "text-center italic";
        section.appendChild(audioDescription);

        const audioMoreInfo = document.createElement("p");
        audioMoreInfo.textContent = audioUrl.audioMoreInfo;
        // Tailwind CSS for text alignment
        audioMoreInfo.className = "text-center";
        section.appendChild(audioMoreInfo);
      }

      const wavesurfer = initializeWaveSurfer(audioDiv, url);
      wavesurfer.on("play", function () {
        if (currentlyPlayingVideo) {
          currentlyPlayingVideo.pause();
        }
        if (currentlyPlayingAudio && currentlyPlayingAudio !== wavesurfer) {
          currentlyPlayingAudio.pause();
        }
        currentlyPlayingAudio = wavesurfer;
      });
    });
  }

  if (item.imageUrl) {
    const image = document.createElement("img");
    image.src = item.imageUrl;
    // Tailwind CSS for responsive images
    image.className = "max-w-full h-auto";
    section.appendChild(image);
  }
  if (item.year) {
    const year = document.createElement("p");
    year.textContent = item.year;
    // Tailwind CSS for text styling
    year.className = "text-base";
    section.appendChild(year);
  }
  if (item.text) {
    const text = document.createElement("p");
    text.innerHTML = item.text; // Use innerHTML for HTML content
    // Tailwind CSS for text styling
    text.className = "text-base";
    section.appendChild(text);
  }

  // Add a divider at the bottom of each section
  const divider = document.createElement("hr");
  // Tailwind CSS for divider styling, adjust as needed
  divider.className = "my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10";
  section.appendChild(divider);

  //info box
  if (item.info) {
    // Create a div to group the info elements
    const infoContainer = document.createElement("div");
    infoContainer.className = "info-container"; // Add a class for styling

    // Iterate through each key in the info object
    Object.entries(item.info).forEach(([key, value], index, array) => {
      if (value) {
        // Check if value is not empty or not null
        const infoElement = document.createElement("div"); // Change this to a div
        infoElement.className = "flex border-b"; // Add flex and border-bottom

        const keyElement = document.createElement("span");
        keyElement.innerHTML = `<strong>${key}:</strong>`;
        keyElement.className = "w-32"; // Tailwind CSS for width

        const valueElement = document.createElement("span");

        if (Array.isArray(value)) {
          // If value is an array, create a list
          const list = document.createElement("ul");
          value.forEach((item) => {
            const listItem = document.createElement("li");
            listItem.textContent = item;
            list.appendChild(listItem);
          });
          valueElement.appendChild(list);
        } else {
          // If value is not an array, just append the value
          valueElement.textContent = value;
        }

        infoElement.appendChild(keyElement);
        infoElement.appendChild(valueElement);
        infoContainer.appendChild(infoElement);
        // If it's not the last element, add a divider
        if (index < array.length - 1) {
          const divider = document.createElement("hr");
          divider.style.borderTop = "0.5px solid currentColor"; // Half the size and same color as the text
          infoContainer.appendChild(divider);
        } // Append to the infoContainer instead of the section
      }
    });

    section.appendChild(infoContainer); // Append the infoContainer to the section
  }

  categoryContainer.appendChild(section);
}

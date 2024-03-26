//script.js
import { initializeShakaPlayer } from "./shaka.js";
import { initializeWaveSurfer } from "./wavesurfer.js";
import { getAboutContent } from "./about.js";
import { getAboutThisPageContent } from "./aboutthispage.js";

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
    item.category.toLowerCase(),
  );
  if (!categoryContainer) {
    console.warn(`No container found for category: ${item.category}`);
    return;
  }

  const section = document.createElement("section");
  section.className = "w-3/4 mx-auto py-4 text-xs";
  section.id = `${item.category.toLowerCase()}_${index}`;
  section.setAttribute("data-title", item.title); // Add data-title attribute

  //Category and title
  // Create a new div to hold the category and title
  const categoryTitleDiv = document.createElement("div");
  // Tailwind CSS for flex layout and items alignment
  categoryTitleDiv.className = "flex items-left";

  const category = document.createElement("h2");
  category.textContent = item.category;
  // Tailwind CSS for text alignment, font styling, and italic text
  category.className = "text-xl font-bold";
  categoryTitleDiv.appendChild(category);

  // Create a new element for the ">" sign
  const separator = document.createElement("span");
  separator.textContent = ">";
  // Tailwind CSS for margin
  separator.className = "mx-2 text-xl";
  categoryTitleDiv.appendChild(separator);

  const title = document.createElement("h2");
  title.textContent = `${item.title}`;
  // Tailwind CSS for text alignment and font styling
  title.className = "text-xl font-bold text-center italic";
  categoryTitleDiv.appendChild(title);

  // Append the div to the section
  section.appendChild(categoryTitleDiv);

  //role
  if (item.role) {
    const role = document.createElement("p");
    role.textContent = item.role.join(" / ");
    // Tailwind CSS for text styling and button class
    role.className = "button text-base mb-4";
    section.appendChild(role);
  }

  if (item.subtitle) {
    const subtitle = document.createElement("p");
    subtitle.textContent = item.subtitle;
    // Tailwind CSS for text styling
    subtitle.className = "text-base text-center";
    section.appendChild(subtitle);
  }

  if (item.description) {
    const description = document.createElement("p");
    description.textContent = item.description;
    // Tailwind CSS for text styling and top margin
    description.className = "text-base mt-4 text-center";
    section.appendChild(description);
  }

  if (item.videoUrls && Array.isArray(item.videoUrls)) {
    item.videoUrls.forEach((video) => {
      const shakaVideo = document.createElement("video");
      shakaVideo.className = "shaka-player w-full"; // Tailwind CSS for width
      const videoUrl = video.videoUrl;

      // Initialize Shaka Player with the video element and URL
      initializeShakaPlayer(shakaVideo, videoUrl);
      section.appendChild(shakaVideo);

      // Displaying video description
      if (video.videoDescription) {
        const videoDescription = document.createElement("p");
        videoDescription.textContent = video.videoDescription;
        videoDescription.className = "text-base text-center italic mt-3";
        section.appendChild(videoDescription);
      }

      // Displaying additional video information
      if (video.videoMoreInfo) {
        const videoMoreInfo = document.createElement("p");
        videoMoreInfo.textContent = video.videoMoreInfo;
        videoMoreInfo.className = "text-base text-center mt-2";
        section.appendChild(videoMoreInfo);
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

      initializeShakaPlayer(shakaVideo, videoUrl);
    });
  }

  if (item.audioUrls && Array.isArray(item.audioUrls)) {
    item.audioUrls.forEach((audio, audioIndex) => {
      const audioDiv = document.createElement("div");
      audioDiv.className = "audio-player wavesurfer-container";
      audioDiv.id = `audio-player-${index}-${audioIndex}`;
      section.appendChild(audioDiv);

      const audioUrl = audio.audioUrl; // Use the updated field name

      if (audioUrl) {
        // Display audio description if available
        if (audio.audioDescription) {
          const audioDescriptionEl = document.createElement("p");
          audioDescriptionEl.textContent = audio.audioDescription;
          audioDescriptionEl.className = "text-base";
          section.appendChild(audioDescriptionEl);
        }

        // Display more info about the audio if available
        if (audio.audioMoreInfo) {
          const audioMoreInfoEl = document.createElement("p");
          audioMoreInfoEl.textContent = audio.audioMoreInfo;
          audioMoreInfoEl.className = "text-base italic";
          section.appendChild(audioMoreInfoEl);
        }
        const wavesurfer = initializeWaveSurfer(audioDiv, audioUrl);

        // Attach event listener for when the audio starts playing
        wavesurfer.on("play", function () {
          // console.log(`Playing audio ID: ${audioDiv.id} URL: ${audioUrl}`);
          // Pause the currently playing video if any
          if (currentlyPlayingVideo) {
            currentlyPlayingVideo.pause();
          }
          // Pause any other currently playing audio, except the current instance
          if (currentlyPlayingAudio && currentlyPlayingAudio !== wavesurfer) {
            currentlyPlayingAudio.pause();
          }
          // Update the reference to the currently playing audio
          currentlyPlayingAudio = wavesurfer;
        });
      }
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

  //info box
  if (item.info) {
    // Create a div to group the info elements
    const infoContainer = document.createElement("div");
    infoContainer.className = "info-container text-left pt-12"; // Add a class for styling

    // Iterate through each key in the info object
    // Iterate through each key in the info object
    // Iterate through each key in the info object
    Object.entries(item.info).forEach(([key, value], index, array) => {
      // Check if value is not empty, not null, not an empty array, and not an empty string
      if (
        value &&
        !(Array.isArray(value) && value.length === 0) &&
        value !== ""
      ) {
        const infoElement = document.createElement("div");
        infoElement.className = "flex p-1";

        const keyElement = document.createElement("span");
        keyElement.innerHTML = `<strong>${key}:</strong>`;
        keyElement.className = "w-32";

        const valueElement = document.createElement("span");

        if (Array.isArray(value)) {
          const list = document.createElement("ul");
          value.forEach((item) => {
            const listItem = document.createElement("li");
            listItem.textContent = item;
            list.appendChild(listItem);
          });
          valueElement.appendChild(list);
        } else {
          valueElement.textContent = value;
        }

        infoElement.appendChild(keyElement);
        infoElement.appendChild(valueElement);
        infoContainer.appendChild(infoElement);

        if (index !== array.length - 1) {
          const divider = document.createElement("hr");
          divider.className = "border-black/10 my-2 w-4/5";
          infoContainer.appendChild(divider);
        }
      }
    });

    section.appendChild(infoContainer);

    section.appendChild(infoContainer); // Append the infoContainer to the section

    // Add a divider at the bottom of each section
    const divider = document.createElement("hr");
    // Tailwind CSS for divider styling, adjust as needed
    divider.className = "my-6 h-1 border-t-0 bg-neutral-100 dark:bg-white/10";
    section.appendChild(divider);
  }
  if (item.category.toLowerCase() === "about") {
    const aboutContent = getAboutContent();
    section.appendChild(aboutContent);
  }
  if (item.category.toLowerCase() === "about this page") {
    const aboutThisPageContent = getAboutThisPageContent();
    section.appendChild(aboutThisPageContent);
  }
  categoryContainer.appendChild(section);
}

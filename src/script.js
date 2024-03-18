let currentlyPlayingVideo = null;
let currentlyPlayingAudio = null;

document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const mainContainer = document.getElementById("main-container");
      data.forEach((item, index) => {
        createMediaSection(item, mainContainer, index + 1);
      });
      if (window.setupMenuAndObserver) {
        window.setupMenuAndObserver(data);
      } else {
        console.error("setupMenuAndObserver function not found");
      }
    })
    .catch((error) => {
      console.error("Error loading JSON:", error);
      console.log("Failed to load some videos due to the above error.");
    });
});

function createMediaSection(item, container, index) {
  const section = document.createElement("section");
  // Updated classes for Tailwind CSS
  section.className = "w-3/4 mx-auto py-4 text-xs border-b border-gray-200";
  section.id = item.title.toLowerCase().replace(/ /g, "_");

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
    // Tailwind CSS for text styling
    description.className = "text-base";
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
        videoTitle.className = "text-center font-medium";
        section.appendChild(videoTitle);

        shakaVideo.src = url;
        section.appendChild(shakaVideo);

        const videoDescription = document.createElement("p");
        videoDescription.textContent = videoUrl.videoDescription;
        // Tailwind CSS for text alignment, styling, and italic font
        videoDescription.className = "text-center italic";
        section.appendChild(videoDescription);

        const videoMoreInfo = document.createElement("p");
        videoMoreInfo.textContent = videoUrl.videoMoreInfo;
        // Tailwind CSS for text alignment
        videoMoreInfo.className = "text-center";
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

  const divider = document.createElement("hr");
  // Updated Tailwind CSS classes for the divider
  divider.className = "my-4 border-t border-gray-200";
  section.appendChild(divider);

  container.appendChild(section);
}

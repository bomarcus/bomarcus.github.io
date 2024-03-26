//shaka.js

import shaka from "shaka-player/dist/shaka-player.ui.js";
import "shaka-player/dist/controls.css";

export function initializeShakaPlayer(videoElement, videoUrl) {
  if (shaka.Player.isBrowserSupported()) {
    const videoContainer = document.createElement("div");
    videoContainer.className = "w-full h-full";

    videoElement.replaceWith(videoContainer);
    videoContainer.appendChild(videoElement);

    const player = new shaka.Player();
    player.attach(videoElement).then(() => {
      const ui = new shaka.ui.Overlay(player, videoContainer, videoElement);
      const config = {
        addSeekBar: true,
        addBigPlayButton: true,
      };
      ui.configure(config);

      player
        .load(videoUrl)
        .then(() => {
          configurePlayer(player);
        })
        .catch((error) => {
          console.error("Error setting up Shaka Player:", error);
          console.error("Failed to load video URL:", videoUrl);
          // Add visual indication for the error inside the video container
          const errorMessage = document.createElement("div");
          errorMessage.textContent =
            "Failed to load video. Please try again later.";
          errorMessage.style.position = "absolute";
          errorMessage.style.top = "50%";
          errorMessage.style.left = "50%";
          errorMessage.style.transform = "translate(-50%, -50%)";
          errorMessage.style.color = "white";
          errorMessage.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
          errorMessage.style.padding = "10px";
          errorMessage.style.borderRadius = "5px";
          errorMessage.style.textAlign = "center";
          videoContainer.appendChild(errorMessage);
        });
    });
  } else {
    console.error("Browser not supported for Shaka Player");
  }
}

function configurePlayer(player) {
  // Set the configuration as per the tutorial
  player.configure({
    streaming: {
      rebufferingGoal: 5,
      bufferingGoal: 10,
      bufferBehind: 30,
      ignoreTextStreamFailures: true,
      alwaysStreamText: true,
    },
    // Add more configurations as needed
  });
}

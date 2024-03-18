function initializeShakaPlayer(videoElement, videoUrl) {
  if (shaka.Player.isBrowserSupported()) {
    // Create a new div for the video player and its controls
    const videoContainer = document.createElement("div");
    videoContainer.className = "w-full h-full"; // Tailwind CSS classes for full width and height

    // Replace the video element with the new container
    videoElement.replaceWith(videoContainer);

    // Add the video element to the container
    videoContainer.appendChild(videoElement);

    // Create a Player instance without passing the videoElement.
    const player = new shaka.Player();

    // Attach the player to the videoElement.
    player.attach(videoElement).then(() => {
      // Create a UI instance and pass it the video element, player instance, and the container for the UI
      const ui = new shaka.ui.Overlay(player, videoContainer, videoElement);

      // Configure the UI instance
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
          console.error("Failed to load video URL:", videoUrl); // Added console log
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

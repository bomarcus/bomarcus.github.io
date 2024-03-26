// wavesurfer.js
import WaveSurfer from "wavesurfer.js";

function configureWaveSurfer(wavesurfer) {
  // Set the volume
  wavesurfer.setVolume(0.5);

  // Add more configurations as needed
}

export function initializeWaveSurfer(audioElement, audioUrl) {
  // Create a new div for the audio player and its controls
  const audioContainer = document.createElement("div");
  audioContainer.className = "w-full h-full"; // Tailwind CSS classes for full width and height

  // Replace the audio element with the new container
  audioElement.replaceWith(audioContainer);

  // Add the audio element to the container
  audioContainer.appendChild(audioElement);

  // Create a WaveSurfer instance
  const wavesurfer = WaveSurfer.create({
    container: audioContainer,
    waveColor: "#484848",
    progressColor: "white",
    cursorColor: "black",
    cursorWidth: 0,
    barWidth: null,
    barGap: null,
    barRadius: null,
    normalize: true, // Normalize the waveform
    dragToSeek: true,
    mediaControls: false,
    autoCenter: true,
    sampleRate: 48000,
    backend: "MediaElement",
    partialRender: true, // Enable partial rendering
  });

  // Load the audio URL
  wavesurfer.load(audioUrl);

  wavesurfer.on("ready", function () {
    configureWaveSurfer(wavesurfer);
  });

  wavesurfer.on("error", function (err) {
    // console.error("WaveSurfer error:", err);
    // console.error("Error occurred while processing the audio URL:", audioUrl);
    // console.error("Audio element:", audioElement);
  });

  const playButton = document.createElement("button");
  playButton.textContent = "Play";
  playButton.className =
    "wavesurfer-play-button bg-gray-800 text-white px-4 py-2"; // Add Tailwind CSS classes
  playButton.addEventListener("click", () => {
    wavesurfer.play();
    playButton.classList.add("bg-gray-600"); // Change the button color when clicked
  });
  playButton.addEventListener("blur", () => {
    playButton.classList.remove("bg-gray-600"); // Revert the button color when not focused
  });
  audioContainer.appendChild(playButton);

  const stopButton = document.createElement("button");
  stopButton.textContent = "Stop";
  stopButton.className =
    "wavesurfer-stop-button bg-gray-800 text-white px-4 py-2"; // Add Tailwind CSS classes
  stopButton.addEventListener("click", () => {
    wavesurfer.stop();
    stopButton.classList.add("bg-gray-600"); // Change the button color when clicked
  });
  stopButton.addEventListener("blur", () => {
    stopButton.classList.remove("bg-gray-600"); // Revert the button color when not focused
  });
  audioContainer.appendChild(stopButton);

  // Return the WaveSurfer instance
  return wavesurfer;
}

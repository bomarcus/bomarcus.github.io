function configureWaveSurfer(wavesurfer) {
  // Set the volume
  wavesurfer.setVolume(0.5);

  // Add more configurations as needed
}

function initializeWaveSurfer(audioElement, audioUrl) {
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
    progressColor: "#f80404",
    cursorColor: "black",
    cursorWidth: 0,
    barWidth: null,
    barGap: null,
    barRadius: null,
    normalize: true, // Normalize the waveform
    dragToSeek: true,
    mediaControls: true,
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

  wavesurfer.on("error", function (e) {
    console.error("Error setting up WaveSurfer:", e);
  });

  // Return the WaveSurfer instance
  return wavesurfer;
}

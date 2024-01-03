let currentVideoElements = new Set();

function pip() {
  if (currentVideoElements.size === 0) return;

  // Find an active video (not paused) or default to the first video in the set
  let activeVideo = null;
  for (let video of currentVideoElements) {
    if (!video.paused) {
      activeVideo = video;
      break;
    }
  }

  // If no active video is found, use the first video in the set
  activeVideo = activeVideo || currentVideoElements.values().next().value;

  // Check if Picture-in-Picture is supported and toggle it
  if (
    activeVideo.webkitSupportsPresentationMode &&
    typeof activeVideo.webkitSetPresentationMode === "function"
  ) {
    activeVideo.webkitSetPresentationMode(
      activeVideo.webkitPresentationMode === "picture-in-picture"
        ? "inline"
        : "picture-in-picture"
    );
  }
}

function handleMessage(event) {
  if (event.name === "toolbarItemClicked") {
    pip();
  }
}

function updateVideoElements() {
  const newVideoElements = new Set(document.getElementsByTagName("video"));
  const isDifferent =
    newVideoElements.size !== currentVideoElements.size ||
    Array.from(newVideoElements).some(
      (video) => !currentVideoElements.has(video)
    );

  if (isDifferent) {
    currentVideoElements = newVideoElements;
    safari.extension.dispatchMessage("videosChanged", {
      count: currentVideoElements.size,
    });
  }
}

safari.self.addEventListener("message", handleMessage);

window.addEventListener("focus", updateVideoElements);

const observer = new MutationObserver(updateVideoElements);
observer.observe(document, { childList: true, subtree: true });

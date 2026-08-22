document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("hero-video");
  if (!video) return;

  let counted = false;
  video.addEventListener("play", () => {
    if (counted) return;
    counted = true;
    const img = new Image();
    img.src = "https://trl-pageview-counter.trl-eason0801.workers.dev/video-hit?path=/hero-tutorial";
  });
});

/**
 * Smoothly scrolls to the top of the screen.
 * @param {number} duration - The duration of the scroll animation in milliseconds.
 */
function scrollToTop(duration: number): void {
  const scrollStep = -window.scrollY / (duration / 15);

  const scrollInterval = setInterval(() => {
    if (window.scrollY !== 0) {
      window.scrollBy(0, scrollStep);
    } else {
      clearInterval(scrollInterval);
    }
  }, 15);
}

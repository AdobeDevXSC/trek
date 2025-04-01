function makeVideo(element, videoSrcs, media) {
  console.log([...videoSrcs]);
  const srcStr = [...videoSrcs].map(({ href }, n) => {
    return `<source data-src="${href}" type="video/mp4" ${media[n]} />`
  });

  element.innerHTML = `<video loop muted playsInline>${srcStr.join('')}</video>`;

  const video = element.querySelector('video');
  const sources = element.querySelectorAll('video > source');

  sources.forEach(s => s.src = s.dataset.src);

  // source.src = source.dataset.src;

  video.load();
  video.addEventListener('loadeddata', () => {
    video.setAttribute('autoplay', true);
    video.setAttribute('data-loaded', true);
    video.play();
  });

}

export default async function decorate(block) {
  const old = block.querySelector('div:first-child');
  const referenceVideo = block.querySelector('div:nth-child(2)'); // for the new block structure
  const h1 = block.querySelector('div:has(h1)');
  block.removeChild(referenceVideo);
  block.removeChild(old); // remove the old div, if it exists
  block.removeChild(h1);
  [...block.children].forEach((row) => {
    console.log(h1);
    row.prepend(h1); // move the h1 to the first row
  });
}
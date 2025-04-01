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
  [...block.children].forEach((row) => {
    console.log(row);
    // if(row.querySelector('a')) {
    //   const hrefs = row.querySelectorAll('a');
    //   makeVideo(row, hrefs, ['media="(min-width: 1024px)"', 'media="(min-width: 768px)"', 'media="(min-width: 0px)"']);
    // }
  });
}
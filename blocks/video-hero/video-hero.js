function makeVideo(element, videoSrcs, media) {
  const srcStr = [...videoSrcs].map(({ href }, n) => {
    href = href.replace(/^[^:]+:\/\/[^/?#]+/, 'https://publish-p128352-e1258333.adobeaemcloud.com');
    console.log(href);
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
  const media = [
    'media="(min-width: 1080px)"',
    ''
  ];
  const referenceVideo = block.querySelector('div:first-child');
  makeVideo(referenceVideo, referenceVideo.querySelectorAll('a'), media); 

  const title = block.querySelector('div:nth-child(2)');
  const subtitle = block.querySelector('div:nth-child(3)');
  const buttonGrp = block.querySelector('div:nth-child(4)');

  block.removeChild(subtitle);

  title.querySelector('div').appendChild(subtitle.querySelector('h2'));
  title.classList.add('hero-text');

  buttonGrp.querySelector('div').prepend(subtitle.querySelector('.button-container'));
  buttonGrp.classList.add('button-group');

  // const referenceVideo = block.querySelector('div:nth-child(2)'); // for the new block structure
  // const h1 = block.querySelector('div:has(h1)');
  // block.removeChild(referenceVideo);
  // block.removeChild(old); // remove the old div, if it exists
  // block.removeChild(h1);
  
}
(function(){
  const DEFAULT_DURATION = 1300; // ms before swapping gif -> static frame
  const OFFSET_X = 20;
  const OFFSET_Y = 0;

  let active = null; // { wrapper, img, swapTimer, moveHandler }
  // add helper to produce a cache-busted url
  function cacheBustedUrl(url) {
    try {
      const u = new URL(url, location.href);
      u.searchParams.set('_', Date.now().toString());
      return u.href;
    } catch (e) {
      return url + (url.includes('?') ? '&' : '?') + '_=' + Date.now();
    }
  }
  
  function createPreview(gifSrc) {
    const wrapper = document.createElement('div');
    wrapper.className = 'hover-preview';
    const img = document.createElement('img');
    img.src = cacheBustedUrl(gifSrc);
    wrapper.appendChild(img);
    document.body.appendChild(wrapper);
    return { wrapper, img };
  }


  function attach(imgEl) {
    const gif = imgEl.dataset.hoverGif;
    const last = imgEl.dataset.hoverStatic;
    if (!gif || !last) return;

    const duration = parseInt(imgEl.dataset.hoverDuration || DEFAULT_DURATION, 10);

    imgEl.addEventListener('mouseenter', function onEnter(e) {
      // remove any existing preview
      removeActive();

      active = createPreview(gif);

      // initial position
      positionActive(e);

      // follow cursor
      active.moveHandler = function(ev){ positionActive(ev); };
      window.addEventListener('mousemove', active.moveHandler);

      // schedule swap to static image
      active.swapTimer = setTimeout(() => {
        if (active && active.img) active.img.src = last;
      }, duration);

      // cleanup on leave
      imgEl.addEventListener('mouseleave', function onLeave() {
        removeActive();
      });
    });
  }

  function positionActive(e){
    if (!active) return;
    let x = e.clientX + OFFSET_X;
    const y = e.clientY + OFFSET_Y;
    if (e.target.classList.contains("backwards-label")){
      x -= 140;
    } 
    active.wrapper.style.left = x + 'px';
    active.wrapper.style.top = y + 'px';
  }

  function removeActive(){
    if (!active) return;
    // console.log(active)
    if (active.swapTimer) {
      clearTimeout(active.swapTimer);
      active.swapTimer = null;
    }
    if (active.moveHandler) {
      window.removeEventListener('mousemove', active.moveHandler);
      active.moveHandler = null;
    }
    if (active.wrapper && active.wrapper.parentNode) {
        active.wrapper.removeChild(active.img);
      active.wrapper.parentNode.removeChild(active.wrapper);
    }
    active = null;
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img[data-hover-gif][data-hover-static]').forEach(attach);
  });
})();


const banditsIntroBios = [
  'Bandits on the Run is an indie-folk-pop-americana outfit consisting of three lead singers, a guitar, a cello, a suitcase drum, an accordion, and various toy instruments.',
  "Bandits on the Run is a fan of YOU!",
  "Bandits in the Run is part of your cool big sister’s record collection ",
  "Bandits on the Run is  your friendly neighborhood genre-benders ",
  "Bandits on the Run is dancing  in the liminal space between folk and anti-folk ",
  "Bandits on the Run is three subway rats in a trenchcoat",
  "Bandits on the Run is the daydream you have in orchestra class ",
  "Bandits on the Run is America’s third favorite identical triplet band!",
  "Bandits on the Run is a mini-symphony (put us in your pocket!)",
  "Bandits on the Run is Fleetwood Mac if they got along! ",
  "Bandits on the Run is Best Dressed of all the theatre kids at prom",
  "Bandits on the Run is pretty cool actually (9 out of 10 dads agree) ",
  "Bandits on the Run is a cello, an accordion, a guitar, a suitcase drum, an electric bass, shaky toy instruments, three best friends, a brave little toaster, and the adventure of a lifetime! (You’re the toaster)",
  "Bandits on the Run have never actually done any criminal wrongdoing (except for the occasional banjo in their set) ",
  "Bandits on the Run will steal your heart but don’t worry they’ll be gentle ",
  "Bandits on the Run is a trio trilling troubadour tunes and trying their truest best ",
  "Bandits on the Run is not a Paul McCartney cover band",
  "Bandits on the Run is your new wanderlust soundtrack",
];

document.addEventListener('DOMContentLoaded', function() {
  const cta = document.querySelector('#blurb');
  const index = Math.floor(Math.random() * banditsIntroBios.length);
  cta.innerHTML = banditsIntroBios[index];
});



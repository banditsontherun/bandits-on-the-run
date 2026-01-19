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

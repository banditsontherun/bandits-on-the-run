<script>
  /* Desktop branding - redirect to another URL */
  document.querySelector('.header-display-desktop .header-title-logo a').setAttribute('href', 'https://banditsontherun.com');
   /* Mobile branding - redirect to another URL */
  document.querySelector('.header-display-mobile .header-title-logo a').setAttribute('href', 'https://banditsontherun.com');  
    
  const navList = document.querySelector('.header-nav-list');
  const isDonatePage = document.URL.includes('donate');
  if (navList) {
    const navLinksBlock1 = `
<nav class="header-nav-list">
<div class="header-nav-item header-nav-item--collection">
<a href="https://banditsontherun.com/about">
ABOUT
  </a>
  </div>
<div class="header-nav-item header-nav-item--collection">
<a href="https://banditsontherun.com/shows" data-animation-role="header-element">
SHOWS
  </a>
  </div>
<div class="header-nav-item header-nav-item--collection">
<a href="https://banditsontherun.com/videos" data-animation-role="header-element">
VIDEOS
  </a>
  </div>
<div class="header-nav-item header-nav-item--collection">
<a href="https://banditsontherun.com/music" data-animation-role="header-element">
MUSIC
  </a>
  </div>`
    
    const navLinksBlock2 = `<div class="header-nav-item header-nav-item--collection">
<a href="https://banditsontherun.com/contact" data-animation-role="header-element">
CONTACT
  </a>
  </div>
<div class="header-nav-item header-nav-item--collection">
<a href="https://banditsontherun.com/newsletter" data-animation-role="header-element">
NEWSLETTER
  </a>
  </div>
  <div class="header-nav-item header-nav-item--collection">
<a href="https://banditsontherun.com/theatre" data-animation-role="header-element">
THEATRE
  </a>
  </div>
  <div class="header-nav-item header-nav-item--collection">
<a href="https://banditsontherun.com/justice" data-animation-role="header-element">
JUSTICE
  </a>
  </div>
  </nav>`;
    
    const navOnStorePage =`<div class="header-nav-item header-nav-item--collection header-nav-item--active ">
<a href="/" data-animation-role="header-element"  data-animation-role="header-element" aria-current="page">
STORE
  </a>
  </div>
<div class="header-nav-item header-nav-item--collection">
<a href="/donate" data-animation-role="header-element"  data-animation-role="header-element">
DONATE
  </a>
  </div>
`;
    const navOnDonatePage =`<div class="header-nav-item header-nav-item--collection ">
<a href="/" data-animation-role="header-element"  data-animation-role="header-element" aria-current="page">
STORE
  </a>
  </div>
<div class="header-nav-item header-nav-item--collection header-nav-item--active ">
<a href="/donate" data-animation-role="header-element"  data-animation-role="header-element" aria-current="page">
DONATE
  </a>
  </div>`;
    
    let navLinks = navLinksBlock1;
    if (isDonatePage) {
      navLinks += navOnDonatePage;
    } else {
      navLinks += navOnStorePage;
    }
    navLinks += navLinksBlock2;
	navLinks = navLinks.trim();
    // Only update if current content doesn't match
    if (navList.innerHTML.trim() !== navLinks) {
      navList.innerHTML = navLinks;
    }
  }

  // mobile maybe
  const mobileMenu = document.querySelector('.header-menu-nav-wrapper');
  if (mobileMenu) {
    let mobileLinksBlock1 = `
<div class="container header-menu-nav-item header-menu-nav-item--collection header-menu-nav-item--active header-menu-nav-item--homepage">
<a href="https://banditsontherun.com/about">
<div class="header-menu-nav-item-content">
ABOUT
  </div>
  </a>
<a href="https://banditsontherun.com/shows">
<div class="header-menu-nav-item-content">
SHOWS
  </div>
  </a>
<a href="https://banditsontherun.com/videos">
<div class="header-menu-nav-item-content">
VIDEOS
  </div>
  </a>
<a href="https://banditsontherun.com/music">
<div class="header-menu-nav-item-content">
MUSIC
  </div>
  </a>`;

  let mobileLinksBlock2 = `
<a href="https://banditsontherun.com/contact">
<div class="header-menu-nav-item-content">
CONTACT
  </div>
  </a>
<a href="https://banditsontherun.com/newsletter">
<div class="header-menu-nav-item-content">
NEWSLETTER
  </div>
  </a>
<a href="https://banditsontherun.com/theatre">
<div class="header-menu-nav-item-content">
THEATRE
  </div>
  </a>
<a href="https://banditsontherun.com/justice">
<div class="header-menu-nav-item-content">
JUSTICE
  </div>
  </a>
  </div>`;

  let mobileOnStorePage = ` 
<a href="/" aria-current="page">
<div class="header-menu-nav-item-content">
STORE
  </div>
  </a>
  <a href="/donate">
<div class="header-menu-nav-item-content">
DONATE
  </div>
  </a>`;

  let mobileOnDonatePage = ` 
<a href="/">
<div class="header-menu-nav-item-content">
STORE
  </div>
  </a>
<a href="/donate" aria-current="page">
<div class="header-menu-nav-item-content">
DONATE
  </div>
  </a>`;

  let mobileLinks = mobileLinksBlock1;
    if (isDonatePage) {
      mobileLinks += mobileOnDonatePage;
    } else {
      mobileLinks += mobileOnStorePage;
    }
    mobileLinks += mobileLinksBlock2;
  
  mobileLinks = mobileLinks.trim();
    // Only update if current content doesn't match
    if (mobileMenu.innerHTML.trim() !== mobileLinks) {
      mobileMenu.innerHTML = mobileLinks;
    }
  }

</script>
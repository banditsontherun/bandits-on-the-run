/**
 * Shows page initialization and data handling
 * Fetches upcoming shows from Bandsintown API and renders them as styled tickets
 */

document.addEventListener('DOMContentLoaded', function() {
  // Reference to DOM element that will contain all show tickets
  const showsContainer = document.getElementById('shows-container');
  
  // Track venue styles to ensure consistent styling per venue
  const venueStyles = new Map();
  let lastUsedStyleIndex = -1;
  
  // Available ticket style themes
  const ticketStyles = [
    'ticket-classic',  // Clean, traditional ticket look
    'ticket-neon',     // Bright, vibrant colors
    'ticket-vintage',  // Retro, aged paper style
    'ticket-indie', // Modern, playful design with pastel accents
    'ticket-coffee',   // Warm, cafe-inspired theme
    'ticket-forest',   // Forest theme with tree pattern
    'ticket-pop', // Pink-purples fun theme
    'ticket-national-park', // Blue mountainous theme
  ];

  /**
   * Cycles through available ticket styles sequentially
   * @returns {string} Next ticket style class name
   */
  function getNextStyle() {
    lastUsedStyleIndex = (lastUsedStyleIndex + 1) % ticketStyles.length;
    return ticketStyles[lastUsedStyleIndex];
  }

  /**
   * Gets or assigns a consistent style for a venue
   * @param {string} venueName - Name of the venue
   * @returns {string} Assigned ticket style class name
   */
  function getStyleForVenue(venueName) {
    if (!venueStyles.has(venueName)) {
      const newStyle = getNextStyle();
      venueStyles.set(venueName, newStyle);
    }
    return venueStyles.get(venueName);
  }

  // Fetch show data from Bandsintown API
  fetch("https://rest.bandsintown.com/artists/id_10372011/events?app_id=squarespace-vuvuzela-keyboard-rdsz")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const formattedShows = data.map(event => {
        const eventDate = new Date(event.datetime);
        // Filter for ticket offers and clean URLs
        const ticketOffers = event.offers.filter(o => o.type === "Tickets");
        const ticketOfferUrls = ticketOffers.map(o => o.url.split("?")[0]);  // Remove API key

        // Process lineup - BotR is always main act
        const lineup = event.lineup || [];
        const featuring = lineup.filter(band => 
          !band.toLowerCase().includes('bandits on the run')
        );

        return {
          venueName: event.venue.name,
          location: event.venue.location,
          country: event.venue.country,
          date: eventDate.toLocaleDateString([], { month: 'short', day: 'numeric' }),
          dayOfWeek: eventDate.toLocaleDateString([], { weekday: 'short' }),
          time: eventDate.toLocaleTimeString([], { 
            hour: 'numeric', 
            minute: '2-digit',
          }),
          ticketUrl: ticketOfferUrls.length > 0 ? ticketOfferUrls[0] : null,
          rsvpUrl: event.url.split("?")[0], // Remove API key
          description: event.description,
          featuring: featuring
        };
      });
      
      renderShows(formattedShows);
    })
    .catch(error => {
      console.error("Error fetching show data:", error);
      showsContainer.innerHTML = `
        <div role="alert" aria-live="polite" class="error-message">
          <p>Unable to load show data. Please try again later.</p>
          <p class="error-details">Error: ${error.message}</p>
        </div>`;
    });

  /**
   * Renders all shows as styled tickets
   * @param {Array} shows - Array of formatted show data
   */
  function renderShows(shows) {
    if (shows.length === 0) {
      showsContainer.innerHTML = `
        <div class="no-shows-message" role="alert" aria-live="polite">
          <p>No upcoming shows at this time.</p>
          <p>Check back soon for new tour dates!</p>
        </div>`;
      return;
    }
    
    showsContainer.className = 'ticket-container';
    let showsHTML = '';
    
    shows.forEach((show, index) => {
      const ticketStyle = getStyleForVenue(show.venueName);
      const ticketId = `ticket-${index}`;
      const ticketClasses = `ticket ${ticketStyle}`;
      
      // Build ticket HTML with enhanced accessibility
      showsHTML += `
        <article class="${ticketClasses}" 
                 id="${ticketId}" 
                 role="article" 
                 aria-labelledby="${ticketId}-title ${ticketId}-venue"
                 tabindex="0">
          <div class="ticket-content">
            <div class="ticket-header">
              <div class="ticket-date" id="${ticketId}-title">
                <span class="sr-only">Show date: </span>${show.dayOfWeek}, ${show.date}
              </div>
              <div class="ticket-venue" id="${ticketId}-venue">
                <span class="sr-only">Venue: </span>${show.venueName}
              </div>
            </div>
            <div class="ticket-lineup" aria-label="Performance lineup">
              <div class="main-band" aria-label="Main act">Bandits on the Run</div>
              ${show.description && `
                <div class="other-bands" aria-label="Description">
                  ${show.description}
                </div>
              `}
            </div>
            <div class="ticket-details">
              <div class="ticket-location">
                <span class="sr-only">Location: </span>${show.location}, ${show.country}
              </div>
              <div class="ticket-time">
                <span class="sr-only">Show starts at: </span>${show.time}
              </div>
            </div>
            <div class="ticket-links" 
                 role="group" 
                 aria-label="Ticket and RSVP options for ${show.venueName}">
              ${show.ticketUrl ? `
                <a href="${show.ticketUrl}" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="ticket-button"
                   aria-label="Get tickets for ${show.venueName} on ${show.date} at ${show.time}">
                  Get Tickets
                </a>
              ` : `
                <a class="ticket-button disabled" 
                      role="status" 
                      aria-label="Tickets not available for this show">
                  No ticket link
                </a>
              `}
              ${show.rsvpUrl ? `
                <a href="${show.rsvpUrl}" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="ticket-button"
                   aria-label="RSVP for ${show.venueName} on ${show.date} at ${show.time}">
                  RSVP
                </a>
              ` : `
                <a class="ticket-button disabled" 
                      role="status" 
                      aria-label="RSVP not available for this show">
                  RSVP Unavailable
                </a>
              `}
            </div>
          </div>
          <div class="sr-only">
            Complete show information: Bandits on the Run at ${show.venueName} 
            on ${show.dayOfWeek}, ${show.date} at ${show.time}. 
            ${show.description && `${show.description}.`}
            ${show.location}, ${show.country}.
          </div>
        </article>
      `;
    });
    
    showsContainer.innerHTML = showsHTML;
  }
});
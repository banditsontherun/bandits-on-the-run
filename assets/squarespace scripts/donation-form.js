
// Squarespace Donation Form - Physical Media Toggle
// This seems to consistently find the eamountInput on load but then not if I run the function manually
// And it never manages to find the physical media options span 
(function() {
  function togglePhysicalMedia(donationAmount) {
    console.log("togglePhysicalMedia called with amount: ", donationAmount);

    // Find the span with "Physical Media Options" text
    const spans = Array.from(document.querySelectorAll('span'));
    const physicalMediaSpan = spans.find(
      span => span.textContent.trim() === 'Physical Media Options'
    );
    
    if (!physicalMediaSpan) {
        console.log("couldn't find physical media span");
        console.log(spans);
        return;
    }
    
    // Traverse up to the fieldset: span -> div -> div -> div -> legend -> fieldset
    const fieldset = physicalMediaSpan.closest('fieldset');
    if (!fieldset){
        console.log("couldn't find physical media fieldset");
        return;
    }

    const physicalMediaOuterDiv = fieldset.closest('div');
    if (!physicalMediaOuterDiv){
        console.log("couldn't find physical media div");
        return;
    }
    
    // Show/hide physicalMediaOuterDiv based on threshold
    if (donationAmount >= 50) {
      physicalMediaOuterDiv.style.display = 'block';
    } else {
      physicalMediaOuterDiv.style.display = 'none';
    }
  }
  
  // Watch for changes to the custom amount input
    const amountInput = document.querySelector('input[id*="custom-amount"][id*="-field"]') ||
                        document.querySelector('input[placeholder*="Custom Amount"]') ||
                        document.querySelector('input[name*="amount"]');
  console.log("amountInput: ", amountInput);
  if (amountInput) {
    amountInput.addEventListener('input', e => togglePhysicalMedia(e.target.value));
    amountInput.addEventListener('change', e => togglePhysicalMedia(e.target.value));
  }
  
  // Initial check on page load
  togglePhysicalMedia(amountInput?.value || 0);
})();
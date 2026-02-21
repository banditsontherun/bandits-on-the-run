---
---
// we need the front matter ^ so that jekyll parses out the newsletter URL for us below

const callToActions = [
    `Let your Bandits flag fly! Pick up some merch <a href="https://banditsontherunshop.com">at the store</a> 🛍️`,
    `Show your Bandits some love! Donate <a href="https://banditsontherunshop.com/donate">here</a> 💸`,
    `Want a pen pal? Sign up for <a href="{{ "/newsletter" | absolute_url }}">Little Letters</a> ✉️`,
    `And you have great hair 💁🏽‍♀️`,
];

document.addEventListener('DOMContentLoaded', function() {
    const cta = document.querySelector('#footer-cta');
    const index = Math.floor(Math.random() * callToActions.length);
    cta.innerHTML = "<em>" + callToActions[index] + "</em>";
});
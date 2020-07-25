/* (c) IGOR KOWALCZYK. All rights reserved. */

const toggletheme = document.querySelector('.theme-switch input[type="checkbox"]');
const currenttheme = localStorage.getItem('theme');
const meta = document.querySelector('meta[name="theme-color"]');
if (currenttheme) {
document.documentElement.setAttribute('data-theme', currenttheme);
if (currenttheme === 'dark') {
toggletheme.checked = true;
}
}
function switchtheme(e) {
if (e.target.checked) {
document.documentElement.setAttribute('data-theme', 'dark');
meta.setAttribute("content", "#222");
localStorage.setItem('theme', 'dark');
}
else {
document.documentElement.setAttribute('data-theme', 'light');
meta.setAttribute("content", "#ffffff");
localStorage.setItem('theme', 'light');
}
}
toggletheme.addEventListener('change', switchtheme, false);

document.addEventListener('click', function(event) {
if (event.target.tagName !== "A" || !event.target.href || event.target.target == "_blank" || event.target.classList == "anchor-link") return;
event.preventDefault();
var link = event.target;
document.body.style.opacity = 0;
document.body.addEventListener("transitionend", function() {
location.href = link.href;
});
});

var date = document.querySelector(".date");
date.innerHTML = (new Date().getFullYear());
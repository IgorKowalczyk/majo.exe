const dropdownel = document.getElementById("dropdown");
const droddownhead = document.getElementById("dropdownHead");
const blur = document.querySelector(".blur");

function dropdown(e) {
 if (dropdownel.style.visibility != "visible") {
  dropdownel.classList.toggle("dropdown-hidden");
  droddownhead.classList.toggle("dropdown-actived");
  blur.classList.toggle("visible");
 } else {
  dropdownel.classList.toggle("dropdown-hidden");
  blur.classList.toggle("visible");
 }
}

window.onresize = function() { 
  dropdownel.classList.remove("dropdown-hidden");
  droddownhead.classList.remove("dropdown-actived");
  blur.classList.remove("visible");
}

document.addEventListener("click", function(e) {
 if (!e.target.classList.contains("dropdownHead")) {
  let allDropdowns = document.querySelectorAll(".dropdown");
   [].forEach.call(allDropdowns, function(curr) {
   if (curr.style.visibility == "visible") {
    curr.classList.toggle("dropdown-hidden");
   }
  });
 }
});

blur.addEventListener('click', () => {
 dropdownel.classList.remove("dropdown-hidden");
 droddownhead.classList.remove("dropdown-actived");
 blur.classList.remove("visible");
})

const cross = document.querySelector(".cross");
cross.addEventListener('click', () => {
 dropdownel.classList.remove("dropdown-hidden");
 document.getElementById("dropdownHead").classList.remove("dropdown-actived");
 blur.classList.remove("visible");
})

document.addEventListener('click', function(event) {
 if (event.target.tagName !== "A" || !event.target.href || event.target.target == "_blank") return;
 event.preventDefault();
 var link = event.target;
 document.body.style.opacity = 0;
 document.body.addEventListener("transitionend", function() {
  location.href = link.href;
 });
});
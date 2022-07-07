const dropdownel = document.getElementById("dropdown");
const droddownhead = document.getElementById("dropdownHead");
const blur = document.querySelector(".blur");
const open_sidenav = document.getElementsByClassName("open-sidenav")[0];
const side_nav = document.getElementsByClassName("sidenav")[0];
const menu_open = document.getElementsByClassName("menu-icon")[0];

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

window.onresize = function () {
 if (!dropdownel) return console.info("Dropdown is not rendered");
 if (!droddownhead) return console.info("Dropdown head is not rendered");
 dropdownel.classList.remove("dropdown-hidden");
 droddownhead.classList.remove("dropdown-actived");
 blur.classList.remove("visible");
 side_nav.classList.remove("opened");
 if (menu_open) menu_open.classList.remove("disabled");
};

document.addEventListener("click", function (e) {
 if (!e.target.classList.contains("dropdownHead")) {
  let allDropdowns = document.querySelectorAll(".dropdown");
  [].forEach.call(allDropdowns, function (curr) {
   if (curr.style.visibility == "visible") {
    curr.classList.toggle("dropdown-hidden");
   }
  });
 }
});

blur.addEventListener("click", () => {
 if (!dropdownel) return console.info("Dropdown is not rendered");
 if (!droddownhead) return console.info("Dropdown head is not rendered");
 dropdownel.classList.remove("dropdown-hidden");
 droddownhead.classList.remove("dropdown-actived");
 blur.classList.remove("visible");
});

const cross = document.querySelector(".menu-icon");
cross.addEventListener("click", () => {
 if (!dropdownel) return console.info("Dropdown is not rendered");
 if (!blur) return console.info("Blur is not rendered");
 dropdownel.classList.remove("dropdown-hidden");
 document.getElementById("dropdownHead").classList.remove("dropdown-actived");
 blur.classList.remove("visible");
});

if (open_sidenav && side_nav) {
 open_sidenav.addEventListener("click", () => {
  if (menu_open) menu_open.classList.toggle("disabled");
  side_nav.classList.toggle("opened");
  blur.classList.add("visible");
 });
}

blur.addEventListener("click", () => {
 if (side_nav && side_nav.classList.contains("opened")) {
  if (menu_open) menu_open.classList.toggle("disabled");
  side_nav.classList.toggle("opened");
  blur.classList.remove("visible");
 }
});

/* document.addEventListener("click", function (event) {
 if (event.target.tagName !== "A" || !event.target.href || event.target.target == "_blank") return;
 event.preventDefault();
 var link = event.target;
 document.body.style.opacity = 0;
 document.body.addEventListener("transitionend", function () {
  location.href = link.href;
 });
});
*/

window.onload = function () {
 twemoji.parse(document.body, { folder: "svg", ext: ".svg" });
};

const c = document.querySelectorAll('input[type="switch"]');
for (var b = 0; b < c.length; b++) {
 const a = document.createElement("label");
 a.className = "switch-uQvapcxk";
 c[b].parentNode.insertBefore(a, c[b]);
 a.appendChild(c[b]);
 a.dataset.value = c[b].checked;
 c[b].type = "checkbox";
 c[b].oninput = function () {
  this.parentNode.dataset.value = this.checked;
 };
}

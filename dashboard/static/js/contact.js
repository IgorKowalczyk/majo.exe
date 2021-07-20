window.onload = () => {
 document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.getElementsByName("name")[0],
   email = document.getElementsByName("email")[0],
   msg = document.getElementsByName("message")[0];
  if (!msg || !msg.value) return msg.focus();
  var v = grecaptcha.getResponse();
  if (v.length == 0) {
   document.getElementById("captcha").innerHTML = "Invalid Captcha Attempt.";
   return false;
  }
  if (v.length != 0) {
   document.body.classList.add("done");
   fetch("/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     type: "contact",
     name: name.value || "Unknown",
     email: email.value || "Unknown",
     msg: msg.value,
     id: userID || "Unknown",
    }),
   }).then((res) => res.ok && document.body.classList.add("done"));
  }
 });
};

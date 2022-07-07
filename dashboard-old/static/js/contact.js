window.onload = () => {
 document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.getElementsByName("name")[0],
   email = document.getElementsByName("email")[0],
   msg = document.getElementsByName("message")[0];
  if (!msg || !msg.value) return msg.focus();
  var v = grecaptcha.getResponse();
  if (v.length == 0) {
   document.getElementById("captcha").innerHTML = "Invalid Captcha Attempt! Please refresh the page";
   return false;
  }
 });
};

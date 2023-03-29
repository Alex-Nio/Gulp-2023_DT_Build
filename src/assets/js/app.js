import * as loggerModule from "./modules";

loggerModule.logger();

const btn = document.querySelector(".test-btn");

btn.addEventListener("click", function(e) {
  alert("click");
});

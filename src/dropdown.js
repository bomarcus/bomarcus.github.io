var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    // Adjust this value to the scroll distance you want
    for (i = 0; i < coll.length; i++) {
      var content = coll[i].nextElementSibling;
      content.style.maxHeight = null;
    }
  }
});

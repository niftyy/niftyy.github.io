$(document).ready(function() {
  $(".progress .progress-bar").css("width", function() {
    return $(this).attr("aria-valuenow") + "%";
  });
});
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // current index of word
    const current = this.wordIndex % this.words.length;
    // get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting === true) {
      //remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    // insert into txt element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // typespeed
    let typeSpeed = 200;

    if (this.isDeleting) {
      typeSpeed /= 3;
    }
    // if word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause
      typeSpeed = 1000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex += 1;
      // pause before start typing
      typeSpeed = 500;
    }
    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

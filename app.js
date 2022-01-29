let burgerMenu = document.querySelector(".burger-menu");
let btnHeader = document.querySelector(".btn-header");
const spinner = document.getElementById("spinner");
let input = document.querySelector("#input-search");
let inputResult = document.querySelector(".input-result");
let inputCounter = document.querySelector(".input-counter");

burgerMenu.addEventListener("click", function () {
  burgerMenu.classList.toggle("active-menu");
  if (burgerMenu.classList.contains("active-menu")) {
    btnHeader.classList.add("active-menu");
  } else {
    btnHeader.classList.remove("active-menu");
  }
});

class FirstArticle {
  constructor(data, parent) {
    this.current = new Date();
    this.old = new Date(data[0].webPublicationDate);
    this.days = Math.ceil(
      Math.abs(this.old.getTime() - this.current.getTime()) / (1000 * 3600 * 24)
    );
    this.thumbnail = data[0].fields.thumbnail;
    this.headLine = data[0].fields.headline;
    this.trailText = data[0].fields.trailText;
    this.parent = document.querySelector(".root");
  }

  render() {
    let article = document.createElement("article");
    article.classList.add("top-news");
    article.innerHTML = `
 <div class="top-news-content">
  <div class="col-md-7">
    <div class="top-news-text-block">
    <h2>${this.headLine}</h2>
    <p>${this.trailText}</p>
    <div class="top-news-bottom-line"><p>${this.days} days ago</p><a>Read more</a></div>
  </div>
  </div>
  <div class="col-md-5">
  <div class="top-news-photo">
  <img src="${this.thumbnail}" />
  </div>
  </div>

</div>`;
    this.parent.append(article);
  }
}
class Articles {
  constructor(data, parent) {
    this.current = new Date();
    this.old = new Date(data.webPublicationDate);
    this.days = Math.ceil(
      Math.abs(this.old.getTime() - this.current.getTime()) / (1000 * 3600 * 24)
    );
    this.thumbnail = data.fields.thumbnail;
    this.headLine = data.fields.headline;
    this.trailText = data.fields.trailText;
    this.parent = document.querySelector(".root");
  }

  render() {
    let div = document.createElement("div");
    div.classList.add("col-md-4");
    div.innerHTML = `<article class="mains-news">
    <div class="mains-news-photo">
 <img src=${this.thumbnail}>
 </div>
<div class="mains-news-text-block">
<h2>${this.headLine}</h2>
    <p>${this.trailText}</p>
    <div class="mains-news-bottom-line"><p>${this.days} days ago</p><a>Read more</a></div>
</div>
</article>`;
    this.parent.append(div);
  }
}

class Article {
  constructor(data, parent) {
    this.current = new Date();
    this.old = new Date(data[0].webPublicationDate);
    this.days = Math.ceil(
      Math.abs(this.old.getTime() - this.current.getTime()) / (1000 * 3600 * 24)
    );
    this.thumbnail = `"background: url(${data[0].fields.thumbnail})center no-repeat fixed;background-size: cover;"`;
    this.headLine = data[0].fields.headline;
    this.trailText = data[0].fields.trailText;
    this.bylineHtml = data[0].fields.bylineHtml;
    this.body = data[0].fields.body;
    this.parent = document.querySelector(".root");
  }

  render() {
    let article = document.createElement("article");
    article.classList.add("article-page");
    article.innerHTML = `
    <div class="col-md-12">
    <div class='article-page-image' style=${this.thumbnail}></div>
    <div class="article-page-content">
    <div class="col-md-10">
    <div class="article-page-head-line">
    <h2>${this.headLine}</h2>
    <div class="article-page-head-line-2">
    <p class="article-page-head-line-author">Written by ${this.bylineHtml}</p>
    <p class="article-page-head-line-date">${this.days} days ago</p></div>
    </div>
    <div class="article-page-main-line">
    ${this.body}
    </div>
    </div>
    </div>
    </div>
 `;
    this.parent.append(article);
  }
}

let root = document.querySelector(".root");

function articlePageImg(img, categories) {
  spinner.removeAttribute("hidden");
  root.innerHTML = ``;
  fetch(
    `https://content.guardianapis.com/search?q=${categories}&show-tags=all&page-size=20&show-fields=all&order-by=relevance&api-key=5ef33414-1934-47dc-9892-5d09ab7c00da`
  )
    .then((response) => response.json())
    .then((response) => {
      let data = response.response.results;
      let article = data.filter((item) => item.fields.thumbnail === img);
      article.map(() => new Article(article, parent).render());
    });
  window.scroll(0, 0);
  input.value = "";
  spinner.setAttribute("hidden", "");
  searchArticle();
  inputCounter.classList.remove("show");
  inputResult.classList.remove("show");
}
function articlePageH2(h2, categories) {
  spinner.removeAttribute("hidden");
  root.innerHTML = ``;
  fetch(
    `https://content.guardianapis.com/search?q=${categories}&show-tags=all&page-size=20&show-fields=all&order-by=relevance&api-key=5ef33414-1934-47dc-9892-5d09ab7c00da`
  )
    .then((response) => response.json())
    .then((response) => {
      let data = response.response.results;
      let article = data.filter((item) => item.fields.headline === h2);
      article.map(() => new Article(article, parent).render());
    });
  window.scroll(0, 0);
  input.value = "";
  spinner.setAttribute("hidden", "");
  searchArticle();
  inputCounter.classList.remove("show");
  inputResult.classList.remove("show");
}

function inquiry(categories) {
  spinner.removeAttribute("hidden");
  fetch(
    `https://content.guardianapis.com/search?q=${categories}&show-tags=all&page-size=20&show-fields=all&order-by=relevance&api-key=5ef33414-1934-47dc-9892-5d09ab7c00da`
  )
    .then((response) => response.json())
    .then((response) => {
      let data = response.response.results;
      let current = new Date();
      let sorted = data.sort(function (a, b) {
        if (
          new Date(a.webPublicationDate).getTime() - current.getTime() >=
          new Date(b.webPublicationDate).getTime() - current.getTime()
        ) {
          return -1;
        } else {
          return 1;
        }
      });
      let first = [sorted[0]];
      let mainArticle = sorted.slice(1);
      first.map(() => new FirstArticle(first, parent).render());
      mainArticle.map((data, parent) => new Articles(data, parent).render());

      [...document.querySelectorAll(`img`)].forEach((item) => {
        item.addEventListener("click", function (e) {
          e.preventDefault();
          articlePageImg(item.src, categories);
        });
      });
      [...document.querySelectorAll(`.mains-news-text-block`)].forEach(
        (item) => {
          item.childNodes[5].childNodes[1].addEventListener(
            "click",
            function (e) {
              e.preventDefault();
              articlePageH2(item.childNodes[1].innerHTML, categories);
            }
          );
          item.childNodes[1].addEventListener("click", function (e) {
            e.preventDefault();
            articlePageH2(item.childNodes[1].innerHTML, categories);
          });
        }
      );

      let topNewsTextBlock = document.querySelector(`.top-news-text-block`);
      topNewsTextBlock.childNodes[5].childNodes[1].addEventListener(
        "click",
        function (e) {
          e.preventDefault();
          articlePageH2(topNewsTextBlock.childNodes[1].innerHTML, categories);
        }
      );
      topNewsTextBlock.childNodes[1].addEventListener("click", function (e) {
        e.preventDefault();
        articlePageH2(topNewsTextBlock.childNodes[1].innerHTML, categories);
      });
      spinner.setAttribute("hidden", "");
      input.value = "";
    });

  searchHome(categories);
}

inquiry("trending");

// New inquiry
function newInquiry(categories) {
  root.innerHTML = "";
  inquiry(categories);
}

let trending = document.querySelector("#trending");
let sport = document.querySelector("#sport");
let world = document.querySelector("#world");
let covid = document.querySelector("#covid");
let business = document.querySelector("#business");
let politics = document.querySelector("#politics");
let science = document.querySelector("#science");
let religion = document.querySelector("#religion");
let health = document.querySelector("#health");
let newsApp = document.querySelectorAll(`.news-app`);

function menuBtn(Btn) {
  Btn.addEventListener("click", function (e) {
    e.preventDefault();
    newInquiry(Btn.innerText);
    inputCounter.classList.remove("show");
    inputResult.classList.remove("show");
  });
}
newsApp.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    newInquiry("trending");
    inputCounter.classList.remove("show");
    inputResult.classList.remove("show");
  });
});

menuBtn(trending);
menuBtn(sport);
menuBtn(world);
menuBtn(covid);
menuBtn(business);
menuBtn(politics);
menuBtn(science);
menuBtn(religion);
menuBtn(health);

// Scroll to top

let scrollToTop = document.querySelector("#scroll-to-top");

window.addEventListener("scroll", function (e) {
  let last_known_scroll_position = window.scrollY;

  if (last_known_scroll_position > 300) {
    window.requestAnimationFrame(function () {
      scrollToTop.classList.add("fixed");
    });
  } else {
    scrollToTop.classList.remove("fixed");
  }
});

scrollToTop.addEventListener("click", function (e) {
  e.preventDefault();
  window.scroll(0, 0);
});

// Search

let inputSearchClosed = document.querySelector("#input-search-closed");

console.log(inputSearchClosed);

inputSearchClosed.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector("#input-search").value = "";
  inputResult.innerHTML = "";
  inputResult.classList.remove("show");
  inputCounter.classList.remove("show");
});

function searchArticle() {
  input.oninput = function () {
    let value = this.value.trim();
    const p = document.querySelectorAll(".root p");
    let h2 = document.querySelectorAll(".root h2");
    let a = document.querySelectorAll(".root a");
    let span = document.querySelectorAll(".root span");

    function search(e) {
      if (value != "") {
        inputSearchClosed.classList.add("show");
        e.forEach(function (element) {
          if (element.innerText.search(value) == -1) {
            element.innerHTML = element.innerText;
          } else {
            let str = element.innerText;
            element.innerHTML = insertMark(
              str,
              str.search(value),
              value.length
            );
          }
        });
      } else {
        e.forEach(function (element) {
          element.innerHTML = element.innerText;
        });
      }
    }
    search(p);
    search(h2);
    search(a);
    search(span);
    let mark = document.querySelectorAll("mark");

    if (value != "") {
      inputCounter.classList.add("show");
      if (mark.length == 0) {
        inputCounter.childNodes[0].innerText = `No exact matches found`;
      } else {
        inputCounter.childNodes[0].innerText = `${mark.length} coincidences`;
      }
    } else {
      inputCounter.classList.remove("show");
    }
  };

  function insertMark(string, pos, len) {
    return (
      string.slice(0, pos) +
      `<mark>` +
      string.slice(pos, pos + len) +
      "</mark>" +
      string.slice(pos + len)
    );
  }
}
function searchHome(categories) {
  input.oninput = function () {
    let value = this.value.trim();
    let h2 = document.querySelectorAll(".root h2");

    function search(e) {
      if (value != "") {
        inputSearchClosed.classList.add("show");
        inputResult.classList.add("show");
        inputResult.innerHTML = "";
        e.forEach(function (element) {
          if (element.innerText.search(value) == -1) {
          } else {
            let li = document.createElement("li");
            li.innerText = element.innerText.slice(0, 45) + "...";
            li.addEventListener("click", function (e) {
              e.preventDefault();
              articlePageH2(element.innerHTML, categories);
              inputResult.innerHTML = "";
              inputResult.classList.remove("show");
            });
            inputResult.append(li);
          }
        });
      } else {
        inputResult.innerHTML = "";
        inputResult.classList.remove("show");
      }
    }

    search(h2);
    let mark = document.querySelectorAll("mark");

    if (value != "") {
      if (mark.length == 0) {
      } else {
      }
    } else {
      inputResult.classList.remove("show");
    }
  };
}

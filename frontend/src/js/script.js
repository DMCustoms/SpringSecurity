let page = document.querySelector('.page');

let themeButtonDark = document.querySelector('.theme-button-dark');
let themeButtonLight = document.querySelector('.theme-button-light');

let fontButtonSansSerif = document.querySelector('.font-button-sans-serif');
let fontButtonSerif = document.querySelector('.font-button-serif');

let blogArticleList = page.querySelectorAll('.blog-article.short');

let cardViewButtonGrid = page.querySelector('.card-view-button-grid');
let cardViewButtonList = page.querySelector('.card-view-button-list');
let cards = page.querySelector('.cards');

let activePhoto = page.querySelector('.active-photo');

let photoList = page.querySelectorAll('.preview-list a');

themeButtonDark.onclick = function() {
    page.classList.add('dark');
    themeButtonDark.classList.add('active');
    themeButtonLight.classList.remove('active');
}

themeButtonLight.onclick = function() {
    page.classList.remove('dark');
    themeButtonDark.classList.remove('active');
    themeButtonLight.classList.add('active');
}

fontButtonSerif.onclick = function() {
    page.classList.add('serif');
    fontButtonSerif.classList.add('active');
    fontButtonSansSerif.classList.remove('active');
}

fontButtonSansSerif.onclick = function() {
    page.classList.remove('serif');
    fontButtonSerif.classList.remove('active');
    fontButtonSansSerif.classList.add('active');
}

for (let blogArticle of blogArticleList) {
    let moreButton = blogArticle.querySelector('.more');
    moreButton.onclick = function() {
        blogArticle.classList.remove('short');
    }
}

cardViewButtonGrid.onclick = function() {
    cards.classList.remove('list');
    cardViewButtonGrid.classList.add('active');
    cardViewButtonList.classList.remove('active');
}

cardViewButtonList.onclick = function() {
    cards.classList.add('list');
    cardViewButtonGrid.classList.remove('active');
    cardViewButtonList.classList.add('active');
}

for (let photo of photoList) {
    photo.onclick = function(evt) {
        evt.preventDefault();
        activePhoto.src = photo.href;
        let active = page.querySelector('.preview-list a.active-item');
        active.classList.remove('active-item');
        photo.classList.add('active-item');
    }
}
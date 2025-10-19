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

let authContainer = document.querySelector(".auth-container");

let signinForm = document.getElementById("form-signin");
let signupForm = document.getElementById("form-signup");

let authorizedUserContainer = document.querySelector(".authorized-user-container");
let authorizedUserName = document.querySelector(".authorized-user-container p");
let buttonSignout = document.querySelector(".authorized-user-container a");

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

buttonSignout.onclick = function() {
    localStorage.removeItem("token");
    window.location.reload();
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

async function setAuthorized() {
    let token = localStorage.getItem("token");
    if (token === null) {
        authContainer.classList.remove("not-visible");
        authorizedUserContainer.classList.add("not-visible");
    } else {
        const username = await getAuthorizationData(token);
        authorizedUserName.textContent = username;
        authContainer.classList.add("not-visible");
        authorizedUserContainer.classList.remove("not-visible");
    }
}

signinForm.onsubmit = async function(event) {
    event.preventDefault();
    const { elements } = signinForm;
    
    let credentials = new Object();

    Array.from(elements)
        .forEach((element) => {
        if (element.name === 'username') credentials.username = element.value;
        else if (element.name === 'password') credentials.password = element.value;
    })

    const authenticationResult = await sendSigninData(credentials);
    console.log(authenticationResult);
    if (authenticationResult === "Authentication failed") {
        alert("Идентификация не выполнена");
    } else {
        localStorage.setItem("token", authenticationResult);
        window.location.reload();
    }
}

signupForm.onsubmit = async function(event) {
    event.preventDefault();
    const { elements } = signupForm;

    let credentials = new Object();
      
    Array.from(elements)
        .forEach((element) => {
        if (element.name === 'username') credentials.username = element.value;
        else if (element.name === 'email') credentials.email = element.value;
        else if (element.name === 'password') credentials.password = element.value;
    })

    const registrationResult = await sendSignupData(credentials);
    if (registrationResult === "Choose different name") {
        alert("Пользователь с таким именем уже зарегистрирован");
    } else if (registrationResult === "Choose different email") {
        alert("Такой адрес электронной почты уже используется");
    } else {
        alert("Пользователь зарегистрирован");
        window.location.reload();
    }     
}

async function sendSigninData(credentials) {
    const response = await fetch('/signin', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json"
        }
      });
    
    const backendResponse = await response.json();
    return backendResponse.backendResponse.authenticationResult;
}

async function sendSignupData(credentials) {
    const response = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json"
        }
      });

    const backendResponse = await response.json();
    return backendResponse.backendResponse.registrationResult;
}

async function getAuthorizationData(token) {
    const response = await fetch('/user', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      });
    
    const backendResponse = await response.json();
    return backendResponse.backendResponse.username;
}

setAuthorized();
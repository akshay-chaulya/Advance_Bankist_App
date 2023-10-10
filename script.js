"use strict"


// ELEMENTS
// BUTTONS
const btnOpenAccounts = document.querySelectorAll(".btn--show-modal");
const btnModalClose = document.querySelector(".modal__close");
const btnMobileMenu = document.querySelector(".nav__mobile--menu");
const btnMobileMenuClose = document.querySelector(".nav__mobile--btn");
const btnMobilMenuLinks = document.querySelectorAll(".mobile__link");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const navLinks = document.querySelectorAll(".links");
const tabs = document.querySelectorAll(".operations__tab");
const nextBtn = document.querySelector(".slide__btn--right");
const previusBtn = document.querySelector(".slide__btn--left");


// CONTAINERS 
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const navMobile = document.querySelector(".nav__mobile")
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContents = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const sections = document.querySelectorAll(".section");
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".dots");

const featuresImg = document.querySelectorAll(".features__img");



// SCROLLBAR SET 
// window.onbeforeunload = function () {
//     window.scrollTo(0, 0);
// }

// FOR MOBAILE MENU LOGIC 
function closeMobileMenu() {
    navMobile.style.transform = "translateX(100%)"
    document.body.style.overflow = "visible"
}

function openMobileMenu() {
    navMobile.style.transform = "translateX(0)"
    document.body.style.overflow = "hidden"
}
btnMobileMenu.addEventListener("click", openMobileMenu)

btnMobileMenuClose.addEventListener("click", closeMobileMenu)

btnMobilMenuLinks.forEach(e => {
    e.addEventListener("click", closeMobileMenu)
})


// MODAL WINDOW 
function openModal(e) {
    e.preventDefault()
    overlay.classList.remove("hidden")
    // modal.removeAttribute("hidden", "hidden");
    modal.classList.remove("hidden")
}

function closeModal() {
    overlay.classList.add("hidden")
    // modal.setAttribute("hidden", "hidden");
    modal.classList.add("hidden")
}

btnOpenAccounts.forEach(btn => {
    btn.addEventListener("click", openModal)
})

btnModalClose.addEventListener("click", closeModal)
overlay.addEventListener("click", closeModal)

// ESCAP BUTTON CLICK EVENT'S
document.addEventListener("keydown", (e) => {
    if (
        e.key == 'Escape'
        && !modal.classList.contains("hidden")
        || getComputedStyle(document.body).overflow === "hidden"
    ) {
        closeModal()
        closeMobileMenu()
    }
})

console.log(document.querySelector(".slider").previousElementSibling)

// SMOOTH SCROLLING
btnScrollTo.addEventListener('click', (e) => {
    // OLD method to smooth scrolling

    // const s1coords = sections[0].getBoundingClientRect();
    // console.log("s1coords: ", s1coords)
    // console.log("the button position : ", e.target.getBoundingClientRect())

    // console.log('current scrooll (x/y): ' + window.pageXOffset, window.pageYOffset)

    // console.log("height width viwpor: "
    //     , document.documentElement.clientHeight
    //     , document.documentElement.clientWidth)

    // console.log(s1coords.top + window.pageYOffset)
    // window.scrollTo(
    //     s1coords.left + window.pageXOffset,
    //     s1coords.top + window.pageYOffset
    // )

    // window.scrollTo({
    //     left: s1coords.left + window.pageXOffset,
    //     top: s1coords.top + window.pageYOffset,
    //     behavior: 'smooth'
    // })

    // MORDAN Way to smooth scrolling
    sections[0].scrollIntoView({ behavior: 'smooth' })
})

// Page Navigation
// dcument.querySelectorAll('nav__link).forEach((el) => {
//     el.addEventListener("click", function (e) {
//         e.preventDefault();

//         const id = this.getAttribute('href');
//         document.querySelector(id).scrollIntoView({ behavior: "smooth" })
//     })
// })

// Page Navigation USING EVENT DELEGATION FOR
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
navLinks.forEach(links =>
    links.addEventListener("click", function (e) {
        e.preventDefault()

        // Matchig strategy
        if (e.target.classList.contains("link")) {
            const id = e.target.getAttribute('href');
            document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
        }
    })
)

// Building a Tabbed Component
tabsContainer.addEventListener("click", (e) => {
    const clicked = e.target.closest(".operations__tab");

    // Guard Clause
    if (!clicked) return;

    tabs.forEach(t => t.classList.remove("operations__tab--active"));
    tabsContents.forEach(c => c.classList.remove("operations__content--active"))

    clicked.classList.add("operations__tab--active")

    document.querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add("operations__content--active")
})

// Menu fade animation
function handelHover(e) {
    const siblings = document.querySelectorAll(".nav__link");
    const logo = document.querySelector("img")
    if (e.target.classList.contains("nav__link")) {
        const link = e.target;
        // const siblings = link.closest(".nav").querySelectorAll(".nav__link");
        // const logo = link.closest(".nav").querySelector("img");

        siblings.forEach(s => {
            if (s !== link) {
                s.style.opacity = this
            }
        })
        logo.style.opacity = this
    }
}
nav.addEventListener("mouseover", handelHover.bind(0.5))
nav.addEventListener("mouseout", handelHover.bind(1))

// Nav sticky 
// const intialCordinat = sections[0].getBoundingClientRect();
// window.addEventListener("scroll", () => {
//     if (window.scrollY > intialCordinat.top) nav.classList.add("sticky");
//     else nav.classList.remove("sticky")
// })

// Sticky navigation: Intersection Observer API

// const obsCallback = function (entries, observer) {
//     entries.forEach(entry => {
//         console.log(entry)
//     })
// }

// const obsOptions = {
//     root: null,
//     threshold: 0.1,
// }

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(sections[0])

const stikyNav = function (entries) {
    const [entry] = entries
    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky")
}
const navHeight = nav.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver(stikyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
})

headerObserver.observe(header);

// Revealing Elements on Scroll
const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return
    entry.target.classList.remove("section--hidden")
    observer.unobserve(entry.target)
}
sections.forEach(section => {
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    })
    section.classList.add("section--hidden")
    sectionObserver.observe(section);
})

// Lazy Loading Images
const lazyLoadImg = function (entries) {
    const [entry] = entries
    if (!entry.isIntersecting) return
    entry.target.src = entry.target.dataset.src

    entry.target.addEventListener("load", () => {
        entry.target.classList.remove("lazy-img")
    })

    imgObserve.unobserve(entry.target)
    // observer.disconnect(entry.target);
}

const imgObserve = new IntersectionObserver(lazyLoadImg, {
    root: null,
    threshold: 0,
})

featuresImg.forEach(img => {
    imgObserve.observe(img);
})


/* Impliment slider componat */
let currSlide = 0;
const maxSlide = slides.length - 1;
function slideing(x = 0) {
    slides.forEach((s, i) =>
        s.style.transform = `translateX(${(i - x) * 100}%)`)
}
slideing();

/* Next Slide */
function nextSlide() {
    if (currSlide === maxSlide) currSlide = 0;
    else currSlide++;

    slideing(currSlide);
    activateDot(currSlide)
}
/* Previus Slide */
function previusSlide() {
    if (currSlide === 0) currSlide = maxSlide;
    else currSlide--;

    slideing(currSlide);
    activateDot(currSlide)
}

/* When clicking the tow buttons */
nextBtn.addEventListener("click", nextSlide)
previusBtn.addEventListener("click", previusSlide)

/* When clicking the keybord arrow buttons */
document.addEventListener("keydown", (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    e.key === 'ArrowLeft' && previusSlide();
})

// Addings dots 
function creatingDots() {
    slides.forEach((_, i) => {
        dotsContainer.insertAdjacentHTML(
            "beforeend",
            `<button class="dots__dot" data-slide = ${i}></button>`
        )
    })
}
creatingDots();

// dots event
const dots = document.querySelectorAll(".dots__dot");
dotsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("dots__dot")) {
        const { slide } = e.target.dataset;
        slideing(slide)
        activateDot(slide)
    }
})

function activateDot(slide) {
    dots.forEach(dot => dot.classList.remove("dots__dot--active"))

    document.querySelector(`.dots__dot[data-slide = "${slide}"]`).
        classList.add("dots__dot--active")
}
activateDot(0);





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ********************* Advance consepts of DOM **********

// STYLING, CREATING AND DELETING ELEMENTS **************

// console.log(getComputedStyle(document.body).color)
// console.log(getComputedStyle(document.body).height)
// console.log(getComputedStyle(document.body).margin)

document.body.style.height =
    Number.parseInt(getComputedStyle(document.body).height) + 500 + "px";
// console.log(getComputedStyle(document.body).height)

// mouse events 
const h1 = document.getElementsByTagName("h1")[0];
// console.log(h1)
// h1.addEventListener("mouseover", (e) => {
//     console.log(e)
//     alert("You reading h1")
// })

function h1reading() {
    alert("You reading h1 move mouse")
}
// h1.addEventListener("mouseenter", h1reading)

// setTimeout(() => {
//     h1.removeEventListener("mouseenter", h1reading);
// }, 1000)

// BUBBLING AND CAPTURING *****************

// console.log(randomColor)
const randomInt = (min, max) => (Math.random() *
    (max - min + 1) + min);
const randomColor = () =>
    `rgba(
    ${randomInt(0, 255)}, 
    ${randomInt(0, 255)},
    ${randomInt(0, 255)}, 
    ${randomInt(0, -0.5)}
)`;
// document.querySelector(".nav__link").
//     addEventListener("click", function (e) {
//         this.style.backgroundColor = randomColor();
//         console.log("LINK ", e.target, e.currentTarget)
//         console.log(e.currentTarget == this)

//         // STOP PROPAGATION
//         // e.stopPropagation()
//     })

// document.querySelector(".nav__links").
//     addEventListener("click", function (e) {
//         this.style.backgroundColor = randomColor();
//         console.log("LINKS CONTAINER ", e.target, e.currentTarget)
//     }, true)

// document.querySelector(".nav").
//     addEventListener("click", function (e) {
//         this.style.backgroundColor = randomColor();
//         console.log("NAV ", e.target, e.currentTarget)
//     },
//         // for capturing phase
//         true
//         // defult value for bubbling phase
//         //fales
//     )
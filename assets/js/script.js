$(document).ready(function() {
    // Accordion drop-down for footer menus
    $(function() {
        $("#dropdown1").accordion({collapsible: true, active: false});
    });

    $(function() {
        $("#dropdown2").accordion({collapsible: true, active: false});
    });

    $(function() {
        $("#dropdown3").accordion({collapsible: true, active: false});
    });

    $(function() {
        $("#dropdown4").accordion({collapsible: true, active: false});
    });

    // Rotates dropdown chevrons on click
    $(".dropdown").click(function(){
        $(this).children().toggleClass("down")  ; 
    })

    // Like button animation
    $(".like").mouseenter(function(){
        $(this).animate({fontSize: "28px"}, "fast");
    })
    $(".like").mouseleave(function(){
        $(this).animate({fontSize: "24px"}, "fast");
    })
    $(".like").click(function(){
        $(this).animate({fontSize: "24px"}, {duration: 0});
        $(this).toggleClass("fa-heart-o").toggleClass("fa-heart").toggleClass("active");
    })
});

// Initialize arrays
let faqArr = [];
let quoteArr = [];
let faqLikeArr = [];
let quoteLikeArr = [];

// Adds item to saved items on like click, and remove on second click
function likeClick() {
    if (event.target.className.includes("fa-heart-o")) {
        // vvv Adds newly selected FAQ items to array
        if (event.target.parentNode.className.includes("faq-item")) {
            let likeItem = event.target.previousSibling.id;
            let faqItem = event.target.parentNode.outerHTML;
            if (JSON.parse(sessionStorage.getItem("faqArray")) !== null && JSON.parse(sessionStorage.getItem("faqLikeArray")) !== null) {
                faqArr = JSON.parse(sessionStorage.getItem("faqArray"));
                faqLikeArr = JSON.parse(sessionStorage.getItem("faqLikeArray"));
            }
            else {
                faqLikeArr = [];
                quoteLikeArr = [];
                faqArr = [];
                quoteArr = [];
            }
            faqArr.push(faqItem);
            faqLikeArr.push(likeItem);
            sessionStorage.setItem("faqArray", JSON.stringify(faqArr));
            sessionStorage.setItem("faqLikeArray", JSON.stringify(faqLikeArr));
            alert("You have " + faqArr.length + " saved questions.");
        }
        else { // Adds newly selected Quote items to array
            let likeItem = event.target.previousSibling.id;
            let quoteItem = event.target.parentNode.parentNode.parentNode.outerHTML;
            if (JSON.parse(sessionStorage.getItem("quoteArray")) !== null && JSON.parse(sessionStorage.getItem("quoteLikeArray")) !== null) {
                quoteArr = JSON.parse(sessionStorage.getItem("quoteArray"));
                quoteLikeArr = JSON.parse(sessionStorage.getItem("quoteLikeArray"));
            }
            else {
                faqLikeArr = [];
                quoteLikeArr = [];
                faqArr = [];
                quoteArr = [];
            }
            quoteArr.push(quoteItem);
            quoteLikeArr.push(likeItem);
            sessionStorage.setItem("quoteArray", JSON.stringify(quoteArr));
            sessionStorage.setItem("quoteLikeArray", JSON.stringify(quoteLikeArr));
            alert("You have " + quoteArr.length + " saved quotes.");
        }
    }
    else if (event.target.className.includes("fa-heart")) {
        // vvv Removes previously selected FAQ items from array
        if (event.target.parentNode.className.includes("faq-item")) {
            faqArr = JSON.parse(sessionStorage.getItem("faqArray"));
            faqLikeArr = JSON.parse(sessionStorage.getItem("faqLikeArray"));
            let index = faqLikeArr.indexOf(event.target.previousSibling.id);
            faqArr.splice(index, 1);
            faqLikeArr.splice(index, 1);
            sessionStorage.setItem("faqArray", JSON.stringify(faqArr));
            sessionStorage.setItem("faqLikeArray", JSON.stringify(faqLikeArr));
            alert("You have " + faqArr.length + " saved questions.");
        }
        else { // Removes previously selected Quote items from array
            quoteArr = JSON.parse(sessionStorage.getItem("quoteArray"));
            quoteLikeArr = JSON.parse(sessionStorage.getItem("quoteLikeArray"));
            let index = quoteLikeArr.indexOf(event.target.previousSibling.id);
            quoteArr.splice(index, 1);
            quoteLikeArr.splice(index, 1);
            sessionStorage.setItem("quoteArray", JSON.stringify(quoteArr));
            sessionStorage.setItem("quoteLikeArray", JSON.stringify(quoteLikeArr));
            alert("You have " + quoteArr.length + " saved quotes.");
        }
    }
}

// Loads saved items from sessionstorage and removes the like element, and adds a style class to the card items for better visibility
function loadSaved() {
    if (JSON.parse(sessionStorage.getItem("faqArray")) !== null) {
        faqArr = JSON.parse(sessionStorage.getItem("faqArray"));
    }
    else {
        faqArr = [];
    }
    for (let i = 0; i < faqArr.length; i++) {
        if (faqArr[i] != null) {
            let faqSection = document.querySelector("#questions");
            faqSection.innerHTML += faqArr[i];
            let like = document.querySelector(".like");
            like.remove();
        }
    }

    if (JSON.parse(sessionStorage.getItem("quoteArray")) !== null) {
        quoteArr = JSON.parse(sessionStorage.getItem("quoteArray"));
    }
    else {
        quoteArr = [];
    }
    for (let i = 0; i < quoteArr.length; i++) {
        if (quoteArr[i] != null) {
            let quoteSection = document.querySelector("#quotes");
            quoteSection.innerHTML += quoteArr[i];
            let like = document.querySelector(".like");
            like.remove();
            let cards = document.querySelectorAll(".card");
            Array.from(cards).forEach(function(c){
                c.classList.add("saved-card");
                c.classList.remove("border-0");
                c.classList.remove("rounded-0");
            });
        }
    }
}

// Loads like button state from sessionstorage for FAQ
function loadFAQ() {
    if (sessionStorage.getItem("faqLikeArray") !== null) {
        faqLikeArr = JSON.parse(sessionStorage.getItem("faqLikeArray"));
    }
    else {
        faqLikeArr = [];
    }
    if (faqLikeArr.length > 0) {
        for (let i = 0; i < faqLikeArr.length; i++) {
            let like = document.getElementById(faqLikeArr[i]);
            like.nextSibling.classList.remove("fa-heart-o");
            like.nextSibling.classList.add("fa-heart");
        }
    }
}

// Loads like button state from sessionstorage for Testimonials
function loadTestimonials() {
    if (sessionStorage.getItem("quoteLikeArray") !== null) {
        quoteLikeArr = JSON.parse(sessionStorage.getItem("quoteLikeArray"));
    }
    else {
        quoteLikeArr = [];
    }
    if (quoteLikeArr.length > 0) {
        for (let i = 0; i < quoteLikeArr.length; i++) {
            let like = document.getElementById(quoteLikeArr[i]);
            like.nextSibling.classList.remove("fa-heart-o");
            like.nextSibling.classList.add("fa-heart");
        }
    }
}

var header = document.querySelector("header");
var logo_img = document.querySelector("#logo_img");
var initial_header_class = header.className;

function check_scroll_position() {
    var scroll_top = window.pageYOffset || document.documentElement.scrollTop;

    if (scroll_top > 0) {
        set_dark_header();
        header.className = header.className + " scrolling";
    } else {
        if (initial_header_class === "dark") {
            set_dark_header();
        } else {
            set_light_header();
        }
    }
}

function set_dark_header() {
    header.className = "dark";
    logo_img.src = "img/logo/logo_textuel_clair.png";
}

function set_light_header() {
    header.className = "";
    logo_img.src = "img/logo/logo_textuel_fonce.png";
}

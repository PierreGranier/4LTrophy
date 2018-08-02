
var body = document.querySelector("body");

/* Header handle */

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

/* Board display */

var board = document.querySelector("board");
var left_wall = board.querySelectorAll("wall")[0].querySelector("div");
var right_wall = board.querySelectorAll("wall")[1].querySelector("div");
var backgrounds = ["rgb(50, 50, 50)", "darkgreen", "darkgoldenrod", "purple"];

var apple = new Brand("Apple", "apple.png", 150, "10/05/2018", "Notre premier sponsor !", random_background());
var redbull = new Brand("Red Bull", "redbull.png", 150, "10/05/2018", "azd", random_background());
var google = new Brand("Google", "google.png", 150, "10/05/2018", "Youtube google lévidéo toussa", random_background());

var left_wall_brands = [apple, redbull, redbull, google, apple, apple];
var right_wall_brands = [google, redbull, apple, google, redbull, apple];

display_brands();
function display_brands() {
    // Left wall

    append_brands(left_wall, left_wall_brands, 0, "invisible");
    reveal_brands(left_wall, 0);
    // grow_brands(left_wall);
    
    // Right wall

    append_brands(right_wall, right_wall_brands, 0, "small");
    // reveal_brands(right_wall, 0);
    grow_brands(right_wall);


    setTimeout(function() {
        var id = 0;
        for (brand of left_wall.children) {
            var animation_class = (id / 3 >= 1) ? "deux" : "un";
            brand.className = brand.className + " " + animation_class;
            ++id;
        }
        id = 0;
        for (brand of right_wall.children) {
            var animation_class = (id / 3 >= 1) ? "deux" : "un";
            brand.className = brand.className + " " + animation_class;
            ++id;
        }
    }, 700);
}

function random_background() {
    return backgrounds[Math.floor(Math.random() * backgrounds.length)];
}

function append_brands(wall, brands, brands_added, class_name) {
    var last_brand_dom = null;
    for (brand of brands) {
        last_brand_dom = brand.to_dom();
        last_brand_dom.className = class_name;
        wall.appendChild(last_brand_dom);
    }

    if (last_brand_dom) {
        var brand_width = parseInt(window.getComputedStyle(last_brand_dom).width);
        var brand_height = parseInt(window.getComputedStyle(last_brand_dom).height);
        var brand_margin = parseInt(window.getComputedStyle(last_brand_dom).marginRight);
        wall.style.width = Math.ceil(Math.sqrt(brands.length)) * (brand_width + brand_margin * 4) + "px"; // * 2 mais ca passe pas, y'a 2px manquants, donc * 4
    }
}

function reveal_brands(wall, brands_revealed) {
    var brand = wall.childNodes[brands_revealed];

    brand.className = "visible";
    ++brands_revealed;
    
    if (brands_revealed < wall.childNodes.length) {
        setTimeout(function() {
            reveal_brands(wall, brands_revealed);
        }, 100);
    }
}

function grow_brands(wall) {
    var brands = wall.children;

    setTimeout(function() {
        for (brand of brands) {
            brand.style.transform = "scale(1.1, 1)";
        }

        setTimeout(function() {
            for (brand of brands) {
                brand.style.transform = "scale(1, 1.1)";
            }

            setTimeout(function() {
                for (brand of brands) {
                    brand.style.transform = "";
                    brand.className = "normal";
                }
            }, 100);
        }, 100);
    }, 250);
}

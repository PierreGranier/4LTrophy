/**
 * Vuer (viewer) transforme un noeud HTML composé d'éléments en véritable visonneuse de diapositives
 */

class Vuer {

    constructor(dom, maximize) {
        this.parent = dom;

        this.maximize = maximize; // width || height

        this.slides = this.parent.children;

        this.format_parent();

        this.windows = [];
        this.format_slides();
        
        this.controls = document.createElement("controls");
        this.parent.appendChild(this.controls);
        this.format_controls();

        this.content = document.createElement("content");
        this.parent.appendChild(this.content);
        this.format_content();
    }

    format_parent() {
        this.parent.style.display = "flex";
    }
    
    format_slides() {
        while (this.slides.length > 0) {
            var slide = this.slides[0];
            slide.style.userSelect = "none";

            var window = document.createElement("window");
                window.style.flex = "1";
                window.style.display = "flex";
                window.style.justifyContent = "center";
                window.style.alignItems = "center";
                window.style.minWidth = "100%";
                window.style.maxWidth = "100%";
                window.style.background = "black";
                window.style.transition = "all .8s ease";
                window.style.userSelect = "none";

            window.appendChild(slide);

            if (this.maximize === "height") {
                slide.style.width = "auto";
                slide.style.height = "100vh";
            } else if (this.maximize === "width") {
                slide.style.width = "100%";
            }
            
            this.windows.push(window);
        }
    }

    format_content() {
        for (var window of this.windows) {
            this.content.appendChild(window);
        }

        this.content.style.flex = "1";
        this.content.style.position = "relative";
        this.content.style.display = "flex";
        this.content.style.flexDirection = "row";
        this.content.style.flexWrap = "nowrap";
        this.content.style.height = "100vh";
        this.content.style.overflow = "hidden";
        this.content.style.userSelect = "none";

        this.content.moving = false;
        this.content.position = 0;
    }

    format_controls() {
        this.controls.style.flex = "1";
        this.controls.style.position = "absolute";
        this.controls.style.display = "flex";
        this.controls.style.flexDirection = "row";
        this.controls.style.justifyContent = "space-between";
        this.controls.style.height = "100vh";
        this.controls.style.width = "100%";
        this.controls.style.userSelect = "none";

        /* Left control and his arrow */

        this.left_control = document.createElement("control");
        this.format_control(this.left_control);
        this.controls.appendChild(this.left_control);

        var left_arrow = document.createElement("arrow");
        this.format_arrow(left_arrow);
        this.left_control.appendChild(left_arrow);

        this.left_control.addEventListener("click", function(event) { Vuer.handle_control(event, "to_left"); });

        /* Summary */

        this.summary = document.createElement("summary");
        this.summary.style.display = "flex";
        this.summary.style.flexDirection = "column";
        this.summary.style.justifyContent = "flex-end";
        this.summary.style.paddingBottom = "5vh";
        this.summary.style.color = "white";
        this.summary.style.zIndex = "500";

        this.controls.appendChild(this.summary);

        var items = document.createElement("items");
        items.style.display = "flex";
        items.style.flexDirection = "row";

        for (var i = 0; i < this.windows.length; ++i) {
            var item = document.createElement("item");
            item.style.width = "15px";
            item.style.height = "15px";
            item.style.margin = "5px";
            item.style.border = "1px solid rgba(255, 255, 255, 0.4)";
            item.style.background = "black";
            item.style.borderRadius = "50%";
            item.style.cursor = "pointer";
            item.style.opacity = "0.5";

            item.goto = i;

            item.addEventListener("click", function(event) { Vuer.handle_control(event, "go_to"); });

            items.appendChild(item);
        }

        items.childNodes[0].style.background = "white";

        this.summary.appendChild(items);

        /* Right control and his arrow */

        this.right_control = document.createElement("control");
        this.format_control(this.right_control);
        this.controls.appendChild(this.right_control);
        
        var right_arrow = document.createElement("arrow");
        this.format_arrow(right_arrow);
        this.right_control.appendChild(right_arrow);
        this.right_control.style.transform = "rotate(180deg)";

        this.right_control.addEventListener("click", function(event) { Vuer.handle_control(event, "to_right"); });
    }

    format_control(control) {
        control.style.display = "flex";
        control.style.flexDirection = "column";
        control.style.justifyContent = "space-around";
        control.style.height = "100vh";
        control.style.cursor = "pointer";
        control.style.opacity = "0.2";
        control.style.transition = "all .3s ease";
        control.style.zIndex = "500";
        control.style.userSelect = "none";

        control.addEventListener("mouseover", function(event) { Vuer.handle_control(event, "over"); });
        control.addEventListener("mouseleave", function(event) { Vuer.handle_control(event, "out"); });
    }

    format_arrow(arrow) {
        arrow.style.display = "block";
        arrow.style.width = "30px";
        arrow.style.height = "30px";
        arrow.style.margin = "100px";
        arrow.style.border = "15px solid white";
        arrow.style.borderRadius = "5px";
        arrow.style.userSelect = "none";

        arrow.style.borderRight = "0px";
        arrow.style.borderBottom = "0px";
        arrow.style.transform = "rotate(-45deg)";
    }
    
    static update_position(content, increment) {
        if (!content.moving) {
            content.moving = true;

            /* Set the position attribute */

            var new_pos = content.position + increment;
            if (new_pos > 0) {
                new_pos = - content.childNodes.length + 1;
            } else if (new_pos <= - content.childNodes.length) {
                new_pos = 0;
            }

            content.position = new_pos;

            /* Position the slide */

            content.querySelector("window").style.marginLeft = content.position * 100 + "%";

            /* Change the control */

            var items = content.parentNode.querySelector("controls summary items").childNodes;
            for (var item of items) {
                item.style.background = "black";
            }
            items[Math.abs(new_pos)].style.background = "white";

            /* Position the window */

            var parent = content.parentNode; while (parent.id === "") parent = parent.parentNode;
            window.location = "#"+  parent.id;

            /* Timeout during the animation */

            setTimeout(function() {
                content.moving = false;
            }, 700);
        }
    }

    static handle_control(event, action) {
        var control = event.target;

        switch (action) {
            case "over":
                control.style.opacity = "0.6";
                control.style.background = "linear-gradient(to right, rgba(0, 0, 0 ,0.6), transparent)";
                break;
            case "out":
                control.style.opacity = "0.2";
                control.style.background = "transparent";
                break;
            case "to_left":
                var first_window = control.parentNode.parentNode.parentNode.querySelector("window");
                var content = first_window.parentNode;
                Vuer.update_position(content, +1);
                break;
            case "to_right":
                var first_window = control.parentNode.parentNode.parentNode.querySelector("window");
                var content = first_window.parentNode;
                Vuer.update_position(content, -1);
                break;
            case "go_to":
                var content = control.parentNode.parentNode.parentNode.parentNode.querySelector("content");
                Vuer.update_position(content, Math.abs(content.position) - control.goto);
                break;
        }
    }

}

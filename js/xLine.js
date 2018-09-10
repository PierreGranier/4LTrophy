
class xLine {

    constructor(dom, color, precision) {
        this.first_timeline = dom;
        this.second_timeline = null;

        this.color = color;
        this.puces_colors = [ "rgb(155, 29, 11)", "rgb(63, 103, 36)", "rgb(207, 70, 71)", "rgb(61, 103, 180)", "rgb(72, 83, 102)", "rgb(172, 23, 102)", "rgb(221, 183, 52)", "rgb(209, 37, 36)"];

        this.months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        this.precision = precision; // month, day

        this.format_timelines();
        this.format_events();
    }

    format_timelines() {
        /* Style the timelines */

        this.first_timeline.style.display = "flex";
        this.first_timeline.style.flexDirection = "row";
        this.first_timeline.style.height = "auto";
        this.first_timeline.style.width = "100%";

        this.second_timeline = this.first_timeline.cloneNode();

        /* Separate events on two time lines */

        this.second_timeline.appendChild(document.createElement("event"));
        for (var i = 1; i < this.first_timeline.children.length; i++) {
            var event = this.first_timeline.children[i];
            this.first_timeline.removeChild(event);
            this.second_timeline.appendChild(event);
        }
        this.first_timeline.appendChild(document.createElement("event"));

        this.first_timeline.parentNode.appendChild(this.second_timeline);

        /* Style of timelines */

        this.first_timeline.style.borderBottom = "2px solid " + this.color;
    }

    format_events() {
        var events = [];
        for (event of this.first_timeline.children) events.push(event);
        for (event of this.second_timeline.children) events.push(event);

        var valid_event_id = 0;

        for (var i = 0; i < events.length; ++i) {
            var event = events[i];
            var event_color = this.puces_colors[valid_event_id % this.puces_colors.length];

            /* Style the event */

            event.style.flex = "1";
            event.style.display = "flex";
            event.style.flexDirection = "column";
            event.style.justifyContent = "space-between";
            // event.style.margin = "20px";
            event.style.padding = "0 20px";
            // event.style.background = "rgba(0, 0, 0, 0.1)";

            /* Event date */
            
            var attr_date = event.getAttribute("date");
            var date_obj = null;
            var date = document.createElement("date");
            if (attr_date) {
                var date_array = attr_date.split("/");
                date_obj = new Date(date_array[1] + "/" + date_array[0] + "/" + date_array[2]);

                date.style.color = event_color;
                date.style.fontWeight = "bold";
                date.innerHTML = this.months[date_obj.getMonth()].toUpperCase();
                if (this.precision === "day") {
                    date.innerHTML = date.innerHTML;
                }
            }

            /* Event description */

            var description = document.createElement("descr");
                description.style.padding = "15px 0";
                description.style.padding = "15px 0";
                description.style.lineHeight = "130%";
                description.style.fontSize = "85%";
                description.style.fontFamily = "Arial";
                description.style.textAlign = "center";
                description.style.opacity = "0.7";
                description.innerHTML = event.innerHTML.toUpperCase();
                event.innerHTML = "";

            /* Event puce */

            var puce = document.createElement("puce");
                puce.style.display = "flex";
                puce.style.flexDirection = "column";

            /* Event puce circle */

            var circle = document.createElement("circle");
                circle.style.width = "20px";
                circle.style.height = "20px";
                circle.style.background = event_color;
                circle.style.borderRadius = "50%";

            /* Event puce line */

            var line = document.createElement("line");
                line.style.width = "2px";
                line.style.height = "40px";
                line.style.margin = "0 auto";
                line.style.background = event_color;

            /* Append description and puce */

            if (description.innerHTML !== "") {
                if (i < events.length / 2) {
                    event.appendChild(date);
                    event.appendChild(description);
                    puce.appendChild(line);
                    puce.appendChild(circle);
                    event.appendChild(puce);
                    // event.style.borderTop = "3px solid " + event_color;
                    circle.style.margin = "0 auto -11px auto"; /* - (width + timeline border width) / 2 + event margin */
                } else {
                    puce.appendChild(circle);
                    puce.appendChild(line);
                    event.appendChild(puce);
                    event.appendChild(description);
                    event.appendChild(date);
                    // event.style.borderBottom = "3px solid " + event_color;
                    circle.style.margin = "-11px auto 0 auto"; /* - (width + timeline border width) / 2 + event margin */
                }

                valid_event_id++;
            }

            /* Color the event if the date is past */

            // if (new Date() > date_obj && description.innerHTML !== "") {
            //     if (i < events.length / 2) {
            //         event.style.boxShadow = "0 2px 0 red";
            //     } else {
            //         event.style.boxShadow = "0 -2px 0 red";
            //     }
            // }
        }

        this.first_timeline.lastChild.style.flex = "0.5";
        this.second_timeline.firstChild.style.flex = "0.5";
    }

}

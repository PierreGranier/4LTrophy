
class xLine {

    constructor(dom, color, color_2) {
        this.timeline = dom;
        this.color = color;
        this.color_2 = color_2;

        this.events = this.timeline.children;

        this.format_timeline();
        this.format_events();
    }

    format_timeline() {
        this.timeline.style.display = "flex";
        this.timeline.style.flexDirection = "row";
        this.timeline.style.height = "auto";
        this.timeline.style.width = "100%";
        this.timeline.style.borderBottom = "5px solid " + this.color;
    }

    format_events() {
        for (var event of this.events) {
            event.style.flex = "1";
            event.style.display = "flex";
            event.style.flexDirection = "column";
            event.style.justifyContent = "flex-end";

            /* Event date */
            
            var date = event.getAttribute("date");
            var date_array = date.split("/");
            date = new Date(date_array[1] + "/" + date_array[0] + "/" + date_array[2]);

            /* Event description */

            var description = document.createElement("descr");
                description.style.textAlign = "center";
                description.innerHTML = event.innerHTML;
                event.innerHTML = "";

            event.appendChild(description);

            /* Event puce */

            var puce = document.createElement("puce");
                puce.style.margin = "12.5px auto -12.5px auto"; /* - (width + timeline border width) / 2 */
                puce.style.width = "20px";
                puce.style.height = "20px";
                puce.style.background = this.color;
                puce.style.borderRadius = "50%";

            event.appendChild(puce);

            
            if (new Date() > date) {
                puce.style.background = this.color_2;
                event.style.boxShadow = "0 5px 0 0 " + this.color_2;
            }
        }
    }

}



// #timeline event + event {
//   margin-left: 10px;
// }

// #timeline event:first-child, #timeline event:last-child {
//   flex: 0;
// }
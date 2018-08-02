
class Brand {

    constructor(name, image, amount, date, description, background) {
        this.name = name;
        this.image = "img/brands/" + image;
        this.amount = amount;
        this.date = date;
        this.description = description;
        this.background = background;
    }

    to_dom() {
        var brand = document.createElement("brand");
        brand.style.backgroundImage = "url('" + this.image + "')";

            var content = document.createElement("div");
            brand.appendChild(content);
            
                var title = document.createElement("h2");
                title.innerHTML = this.name;
                content.appendChild(title);

                var div = document.createElement("div");
                content.appendChild(div);
                
                    var p = document.createElement("p");
                    p.innerHTML = this.amount + " €";
                    p.innerHTML += "<br>" + this.date;
                    div.appendChild(p);
                
                    var p = document.createElement("p");
                    p.innerHTML += this.description;
                    div.appendChild(p);

        return brand;
    }
}

ajax("https://api.instagram.com/v1/users/self/media/recent/?access_token=8577676532.8e57768.8db226475a104da596462d989843d081", instagram_medias, null);

var dom = document.querySelector("azdza");

function instagram_medias(json, args) {
    var medias = JSON.parse(json);

    console.log(medias);

    for (media_id in medias.data) {
        var timestamp = medias.data[media_id].caption.created_time;
        var description = medias.data[media_id].caption.text;
        var image_url = medias.data[media_id].images.standard_resolution.url;
        
        var image_dom = document.createElement("img");
        image_dom.src = image_url;
        dom.appendChild(image_dom);
    }

    new Vuer(dom);
}

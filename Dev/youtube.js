var uploadsContainer = document.querySelector('#section-youtube .card-container');
var nextPage;

function uploads(nextPageToken){
    fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyAdgaQTvzBpamUf81RIJLDY3kI7Y7NHMX8&channelId=UCabBd1g8nBWWCx2YT4yeXOA&part=snippet,id&order=date&maxResults=50&pageToken${nextPageToken}`)
        .then(res => res.json())
        .then(data => {
            nextPage = data.nextPageToken;
            let videos = data.items;
            console.log(data);
            for(video of videos){
                if(video.id.kind === "youtube#video"){
                    let title = document.createElement("h3");
                    title.innerHTML = video.snippet.title;

                    let text = document.createElement("p");
                    text.innerHTML = video.snippet.description;

                    let description = document.createElement("div");
                    description.appendChild(title);
                    description.appendChild(text);
                    description.className = "card-description";

                    let image = document.createElement("img");
                    image.src = video.snippet.thumbnails.high.url;
                    image.draggable = "false";
                    
                    let content = document.createElement("div")
                    content.className="card-content"
                    content.appendChild(image)

                    // let link = document.createElement("a");
                    // link.href = `https://www.youtube.com/watch?v=${video.id.videoId}`
                    // link.appendChild(image);
                    // link.appendChild(text);

                    let container = document.createElement("div");
                    container.className = "card";
                    container.appendChild(content);
                    container.appendChild(description)
                    uploadsContainer.appendChild(container);

                }
            }
            if(nextPage){
                uploads(nextPage);
            }
        })
}

uploads(nextPage);


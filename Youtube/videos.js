var uploadsContainer = document.getElementById('flexContainer');
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
                    let title = document.createElement("h4");
                    title.innerHTML = video.snippet.title;

                    let description = document.createElement("p");
                    description.innerHTML = video.snippet.description;
                    description.className = "secondary";

                    let text = document.createElement("div");
                    text.appendChild(title);
                    text.appendChild(description);
                    text.className = "description";

                    let image = document.createElement("img");
                    image.src = video.snippet.thumbnails.high.url;
                    image.width = "40px";
                    image.draggable = "false";

                    let link = document.createElement("a");
                    link.href = `https://www.youtube.com/watch?v=${video.id.videoId}`
                    link.appendChild(image);
                    link.appendChild(text);

                    let container = document.createElement("div");
                    container.className = "flexItems";
                    container.appendChild(link);
                    uploadsContainer.appendChild(container);

                }
            }
            if(nextPage){
                uploads(nextPage);
            }
        })
}

uploads(nextPage)

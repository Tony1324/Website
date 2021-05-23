var savedVideos = JSON.parse(localStorage.getItem("youtube-videos"))
var previousSavedTime = parseInt(localStorage.getItem("youtube-videos-time"))
var uploadsContainer = document.querySelector('#section-youtube .card-container');
var nextPage;

function addVideos(data){
    nextPage = data.nextPageToken;
    let videos = data.items;
    for(video of videos){
        if(video.id.kind === "youtube#video"){
            let title = document.createElement("h3");
            title.innerHTML = video.snippet.title;

            let text = document.createElement("p");
            text.innerHTML = video.snippet.description;

            let description = document.createElement("a");
            description.appendChild(title);
            description.appendChild(text);
            description.className = "card-description";
            let videoId = video.id.videoId
            description.href = `https://www.youtube.com/watch?v=${videoId}`
            description.target = `_blank`

            let image = document.createElement("img");
            image.src = video.snippet.thumbnails.high.url;
            image.draggable = "false";

            let content = document.createElement("div")
            content.className="card-content"
            content.appendChild(image)

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
} 

function uploads(nextPageToken){
    if(savedVideos && (Date.now() - previousSavedTime) < 3600000){
        addVideos(savedVideos)
        console.log("loading saved", Date.now() - previousSavedTime)
    }else{
        fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyAdgaQTvzBpamUf81RIJLDY3kI7Y7NHMX8&channelId=UCabBd1g8nBWWCx2YT4yeXOA&part=snippet,id&order=date&maxResults=50&pageToken${nextPageToken}`)
            .then(res => res.json())
            .then(data => {
                addVideos(data)
                localStorage.setItem("youtube-videos-time", Date.now())
                localStorage.setItem("youtube-videos", JSON.stringify(data))
            })    
        console.log("fetching data")
    }
}

uploads(nextPage);



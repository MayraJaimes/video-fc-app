import React, { useState } from "react";
import Searchbar from "./components/Searchbar";
import youtube from "./apis/youtube";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetail";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleSubmit = async (termFromSearchBar) => {
    const response = await youtube.get("/search", {
      params: { q: termFromSearchBar },
    });

    console.log("RESPONSE", response);

    setVideos(response.data.items);
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="ui container" style={{ marginTop: "1em" }}>
      <Searchbar handleFormSubmit={handleSubmit} />
      <div className="ui grid">
        <div className="ui row">
          <div className="eleven wide column">
            <VideoDetail video={selectedVideo} />
          </div>
          <div className="five wide column">
            <VideoList handleVideoSelect={handleVideoSelect} videos={videos} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

//Resource: https://blog.bitsrc.io/make-a-simple-react-app-with-using-youtube-api-68fa016e5a03
//Resource git: https://github.com/anarsultani97/modern-react-redux/blob/master/src/components/VideoItem.js

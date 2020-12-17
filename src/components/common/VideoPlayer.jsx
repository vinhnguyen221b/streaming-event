import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "../../videojs.css";

const VideoPlayer = ({ src }) => {
  const videoPlayerRef = useRef(null); // Instead of ID
  const videoSrc = src;
  const videoJSOptions = {
    fill: true,
    fluid: true,
    preload: "auto",
    autoplay: true,
    controls: true,
    userActions: { hotkeys: true },
    playbackRates: [0.5, 1, 1.5, 2],
  };

  useEffect(() => {
    if (videoPlayerRef) {
      const player = videojs(videoPlayerRef.current, videoJSOptions, () => {
        player.src(videoSrc);
        player.on("ended", () => {
          console.log("ended");
        });

        // console.log("Player Ready");
      });
    }

    return () => {};
  }, []);

  return (
    <div>
      <video
        style={{ width: "100%" }}
        ref={videoPlayerRef}
        className="video-js"
      />
    </div>
  );
};

export default VideoPlayer;

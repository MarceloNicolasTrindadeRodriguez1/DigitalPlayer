import React, { useEffect, useRef } from "react";
import videojs from "video.js"; // Import Video.js
import "video.js/dist/video-js.css"; // Import Video.js CSS

const VideoPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null); // Ref for the video DOM element
  const playerRef = useRef(null); // Ref for the Video.js player instance

  useEffect(() => {
    // Initialize the Video.js player
    playerRef.current = videojs(videoRef.current, {
      liveui: true,
      html5: {
        hls: {
          withCredentials: false, // Avoid sending credentials
        },
      },
    });

    // Ensure the video URL uses HTTPS if possible
    const secureVideoUrl = videoUrl.startsWith("https://")
      ? videoUrl
      : videoUrl.replace("http://", "https://");

    // Set the video source and type
    const videoType = getVideoType(secureVideoUrl);
    playerRef.current.src({ src: secureVideoUrl, type: videoType });

    // Handle potential playback errors
    playerRef.current.ready(() => {
      playerRef.current.play().catch((err) => {
        console.error("Video playback failed:", err);
      });
    });

    // Cleanup: Dispose of the player when the component unmounts
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [videoUrl]);

  // Determine the video MIME type based on the URL extension
  const getVideoType = (url) => {
    if (url.endsWith(".m3u8")) {
      return "application/x-mpegurl"; // HLS
    } else if (url.endsWith(".mp4")) {
      return "video/mp4"; // MP4
    } else if (url.endsWith(".mkv")) {
      return "video/x-matroska"; // MKV
    }
    return ""; // Default or unsupported type
  };

  return (
    <div>
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-default-skin vjs-live vjs-liveui"
          controls
          width="640"
          height="360"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;

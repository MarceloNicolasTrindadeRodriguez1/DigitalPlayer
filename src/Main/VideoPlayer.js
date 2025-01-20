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
      
      });
      
    playerRef.current.crossOrigin("anonymous");
    const secureVideoUrl = videoUrl.startsWith("https://")
      ? videoUrl
      : videoUrl.replace("http://", "https://");
    // Set the source of the video player based on the videoUrl
    const videoType = getVideoType(videoUrl);
    playerRef.current.src({ src: secureVideoUrl, type: videoType });

    // Play the video
    playerRef.current.play().catch((err) => {
      console.error("Video playback failed:", err);
    });

    // Cleanup function to dispose the player
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [videoUrl]); // Re-run effect if videoUrl changes

  // Function to determine the video type based on the URL
  const getVideoType = (url) => {
    if (url.endsWith('.m3u8')) {
      return 'application/x-mpegurl'; // HLS
    } else if (url.endsWith('.mp4')) {
      return 'video/mp4'; // MP4
    } else if (url.endsWith('.mkv')) {
      return 'video/x-matroska'; // MKV
    }
    return ''; // Default or unsupported type
  };

  return (
    <div>
      <div data-vjs-player>
        <video
          ref={videoRef}
          id="live-video"
          className="video-js vjs-default-skin vjs-live vjs-liveui"
          width="640"
          height="360"
          controls
        />
      </div>
    </div>
  );
};

export default VideoPlayer;

import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import demo from './../assets/demo.mp4'


const VideoPage = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    // Autoplay the video when the component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(() => {}); // Prevent error if autoplay is blocked
    }
  }, []);

  return (
    <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        margin: "40px" 
      }}>
      <video
        ref={videoRef}
        src={demo} // Use /assets/demo.mp4 if that's the correct folder name
        controls
        width="700"
        style={{ maxWidth: "100%" }}
      >
        Sorry, your browser doesn't support embedded videos.
      </video>
      <button
        style={{ 
          marginTop: "1.5rem", 
          padding: "0.6rem 1.2rem", 
          fontSize: "1.2rem", 
          cursor: "pointer", 
          border: "2px soild red",  
          borderRadius: "0.5rem", 
          background:"#9e0909ff", 
          color: 'white', 
          fontWeight: "bold" 
        }}
        onClick={() => navigate('/')}
      >
        Close Video
      </button>
    </div>
  );
};

export default VideoPage;
"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const startPlayback = () => {
      const video = videoRef.current;
      if (!video) return;

      const tryPlay = () => {
        const played = video.play();
        if (played instanceof Promise) {
          played.catch((e) => console.warn("Autoplay failed:", e));
        }
      };

      const onTimeUpdate = () => {
        const trimmedEnd = video.duration - 1;
        if (!video.duration || fadeOut) return;

        if (video.currentTime >= trimmedEnd) {
          setFadeOut(true); // start fade while playing

          // Pause and reset AFTER fade
          setTimeout(() => {
            if (!video) return;
            video.pause();
            video.currentTime = 0;
          }, 2000); // matches fade-out duration
        }
      };

      video.addEventListener("timeupdate", onTimeUpdate);
      tryPlay();

      return () => {
        video.removeEventListener("timeupdate", onTimeUpdate);
      };
    };

    const timeout = setTimeout(() => {
      const video = videoRef.current;
      if (!video) return;

      setShowVideo(true);

      if (video.readyState >= 1) {
        startPlayback();
      } else {
        video.addEventListener("loadedmetadata", startPlayback, { once: true });
      }
    }, 3000); // delay before showing the video

    return () => clearTimeout(timeout);
  }, [fadeOut]);

  return (
    <div className="absolute inset-0 -z-10">
      <video
        ref={videoRef}
        src="/video/hyperspace-c.mp4"
        muted
        playsInline
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          showVideo && !fadeOut ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
      <div
        className={`absolute inset-0 bg-black z-20 transition-opacity duration-2000 ${
          fadeOut ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
    </div>
  );
}

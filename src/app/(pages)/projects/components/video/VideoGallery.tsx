"use client";

import { useState } from "react";

import { videos } from "@/data/projects";

import VideoCard from "./VideoCard";
import VideoPreviewModal from "./VideoPreviewModal";

export default function VideoGallery() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  return (
    <>
      {videos.map((project) => (
        <VideoCard key={project.id} project={project} onOpen={setVideoUrl} />
      ))}

      <VideoPreviewModal
        videoUrl={videoUrl}
        onClose={() => setVideoUrl(null)}
      />
    </>
  );
}

import React from "react";
import GalleryGrid from "../components/GalleryGrid";

// PUBLIC_INTERFACE
function Gallery() {
  /** Gallery page showing uploaded media */
  return (
    <main>
      <h2>Multimedia Gallery</h2>
      <GalleryGrid />
    </main>
  );
}
export default Gallery;

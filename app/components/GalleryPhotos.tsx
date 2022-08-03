import { useCallback, useEffect, useRef, useState } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import foto1 from "~/images/foto1.jpg";
import foto2 from "~/images/foto2.jpg";
import foto3 from "~/images/foto3.jpg";
import foto4 from "~/images/foto4.jpg";
import foto5 from "~/images/foto5.jpg";
import foto6 from "~/images/foto6.jpg";
import foto7 from "~/images/foto7.jpg";
import foto8 from "~/images/foto8.jpg";
import foto9 from "~/images/foto9.jpg";

const photos = [
  {
    src: foto1,
    width: 3,
    height: 2,
  },
  {
    src: foto3,
    width: 4,
    height: 5,
  },
  {
    src: foto2,
    width: 3,
    height: 2,
  },
  {
    src: foto6,
    width: 1,
    height: 1,
  },
  {
    src: foto5,
    width: 3,
    height: 2,
  },
  {
    src: foto4,
    width: 4,
    height: 5,
  },
  {
    src: foto9,
    width: 5,
    height: 4,
  },
  {
    src: foto8,
    width: 3,
    height: 2,
  },
  {
    src: foto7,
    width: 2,
    height: 3,
  },
];

let isHydrating = true;

const GalleryPhotos = () => {
  let [isHydrated, setIsHydrated] = useState(!isHydrating);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((_, { index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  useEffect(() => {
    isHydrating = false;
    setIsHydrated(true);
  }, []);

  return (
    <div className="w-full px-1 md:px-4">
      <h4 className="text-3xl font-head font-bold text-center mb-14 pt-10 text-gray-700">
        Galeri
      </h4>
      {isHydrated ? (
        <div className="w-full overflow-auto">
          <Gallery photos={photos} onClick={openLightbox} />
          <ModalGateway>
            {viewerIsOpen ? (
              <Modal onClose={closeLightbox}>
                <Carousel
                  styles={{}}
                  currentIndex={currentImage}
                  views={photos.map((x) => ({
                    source: x.src,
                  }))}
                />
              </Modal>
            ) : null}
          </ModalGateway>
        </div>
      ) : null}
    </div>
  );
};

export default GalleryPhotos;

import React from "react";
import {motion, useScroll, useTransform} from "framer-motion";

const ImageGrid = () => {
  const {scrollYProgress} = useScroll();

  const gridY = useTransform( scrollYProgress, [ 0, 1 ], [ 0, 0 ] );
  const gridScale = useTransform( scrollYProgress, [ 0, 0.5, 1 ], [ 1, 1.1, 1 ] );
  const gridRotate = useTransform( scrollYProgress, [ 0, 1 ], [ -5, -15 ] );

  const images = Array.from( {length: 12}, ( _, i ) => `./images/photo-${ i + 1 }.avif` );

  return (
    <div className="hidden lg:flex justify-end w-full h-full overflow-hidden">
      <motion.div
        className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        style={{
          y: gridY,
          scale: gridScale,
          rotate: gridRotate,
        }}
      >
        {images.map( ( src, index ) => (
          <motion.div
            key={index}
            className="shadow-xl rounded-2xl aspect-[3/4] overflow-hidden"
            initial={{opacity: 0, y: 40}}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {duration: 0.6, delay: index * 0.1}
            }}
            viewport={{once: true, margin: "-10px"}}
          >
            <img
              src={src}
              alt={`Gallery image ${ index + 1 }`}
              loading="lazy"
              className="z-1 brightness-95 w-full h-full object-cover filter"
            />
          </motion.div>
        ) )}
      </motion.div>
    </div>
  );
};

export default ImageGrid;
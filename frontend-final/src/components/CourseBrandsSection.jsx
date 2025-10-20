import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import api from "../utils/api";
import {useTranslation} from "react-i18next";
import CardSkeleton from "./CardSkeleton";

const containerVariants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {staggerChildren: 0.12}
  }
};

const itemVariants = {
  hidden: {opacity: 1, y: 24},
  visible: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.5, ease: "easeOut"}
  }
};

const BrandCard = ( {brand} ) => {
  const [ errored, setErrored ] = useState( false );
  const {t} = useTranslation();

  const imageSrc = !errored && brand.mediaPath ? brand.mediaPath : "https://via.placeholder.com/80x40?text=Logo";

  const content = (
    <motion.figure
      variants={itemVariants}
      whileHover={{scale: 1.04}}
      className="group hover:shadow-lg px-2 py-4 rounded-xl w-full h-full transition-shadow"
    >
      <div className="flex justify-center items-center mx-auto mb-4 w-20 h-12">
        <motion.img
          src={imageSrc}
          alt={t( 'brands.logoAlt', {name: brand.name} )}
          loading="lazy"
          className="w-20 h-12 object-contain select-none"
          onError={() => setErrored( true )}
          whileHover={{rotate: 3}}
        />
      </div>
      <figcaption className="font-semibold text-gray-800 dark:text-white text-lg text-center">
        {brand.name}
      </figcaption>
    </motion.figure>
  );

  return brand.link ? (
    <a
      href={brand.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      aria-label={t( 'brands.linkAria', {name: brand.name} )}
    >
      {content}
    </a>
  ) : (
    content
  );
};

const CourseBrandsSection = ( {className = ""} ) => {
  const [ brands, setBrands ] = useState( [] );
  const [ loading, setLoading ] = useState( false );
  const {t} = useTranslation();

  useEffect( () => {
    const getBrands = async () => {
      setLoading( true );
      try {
        const res = await api.get( "/page-data?type=brands" );
        setBrands( res.data );
      } catch ( error ) {
        console.error( "Failed to fetch brands:", error );
      } finally {
        setLoading( false );
      }
    };

    getBrands();
  }, [] );

  return (
    <section className={`bg-white custom-container py-16 dark:bg-gray-900 ${ className }`}>
      <div className="text-center">
        <h2 className="mb-3 font-semibold text-gray-700 dark:text-white text-xl">
          {t( 'brands.title' )}
        </h2>
        <p className="mb-12 text-gray-600 text-md dark:text-gray-300">
          {t( 'brands.description' )}
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{once: true, margin: "-80px"}}
        className="gap-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
      >
        {loading ? (
          <CardSkeleton count={5} />
        ) : brands.length > 0 ? (
          brands.map( ( brand ) => (
            <BrandCard key={brand.id} brand={brand} />
          ) )
        ) : (
          <div className="col-span-full py-6 text-gray-400 text-center">
            {t( 'brands.noBrands' )}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default CourseBrandsSection;
import {useTranslation} from 'react-i18next';
import {motion} from 'framer-motion';
import {useState, useEffect, useMemo, useCallback} from 'react';
import Button from './Button';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';

// 🕒 Utility function for countdown
const calculateNextTime = ( prev ) => {
  let {days, hours, minutes, seconds} = {
    days: parseInt( prev.days ),
    hours: parseInt( prev.hours ),
    minutes: parseInt( prev.minutes ),
    seconds: parseInt( prev.seconds ),
  };

  seconds--;
  if ( seconds < 0 ) {
    seconds = 59;
    minutes--;
  }
  if ( minutes < 0 ) {
    minutes = 59;
    hours--;
  }
  if ( hours < 0 ) {
    hours = 23;
    days--;
  }

  if ( days < 0 ) return {days: '00', hours: '00', minutes: '00', seconds: '00'};

  const format = ( num ) => num.toString().padStart( 2, '0' );
  return {
    days: format( days ),
    hours: format( hours ),
    minutes: format( minutes ),
    seconds: format( seconds ),
  };
};

// ✨ Animation Variants
const containerVariants = {
  hidden: {opacity: 0},
  visible: {opacity: 1, transition: {staggerChildren: 0.2}},
};

const itemVariants = {
  hidden: {opacity: 0, y: 20},
  visible: {opacity: 1, y: 0, transition: {duration: 0.6, ease: 'easeOut'}},
};

const cardVariants = {
  hidden: {opacity: 0, scale: 0.9},
  visible: {opacity: 1, scale: 1, transition: {duration: 0.5, ease: 'easeOut'}},
  hover: {scale: 1.05, transition: {duration: 0.3, ease: 'easeInOut'}},
};

const imageVariants = {
  hidden: {opacity: 0, scale: 1.1},
  visible: {opacity: 1, scale: 1, transition: {duration: 0.8, ease: 'easeOut'}},
  exit: {opacity: 0, scale: 0.9, transition: {duration: 0.5, ease: 'easeIn'}},
};


// 🧩 Time Box Component
const TimeBox = ( {value, label} ) => (
  <motion.div
    className="flex flex-col flex-1 items-stretch gap-2"
    whileHover={{scale: 1.05}}
    transition={{type: 'spring', stiffness: 300}}
  >
    <motion.div
      className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 px-3 rounded-lg h-16 grow"

    >
      <motion.p
        className="font-bold text-gray-900 dark:text-white text-2xl"
        key={value}
        initial={{scale: 1.2, opacity: 0}}
        animate={{scale: 1, opacity: 1}}
        transition={{duration: 0.3}}
      >
        {value}
      </motion.p>
    </motion.div>
    <p className="text-gray-600 dark:text-gray-400 text-sm text-center">{label}</p>
  </motion.div>
);

// 📚 Course Card Component
const CourseCard = ( {course} ) => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    whileHover="hover"
    className="flex flex-col flex-1 gap-4 bg-white dark:bg-[#1C242C] shadow-md hover:shadow-xl mx-2 rounded-xl h-full transition-all duration-300 cursor-pointer"
  >
    <motion.div
      className="bg-cover bg-no-repeat bg-center rounded-t-xl w-full aspect-video overflow-hidden"
      variants={imageVariants}
    >
      <motion.img
        src={course.image}
        alt={course.alt}
        className="w-full h-full object-cover"
        whileHover={{scale: 1.1}}
        transition={{duration: 0.5}}
      />
    </motion.div>

    <div className="flex flex-col flex-1 justify-between gap-4 p-4 pt-0">
      <div>
        <span className="inline-block bg-blue-200 dark:bg-blue-700 mb-2 px-2 py-1 rounded-full font-semibold text-primary text-xs">
          {course.category}
        </span>
        <p className="font-bold text-gray-900 dark:text-white text-lg">{course.title}</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex text-yellow-400">{'★'.repeat( 4 )}½</div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{course.rating}</p>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <span>👤</span>
            <p className="text-sm">{course.students}</p>
          </div>
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <motion.p className="font-bold text-gray-900 dark:text-white text-2xl" whileHover={{scale: 1.1}}>
          {course.price}
        </motion.p>
        <p className="text-gray-500 dark:text-gray-400 line-through">{course.originalPrice}</p>
      </div>
    </div>
  </motion.div>
);

const LimitedTimeOffer = () => {
  const {t} = useTranslation();

  // 🕐 Timer state
  const [ timeLeft, setTimeLeft ] = useState( {
    days: '01',
    hours: '23',
    minutes: '59',
    seconds: '48',
  } );

  // ⏳ Countdown effect
  useEffect( () => {
    const timer = setInterval( () => setTimeLeft( calculateNextTime ), 1000 );
    return () => clearInterval( timer );
  }, [] );

  // Carousel responsive configuration
  const responsive = {
    superLargeDesktop: {
      breakpoint: {max: 4000, min: 1280},
      items: 2,
    },
    desktop: {
      breakpoint: {max: 1280, min: 1024},
      items: 1,
    },
    tablet: {
      breakpoint: {max: 1024, min: 768},
      items: 1,
    },
    mobile: {
      breakpoint: {max: 768, min: 0},
      items: 1,
    },
  };

  // 🧠 Course data
  const courses = useMemo(
    () => [
      {
        id: 1,
        category: t( 'offer.courses.webdev.category' ),
        title: t( 'offer.courses.webdev.title' ),
        rating: t( 'offer.courses.webdev.rating' ),
        students: t( 'offer.courses.webdev.students' ),
        price: t( 'offer.courses.webdev.price' ),
        originalPrice: t( 'offer.courses.webdev.originalPrice' ),
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvk7sWbYlKq23LYGzDTRiAnSxfK5vPPn-z7NctfgIRscu0WCDPBTpWfRNWDnQEG4RVB4YbcJJDgr1Da_RVeocpXcHApa5KZpmiZJYua01JiHzV__h18Nb0SeKBeX-EOnVYaBvWKBQJgxt-MRfxrxdt3MJNPv9QE-cNn_mCPhHcBj4nn5c6D_2cLc555S6iOshcNGOMEU8WJwlosdIHjlry1cUk4IBCgjjucMbXXIZ8UkEUjIHe-RoTpPpOQif6q7ghWcbQftQoMq_k',
        alt: t( 'offer.courses.webdev.alt' ),
      },
      {
        id: 2,
        category: t( 'offer.courses.marketing.category' ),
        title: t( 'offer.courses.marketing.title' ),
        rating: t( 'offer.courses.marketing.rating' ),
        students: t( 'offer.courses.marketing.students' ),
        price: t( 'offer.courses.marketing.price' ),
        originalPrice: t( 'offer.courses.marketing.originalPrice' ),
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDx11NzWnQ5fk0CSLDdPGvRXJVM9ZA0xMvd8SqQkCMzFMcHRE2drUM_aY28-qTrreqSprjup8_L0ZxJL_rbrLNbMuWTb4D5WmHNEUNGGT6k9-Fq4HRGaGrgMmt3eboNqNOQtGqz6w93dsx3J1RpasJO7kmaZgEn44sLPjUO7_nDAZZc-DVvaVnmgZ4wZ2MMBRuU6erg7XGtwf-C5Ji1Y9yA9a9vxf-rBZ8Enp4lymsnXrFDtM4GAZgVkegZ-x2WfY9yWymGIeT75Srd',
        alt: t( 'offer.courses.marketing.alt' ),
      },
      {
        id: 3,
        category: t( 'offer.courses.react.category' ),
        title: t( 'offer.courses.react.title' ),
        rating: t( 'offer.courses.react.rating' ),
        students: t( 'offer.courses.react.students' ),
        price: t( 'offer.courses.react.price' ),
        originalPrice: t( 'offer.courses.react.originalPrice' ),
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        alt: t( 'offer.courses.react.alt' ),
      },
      {
        id: 4,
        category: t( 'offer.courses.datascience.category' ),
        title: t( 'offer.courses.datascience.title' ),
        rating: t( 'offer.courses.datascience.rating' ),
        students: t( 'offer.courses.datascience.students' ),
        price: t( 'offer.courses.datascience.price' ),
        originalPrice: t( 'offer.courses.datascience.originalPrice' ),
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        alt: t( 'offer.courses.datascience.alt' ),
      },
    ],
    [ t ]
  );

  const CustomArrow = ( {onClick, direction} ) => (
    <button
      onClick={onClick}
      className={`absolute top-1/2 ${ direction === 'left' ? 'left-2' : 'right-2' } z-10 bg-blue-500 hover:bg-blue-600 shadow-md p-2 rounded-full text-white transition -translate-y-1/2 duration-300 cursor-pointer`}
    >
      {direction === 'left' ? <FaArrowLeft /> : <FaArrowRight />}
    </button>
  );

  return (
    <motion.div
      className="my-15 overflow-x-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{once: true}}
      variants={containerVariants}
    >
      <div className="relative custom-container">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* 🕒 Left Content */}
          <motion.div className="flex flex-col justify-center items-center md:items-start gap-6 md:col-span-1 mb-5 md:mb-0 p-2 w-full md:max-w-lg" variants={itemVariants}>
            <div className="flex flex-col items-center md:items-start gap-3">
              <motion.p
                className="font-black text-gray-900 dark:text-white text-4xl text-center md:text-start tracking-[-0.033em]"
                variants={itemVariants}
              >
                {t( 'offer.title' )}
              </motion.p>
              <motion.p
                className="text-gray-600 dark:text-gray-400 text-base text-center md:text-start"
                variants={itemVariants}
              >
                {t( 'offer.description' )}
              </motion.p>
            </div>

            <motion.div className="flex gap-4" variants={itemVariants}>
              <TimeBox value={timeLeft.days} label={t( 'offer.days' )} />
              <TimeBox value={timeLeft.hours} label={t( 'offer.hours' )} />
              <TimeBox value={timeLeft.minutes} label={t( 'offer.minutes' )} />
              <TimeBox value={timeLeft.seconds} label={t( 'offer.seconds' )} />
            </motion.div>

            <motion.div className='flex' variants={itemVariants} whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
              <Button
                classSize="leading-normal hover:-translate-y-1 duration-300 cursor-pointer transform w-50"
                title={t( 'offer.button' )}
                aria-label="View all our expert instructors"
              />
            </motion.div>
          </motion.div>

          {/* 📚 Right Content with Carousel */}
          <motion.div className="md:col-span-1 w-full" variants={itemVariants}>
            <Carousel
              responsive={responsive}
              infinite
              autoPlay
              autoPlaySpeed={4000}
              arrows
              showDots={false}
              pauseOnHover
              containerClass="carousel-container"
              itemClass="px-2 py-4"
              partialVisible={false}
              swipeable
              draggable
              customLeftArrow={<CustomArrow direction="left" />}
              customRightArrow={<CustomArrow direction="right" />}
            >
              {courses.map( ( course ) => (
                <CourseCard key={course.id} course={course} />
              ) )}
            </Carousel>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LimitedTimeOffer;
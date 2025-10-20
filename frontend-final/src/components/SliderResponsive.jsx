// SlideResponsive.jsx
import React, {useMemo} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import {
  FiCpu, FiBriefcase, FiServer, FiHeart,
  FiBookOpen, FiBarChart2, FiFeather, FiTrendingUp,
  FiDollarSign, FiTarget, FiCamera, FiShield
} from 'react-icons/fi';

// ========== DATA ==========
const categories = [
  {label: 'Technology & Software', colorBg: 'bg-blue-100', colorText: 'text-blue-600', Icon: FiCpu},
  {label: 'Business & Management', colorBg: 'bg-green-100', colorText: 'text-green-600', Icon: FiBriefcase},
  {label: 'IT & Software', colorBg: 'bg-purple-100', colorText: 'text-purple-600', Icon: FiServer},
  {label: 'Health & Wellness', colorBg: 'bg-orange-100', colorText: 'text-orange-600', Icon: FiHeart},
  {label: 'Language Learning', colorBg: 'bg-pink-100', colorText: 'text-pink-600', Icon: FiBookOpen},
  {label: 'Data Science', colorBg: 'bg-indigo-100', colorText: 'text-indigo-600', Icon: FiBarChart2},
  {label: 'Design & UX', colorBg: 'bg-rose-100', colorText: 'text-rose-600', Icon: FiFeather},
  {label: 'Marketing', colorBg: 'bg-amber-100', colorText: 'text-amber-600', Icon: FiTrendingUp},
  {label: 'Finance & Accounting', colorBg: 'bg-teal-100', colorText: 'text-teal-600', Icon: FiDollarSign},
  {label: 'Personal Development', colorBg: 'bg-cyan-100', colorText: 'text-cyan-600', Icon: FiTarget},
  {label: 'Photography & Video', colorBg: 'bg-lime-100', colorText: 'text-lime-600', Icon: FiCamera},
  {label: 'Cybersecurity', colorBg: 'bg-red-100', colorText: 'text-red-600', Icon: FiShield},
];

// ========== COMPONENTS ==========
const CategoryCard = React.memo( ( {label, Icon, colorBg, colorText} ) => (
  <div className="px-2 py-2">
    <div className="bg-white hover:bg-gray-50 shadow-sm p-4 border border-gray-200 rounded-xl h-full text-center transition duration-200 cursor-pointer">
      <div className={`${ colorBg } rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center`}>
        <Icon className={`w-5 h-5 ${ colorText }`} />
      </div>
      <h3 className="font-semibold text-gray-700 text-xs md:text-sm">{label}</h3>
    </div>
  </div>
) );

const SlideResponsive = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: {max: 4000, min: 1280},
      items: 4,
    },
    desktop: {
      breakpoint: {max: 1280, min: 1024},
      items: 3,
    },
    tablet: {
      breakpoint: {max: 1024, min: 768},
      items: 2,
    },
    mobile: {
      breakpoint: {max: 768, min: 0},
      items: 1,
    },
  };


  return (
    <div className="px-4 py-8 w-full">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        arrows
        showDots={false}
        pauseOnHover
        containerClass="carousel-container"
        itemClass="px-2"
        dotListClass="mt-4"
      >
        {categories.map( ( item ) => {
          // get translated label if you also translate category labels: here for simplicity, using item.label, but you can store keys and translate
          return (
            <CategoryCard
              {...item}
            />
          );
        } )}
      </Carousel>
    </div>
  );
};

export default SlideResponsive;

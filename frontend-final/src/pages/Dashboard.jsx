import React, {useContext, useState} from 'react';
import {motion, AnimatePresence, useReducedMotion} from 'framer-motion';
import {container, fadeUp, subtle, imageReveal, hoverLift, progress, cardReveal} from '../utils/motionVariants';
import {FaRegCirclePlay} from 'react-icons/fa6';
import {MdOutlineFiberNew} from 'react-icons/md';
import {CiCalendarDate} from 'react-icons/ci';
import {UserContext} from '../contexts/UserProvider';



function Dashboard() {
  const [ isLoading, setIsloading ] = useState();
  const reduce = useReducedMotion();

  const {user} = useContext( UserContext );

  const courses = [
    {title: 'Advanced CSS and Sass', pct: 75, thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIBuYFDQA4eC1oQM7hI-ozJ47MXZPI9Z6r1jSzyekQ-AOQ4mJ9VC65ZvrKnDKREqsIX4-HsB862SJ_U1RMVJo9657glegI-wVV8uaTDKH3cew0hDhyAk6IpUj1lWvaF5sIA6-9IjhEv-qWS3gXD8qvUPtnr9pq2uq-Btl_zXwBV7uoGGJuO1UtAM3f2dW_FVYYuSyxBrVc4VEVIqsQGvU2K7oKqrR4I20NBvGC6A7FJtro18AIqs5usme-KAVmPDucsacx2aqvphAS"},
    {title: 'JavaScript Fundamentals', pct: 40, thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLWcAs1zzKIbx9FrHE0ZGuzp3EVm9KQ8qrCLfwaMPD28YXerPx0zXKRtyhVmJPH_AA5B7fhze0CvGbCEsYLBuDJcw-vb10JvVCzXMi8lGIO7U7dNeOsOK6nwnU3h6myMKtunIRFHtZHfxsTqDgkR4oZ_OG-JgPTNrNn4wpr6SmrO0Hs3n5Ds0XaWBi0-GAZBBBmm0GN5nV3I42reluy6R_U8BuA7c89-yVTzVX2GfcomkWnFMJBYU8w3t1HKecwi2sl6RQPYJ_-jZ4"},
    {title: 'React for Beginners', pct: 15, thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3MVAEPA-oGnJ0XI53eE9YprXo-R4H7qUXxRt4GzirqbFDf0humUTUh2uepYA7j4EN3YZk3r0BA9hRtGdodgJjymJ7veA_AHfjUNtc7bKfMM4o5tpbf2psTDmCajfIdljZXW-Rs1MVkAdP4khV6UDVVmA8EznccTYT4Z9h2kkJOZjeUI-K8MHGWAP45qhEssu1hT8zF5DFpjxTc_B2zXzQhEArtnNJosMxOFfJ_ognX6e2c_yMXUx5euqWPV9dwzyJnWn-SZ4uW-i2"}
  ];

  const notifications = [
    {id: 1, icon: <CiCalendarDate />, title: "Project deadline for 'Advanced CSS' is tomorrow.", time: '2 hours ago', tone: 'blue-500'},
    {id: 2, icon: <MdOutlineFiberNew />, title: "New module 'State Management' added to 'React for Beginners'.", time: '1 day ago', tone: 'green'}
  ];

  const recommended = [
    {id: 'node', title: 'Backend Development with Node.js', desc: 'Build powerful server-side applications.', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDORgV3r0fGSenoRxw-av8kg8GgAsNNDpEyxkvN9Gawx2L5rGfwl2ty9LAzQOU5RQ1TOnVaGJuWE7Rp1dHziY46TvejT574JSNn19hewohyys-XpeWOUgkCQKR1zph2p6z-4hKZR7m4XRRXr0IgFBOvnmsVW9RX85eFi8S0BCKiPvFS8tedPQUHARqYOl8i_ZUbGskadrOl4YLcsd5CmeHFc9lzSDEsLciZeeCJhShbyXXn7i9Ulhok01gWWnQpgb9odtL8H7c66NMi'},
    {id: 'dsa', title: 'Data Structures & Algorithms', desc: 'Master the fundamentals of computer science.', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuRefA7BcIXO83QnWcqadi_z85tmM9paxHrl3TX8nzmCO6rJIxzP-ZZUXdGdt-wVo7njgwdcrevoi87i_es1iaEXqaMqoOdz4sbUAFH2zuJ_GHS38XaAysJ8RLLQbTFiXV5D2DL-wBImX-wd0066AR3uqK_vIF6PKxgjwC_dFLaWqIV9_2wmpmYfZBKDGRzQlFxfRfJ2nzvUt0zc-Y9jlvNYwNGTW5JwflKdMqY3dnFkCyhKLljTA6xW-fCKxpC_CtVCyKe9tcU3tj'},
    {id: 'ux', title: 'UI/UX Design Fundamentals', desc: 'Learn the principles of user-centric design.', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR_Bwfyl-02YI5NAyEwnGe7qP4NVDkCrv0o_NW0EgLyOAR8PwiScedY0qL_2G7gPlaGtZcPc2wn_QL5Kd5TFGNmgQV2L1z8K-pEYN5yoI6F6PxqkiBr4YpQrGRyfHLsOz6W-0aoXVzGr5mqq4JXJc-V6VnpZNH2qx4JeEQSmTztZuEytSHzQOZdMHLHxNsaU9IHxlExhXysuhRmk_e8mLQ86uBlqMaNkFmCmkjuEN6cTEqLGN6sOcsRNc1-hy80twokqUYhF9J0HFE'},
    {id: 'py', title: 'Python for Data Science', desc: 'Analyze and visualize data with Python.', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArc2hqBWikcMDBGuNkfxJCz9EUBS-6LWHHr-o1pwBWbb51rERjmBH6eLP_tlFAjOF2v0yS5vBjcd-Vv27sgmg9Th0XZegjICSgWI5vUMXqawGW4tjjtmgrXC_8y8jdiIciNNzBjDKsAMobMi5AiT-qxJYcq5KP66Ki-MmRHDfTlIsDKlLwfaXixYJR2w_eNZBA_ehU2MxMoH-aMOL7MGYbLMEPaN7PzuZk2iGhtRW_ZqjXYYT32a9REwPX7DvjLfz5MzldaTSPcb8g'}
  ];



  return (
    <main class="flex-1 px-4 sm:px-6 lg:px-10 py-8">
      <motion.div
        className="mx-auto max-w-7xl"
        initial="hidden"
        animate={reduce ? undefined : 'show'}
        variants={container}
      >
        <div className="flex flex-wrap justify-between gap-4 mb-8">
          <motion.p className="min-w-72 font-black text-3xl lg:text-4xl leading-tight tracking-[-0.033em]" variants={fadeUp}>
            Welcome back, {user.fullname}!
          </motion.p>
        </div>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
          <motion.div className="space-y-8 lg:col-span-2" variants={container}>
            <motion.div
              className="flex sm:flex-row flex-col justify-between items-stretch gap-6 bg-app dark:bg-[#1c2027]/50 shadow-sm p-6 rounded-xl"
              variants={fadeUp}
              initial="rest"
              whileHover={reduce ? undefined : 'hover'}
            >
              <motion.div className="flex flex-col flex-[2_2_0px] justify-center gap-4" variants={fadeUp}>
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-lg leading-tight">Pick up where you left off</p>
                  <p className="font-normal text-gray-500 dark:text-[#9da8b9] text-sm leading-normal">Introduction to Responsive Design</p>
                </div>

                <motion.button
                  className="flex justify-center items-center bg-blue-500 px-5 rounded-lg w-fit min-w-[84px] max-w-[480px] h-10 overflow-hidden font-bold text-white text-sm leading-normal cursor-pointer"
                  variants={hoverLift}
                  initial="rest"
                  whileHover={reduce ? {} : 'hover'}
                  aria-label="Continue learning"
                >
                  <span>Continue Learning</span>
                </motion.button>
              </motion.div>

              <motion.div
                className="flex-1 bg-cover bg-no-repeat bg-center rounded-lg w-full sm:w-auto min-h-[150px] aspect-video"
                style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBnHnOSm9G56ilBjfWX89_t3-sSZ62wVCGgV4-S1iNZkbt4gNB35xKfPf2gruO_1JUin01k8us1HOd2Ja3tp0iDiuxN4omhvhpw2VfItFZ9oH5o_1EAXtw4for1I0588SbS7FQFI8ZG12zI7SUbKPG6hY1YulRuNOM-BFUlWaTcsMj5mHyllf7StWAG5g4vpxqFCQyZC75AYIxMECPtWx_vwiN7Fdah4zr8KJFO60fuFpsWKn51MinMgbaXAzAD8sIZYmDTNxOeB0Mz')`}}
                data-alt="Abstract gradient representing a course on responsive design"
                variants={imageReveal}
                aria-hidden={false}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <h2 className="pb-4 font-bold text-xl leading-tight tracking-[-0.015em]">
                Your Courses
              </h2>

              {isLoading ? (
                <div className="space-y-2">
                  {[ ...Array( 3 ) ].map( ( _, index ) => (
                    <div key={index} className="flex items-center gap-4 bg-app dark:bg-[#1c2027]/50 px-4 py-3 rounded-lg animate-pulse">
                      <div className="bg-gray-300 dark:bg-[#3b4554] rounded-lg size-14 shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="bg-gray-300 dark:bg-[#3b4554] rounded w-3/4 h-4" />
                        <div className="bg-gray-300 dark:bg-[#3b4554] rounded h-2" />
                      </div>
                    </div>
                  ) )}
                </div>
              ) : (

                <div className="space-y-2" role="list" aria-label="Course progress list">
                  {courses.map( ( course, index ) => (
                    <motion.div
                      key={`course-${ course.id || course.title }-${ index }`}
                      className="flex justify-between items-center gap-4 bg-app hover:bg-gray-50 dark:bg-[#1c2027]/50 dark:hover:bg-[#282f39] px-4 py-3 rounded-lg transition-colors cursor-pointer"
                      variants={fadeUp}
                      role="listitem"
                      tabIndex={0}
                      onKeyDown={( e ) => {
                        if ( e.key === 'Enter' || e.key === ' ' ) {
                          e.preventDefault();
                          // Handle course click/selection here
                          handleCourseSelect( course );
                        }
                      }}
                      onClick={() => handleCourseSelect( course )}
                    >
                      <div className="flex items-center gap-4 w-full">
                        {/* Thumbnail with better accessibility */}
                        <div
                          className="bg-cover bg-no-repeat bg-center rounded-lg size-14 shrink-0"
                          style={{
                            backgroundImage: `url(${ course.thumb })`,
                            width: 56,
                            height: 56
                          }}
                          role="img"
                          aria-label={`Thumbnail for ${ course.title }`}
                        />

                        <div className="flex flex-col flex-grow justify-center min-w-0">
                          {/* Course title with proper truncation */}
                          <p className="font-medium text-base truncate line-clamp-1 leading-normal">
                            {course.title}
                          </p>

                          {/* Progress bar with better accessibility */}
                          <div className="flex items-center gap-2 mt-1">
                            <div
                              className="bg-gray-200 dark:bg-[#3b4554] rounded-full w-full h-1.5 overflow-hidden"
                              role="progressbar"
                              aria-valuenow={course.pct}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-label={`Progress for ${ course.title }: ${ course.pct }%`}
                            >
                              <motion.div
                                className="bg-blue-500 rounded-full h-full"
                                custom={course.pct}
                                initial="hidden"
                                animate={reduce ? {} : 'show'}
                                variants={progress}
                                style={{width: reduce ? `${ course.pct }%` : undefined}}
                                aria-hidden="false"
                              />
                            </div>

                            {/* Percentage text */}
                            <p
                              className="font-medium text-gray-500 dark:text-[#9da8b9] text-xs leading-normal shrink-0"
                              aria-hidden="true"
                            >
                              {course.pct}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) )}
                </div>
              )}
            </motion.div>

          </motion.div>

          {/* Right column placeholder for widgets */}
          <motion.aside className="space-y-6 lg:col-span-1" variants={container}>

            <motion.div className="bg-app dark:bg-[#1c2027]/50 shadow-sm p-6 rounded-xl" variants={fadeUp}>
              <p className="font-semibold text-gray-700 dark:text-gray-200 text-sm">Quick Stats</p>
              <div className="gap-4 grid grid-cols-2 mt-4">
                <motion.div className="bg-gray-50 dark:bg-[#15181c]/50 p-3 rounded-lg text-center" variants={fadeUp}>
                  <p className="font-bold text-lg">12</p>
                  <p className="text-gray-500 dark:text-[#9da8b9] text-xs">Courses enrolled</p>
                </motion.div>
                <motion.div className="bg-gray-50 dark:bg-[#15181c]/50 p-3 rounded-lg text-center" variants={fadeUp}>
                  <p className="font-bold text-lg">4</p>
                  <p className="text-gray-500 dark:text-[#9da8b9] text-xs">Certificates</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div className="bg-app dark:bg-[#1c2027]/50 shadow-sm p-6 rounded-xl" variants={fadeUp}>
              <h3 className="mb-4 font-bold text-lg">Notifications</h3>

              <motion.ul className="space-y-4" variants={container}>
                <AnimatePresence>
                  {notifications.map( ( n ) => (
                    <motion.li
                      key={n.id}
                      className="flex items-start gap-4"
                      variants={cardReveal}
                      initial="hidden"
                      animate="show"
                      exit={{opacity: 0, y: 6, transition: {duration: 0.24}}}
                    >
                      <div className={`flex justify-center items-center ${ n.tone === 'green' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500' } mt-1 rounded-full size-8 shrink-0`}>
                        <span className="material-symbols-outlined text-lg" aria-hidden>{n.icon}</span>
                      </div>

                      <div>
                        <p className="font-medium text-sm">{n.title}</p>
                        <p className="text-gray-500 dark:text-[#9da8b9] text-xs">{n.time}</p>
                      </div>
                    </motion.li>
                  ) )}
                </AnimatePresence>
              </motion.ul>
            </motion.div>

            <motion.div className="bg-app dark:bg-[#1c2027]/50 shadow-sm p-6 rounded-xl" variants={fadeUp}>
              <h3 className="mb-4 font-bold text-lg">Quick Links</h3>
              <motion.ul className="space-y-3" variants={container}>
                {[ 'CSS Flexbox Layout', 'JavaScript Promises', 'React Component Lifecycle' ].map( ( t, i ) => (
                  <motion.li key={t} className="list-none" variants={fadeUp}>
                    <a className="flex items-center gap-3 font-medium text-gray-600 hover:text-blue-500 dark:hover:text-blue-500 dark:text-gray-300 text-sm transition-colors" href="#">
                      <span className="material-symbols-outlined text-lg" aria-hidden><FaRegCirclePlay /></span>
                      {t}
                    </a>
                  </motion.li>
                ) )}
              </motion.ul>
            </motion.div>

          </motion.aside>
        </div>



        <motion.div className="mt-12" variants={fadeUp}>
          <h2 className="pb-4 font-bold text-xl leading-tight tracking-[-0.015em]">Recommended For You</h2>

          <motion.div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" variants={container}>
            {recommended.map( ( r ) => (
              <motion.article
                key={r.id}
                className="flex flex-col bg-app dark:bg-[#1c2027]/50 shadow-sm rounded-xl overflow-hidden"
                variants={cardReveal}
                initial="hidden"
                whileInView="show"
                viewport={{once: true, amount: 0.15}}
                whileHover={reduce ? undefined : 'hover'}
              >
                <motion.div
                  className="bg-cover bg-no-repeat bg-center aspect-video"
                  style={{backgroundImage: `url(${ r.thumb })`}}
                  variants={subtle}
                  aria-hidden
                />

                <motion.div className="flex flex-col flex-grow p-4" variants={fadeUp}>
                  <h4 className="font-bold text-base line-clamp-2">{r.title}</h4>
                  <p className="flex-grow mt-1 mb-3 text-gray-500 dark:text-[#9da8b9] text-xs">{r.desc}</p>
                  <motion.button
                    className="flex justify-center items-center bg-blue-500/20 px-4 rounded-md w-full h-9 font-medium text-blue-500 text-sm"
                    initial="rest"
                    whileHover={reduce ? {} : 'hover'}
                    variants={hoverLift}
                  >
                    View Course
                  </motion.button>
                </motion.div>
              </motion.article>
            ) )}
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}

export default Dashboard;;
import React from 'react';
import {motion, useReducedMotion} from 'framer-motion';
import {container, fadeUp, fadeIn, imageReveal, hoverLift} from '../utils/motionVariants';
import {useTranslation} from 'react-i18next';

function About() {
  const reduce = useReducedMotion();
  const {t} = useTranslation();

  return (
    <main className="flex-1">
      <div className="py-16">
        <div className="custom-container">
          {/* Hero text block */}
          <motion.div
            className="mx-auto max-w-4xl text-center fade-in"
            variants={container}
            initial="hidden"
            animate={reduce ? 'show' : 'show'}
          >
            <motion.h1
              className="font-black text-gray-900 dark:text-white text-4xl sm:text-5xl tracking-tight"
              variants={fadeUp}
            >
              {t( 'about.hero.title' )}
            </motion.h1>

            <motion.p
              className="mt-6 text-gray-600 dark:text-gray-300 text-lg leading-8"
              variants={fadeUp}
            >
              {t( 'about.hero.description' )}
            </motion.p>

            <motion.div className="flex justify-center items-center gap-x-6 mt-10" variants={fadeUp}>
              <motion.a whileHover="hover" initial="rest" variants={hoverLift} className="bg-blue-500 hover:bg-blue-600 shadow-sm px-3.5 py-2.5 rounded-md focus-visible:outline focus-visible:outline-blue-500 focus-visible:outline-offset-2 font-semibold text-white text-sm hover:scale-105 transition-all duration-300" href="#">
                {t( 'about.hero.exploreCourses' )}
              </motion.a>
              <motion.a className="inline-block font-semibold text-gray-900 dark:text-white text-sm leading-6 transition-transform hover:translate-x-1 duration-300" href="#">
                {t( 'about.hero.getStarted' )} <span aria-hidden="true">→</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Sections list */}
          <div className="space-y-16 mt-20">
            {/* Section 1 */}
            <motion.div className="items-center gap-12 grid grid-cols-1 md:grid-cols-2" variants={container} initial="hidden" whileInView="show" viewport={{once: true, amount: 0.15}}>
              <motion.div className="animate-text" variants={fadeUp}>
                <h2 className="font-bold text-gray-900 dark:text-white text-3xl tracking-tight">
                  {t( 'about.section1.title' )}
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {t( 'about.section1.description' )}
                </p>
              </motion.div>

              <motion.div className="flex justify-center rounded-xl overflow-hidden" variants={imageReveal} whileHover="hover" initial="rest">
                <motion.img
                  className="shadow-lg rounded-xl w-full max-w-md"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkQz_K9URl1KssDn1y_yjeK9ISNQLoCvWGzaEIl9SKgnpNwyC0iycSidbiJ6G3oDk6qrS0JnqyPtIB3d9k5mdxTvNjukmsR1sTn6wpJU_z74fNqJOdzqC7N_0yIs15byOsmNYxheWeUYMF8ahqPsOSzMlDX-20GSt0fcqkkUsVLPCJwpuXKS3N3Y2S4iJcm35q34uSZhA3_6OKYwI9jggKu5OcSOoH7PH7_a_dAi0WMaRCw9l6H3YWAHiVxl9DEXLJrJKWIcHlV2GH"
                  alt={t( 'about.section1.imageAlt' )}
                  initial={{opacity: 0, y: 12}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.7, ease: [ 0.22, 1, 0.36, 1 ]}}
                />
              </motion.div>
            </motion.div>

            {/* Section 2 (image left on mobile order) */}
            <motion.div className="items-center gap-12 grid grid-cols-1 md:grid-cols-2" variants={container} initial="hidden" whileInView="show" viewport={{once: true, amount: 0.15}}>
              <motion.div className="flex justify-center md:order-2 rounded-xl overflow-hidden" variants={imageReveal}>
                <motion.img
                  className="shadow-lg rounded-xl w-full max-w-md"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPcAZmk0ScGd6FeFOSKUVUK2N-Ex1XDNioVIwxm-3mXmsrSDid3Tgc_eCY8EDo-LE5uIhJbS3fE4edW6cOoWEc0Pt46KlfieEuxE0ZJvAw6IWzyVCRnHblr-1eTQBICiUd1X1VJl9wDmyAzn6HDcsGJo2AsLJ0ayLOus3mChYz2KIdLOGxWCx97SkM8Tc_V3W-qjUtWKsEu9cYywK__Ta1OTk1YvBAjJbAI8a796HX5hy7OJPmaUS7zjcCI53Vx0gdo8QKts6xx5n1"
                  alt={t( 'about.section2.imageAlt' )}
                />
              </motion.div>

              <motion.div className="md:order-1 animate-text" variants={fadeUp}>
                <h2 className="font-bold text-gray-900 dark:text-white text-3xl tracking-tight">
                  {t( 'about.section2.title' )}
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {t( 'about.section2.description' )}
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div className="mx-auto mt-24 max-w-4xl text-center animate-text" variants={fadeIn} initial="hidden" whileInView="show" viewport={{once: true}}>
            <motion.h2 className="font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl tracking-tight" variants={fadeUp}>
              {t( 'about.cta.title' )}
            </motion.h2>
            <motion.p className="mt-4 text-gray-600 dark:text-gray-300 text-lg leading-8" variants={fadeUp}>
              {t( 'about.cta.description' )}
            </motion.p>
            <motion.div className="mt-10" variants={fadeUp}>
              <motion.a whileHover="hover" initial="rest" variants={hoverLift} className="bg-blue-500 hover:bg-blue-600 shadow-sm px-5 py-3 rounded-md focus-visible:outline focus-visible:outline-blue-500 focus-visible:outline-offset-2 font-semibold text-white text-base hover:scale-105 transition-all duration-300" href="#">
                {t( 'about.cta.button' )}
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

export default About;
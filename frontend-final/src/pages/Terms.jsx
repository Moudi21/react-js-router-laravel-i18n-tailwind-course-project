// TermsPage.jsx
import React, {useEffect, useState, useRef} from 'react';
import {motion, useReducedMotion} from 'framer-motion';
import {container, fadeUp, subtle} from '../utils/motionVariants';
import {useTranslation} from 'react-i18next';

const sections = [
  {id: 'introduction', title: 'terms.sections.introduction.title'},
  {id: 'accounts', title: 'terms.sections.accounts.title'},
  {id: 'content', title: 'terms.sections.content.title'},
  {id: 'payments', title: 'terms.sections.payments.title'},
  {id: 'termination', title: 'terms.sections.termination.title'},
  {id: 'disclaimer', title: 'terms.sections.disclaimer.title'},
  {id: 'limitation', title: 'terms.sections.limitation.title'}
];

/* Helper subcomponent Section */
function Section( {id, title, children, variants} ) {
  return (
    <section id={id}>
      <motion.div
        className="group bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg p-6 rounded-xl transition-shadow duration-300"
        variants={variants}
      >
        <summary className="flex justify-between items-center cursor-pointer list-none">
          <h2 className="font-bold text-gray-900 dark:text-white text-2xl">{title}</h2>
        </summary>
        <div className="mt-4 max-w-none text-gray-600 dark:text-gray-300 prose prose-lg">{children}</div>
      </motion.div>
    </section>
  );
}

function Terms() {
  const reduce = useReducedMotion();
  const {t} = useTranslation();
  const [ active, setActive ] = useState( sections[ 0 ].id );
  const observerRef = useRef( null );

  useEffect( () => {
    const opts = {root: null, rootMargin: '0px 0px -60% 0px', threshold: 0};
    const observer = new IntersectionObserver( ( entries ) => {
      entries.forEach( ( entry ) => {
        if ( entry.isIntersecting ) setActive( entry.target.id );
      } );
    }, opts );

    observerRef.current = observer;
    sections.forEach( ( s ) => {
      const el = document.getElementById( s.id );
      if ( el ) observer.observe( el );
    } );

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [] );

  useEffect( () => {
    const links = document.querySelectorAll( '.toc-link' );
    links.forEach( ( a ) => a.classList.remove( 'text-primary', 'font-semibold' ) );
    const activeLink = document.querySelector( `.toc-link[href="#${ active }"]` );
    if ( activeLink ) activeLink.classList.add( 'text-primary', 'font-semibold' );
  }, [ active ] );

  return (
    <main className="flex-1">
      <div className="py-16 sm:py-24 fade-in">
        <div className="custom-container">
          <div className="text-center">
            <motion.h1
              className="font-black text-gray-900 dark:text-white text-4xl sm:text-5xl tracking-tight"
              initial="hidden"
              whileInView={reduce ? undefined : 'show'}
              viewport={{once: true, amount: 0.25}}
              variants={fadeUp}
            >
              {t( 'terms.title' )}
            </motion.h1>

            <motion.p
              className="mt-4 text-gray-600 dark:text-gray-300 text-lg leading-8"
              initial="hidden"
              whileInView={reduce ? undefined : 'show'}
              viewport={{once: true, amount: 0.2}}
              variants={subtle}
            >
              {t( 'terms.lastUpdated' )}
            </motion.p>

            <motion.p
              className="mt-2 text-gray-500 dark:text-gray-400 text-sm"
              initial="hidden"
              whileInView={reduce ? undefined : 'show'}
              viewport={{once: true, amount: 0.2}}
              variants={subtle}
            >
              {t( 'terms.readCarefully' )}
            </motion.p>
          </div>

          <div className="lg:gap-8 lg:grid lg:grid-cols-4 mt-16">
            <aside className="hidden lg:block lg:col-span-1">
              <div className="top-24 sticky">
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">
                  {t( 'terms.toc.title' )}
                </h3>
                <nav className="space-y-2" id="toc" aria-label="Table of contents">
                  {sections.map( ( s ) => (
                    <a
                      key={s.id}
                      className="block text-gray-600 hover:text-primary dark:hover:text-primary dark:text-gray-300 transition toc-link"
                      href={`#${ s.id }`}
                      onClick={( e ) => {
                        e.preventDefault();
                        const el = document.getElementById( s.id );
                        if ( el ) el.scrollIntoView( {behavior: reduce ? 'auto' : 'smooth', block: 'start'} );
                      }}
                    >
                      {t( s.title )}
                    </a>
                  ) )}
                </nav>
              </div>
            </aside>

            <div className="lg:col-span-3 mt-12 lg:mt-0">
              <motion.div
                className="space-y-12"
                initial="hidden"
                whileInView={reduce ? undefined : 'show'}
                viewport={{once: true, amount: 0.12}}
                variants={container}
              >
                <Section id="introduction" title={t( 'terms.sections.introduction.title' )} variants={fadeUp}>
                  <p>{t( 'terms.sections.introduction.content' )}</p>
                </Section>

                <Section id="accounts" title={t( 'terms.sections.accounts.title' )} variants={fadeUp}>
                  <p>{t( 'terms.sections.accounts.content' )}</p>
                </Section>

                <Section id="content" title={t( 'terms.sections.content.title' )} variants={fadeUp}>
                  <p>{t( 'terms.sections.content.content' )}</p>
                </Section>

                <Section id="payments" title={t( 'terms.sections.payments.title' )} variants={fadeUp}>
                  <p>{t( 'terms.sections.payments.content' )}</p>
                </Section>

                <Section id="termination" title={t( 'terms.sections.termination.title' )} variants={fadeUp}>
                  <p>{t( 'terms.sections.termination.content' )}</p>
                </Section>

                <Section id="disclaimer" title={t( 'terms.sections.disclaimer.title' )} variants={fadeUp}>
                  <p>{t( 'terms.sections.disclaimer.content' )}</p>
                </Section>

                <Section id="limitation" title={t( 'terms.sections.limitation.title' )} variants={fadeUp}>
                  <p>{t( 'terms.sections.limitation.content' )}</p>
                </Section>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Terms;
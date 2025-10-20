import {motion, AnimatePresence, useReducedMotion} from 'framer-motion';
import {container, fadeUp, subtle, expand} from '../utils/motionVariants';
import {HiPlus, HiMinus} from 'react-icons/hi';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

const faqGroups = [
  {
    title: 'courses',
    items: [
      {
        q: 'courses.q1',
        a: 'courses.a1'
      },
      {
        q: 'courses.q2',
        a: 'courses.a2'
      }
    ]
  },
  {
    title: 'admissions',
    items: [
      {
        q: 'admissions.q1',
        a: 'admissions.a1'
      },
      {
        q: 'admissions.q2',
        a: 'admissions.a2'
      }
    ]
  },
  {
    title: 'technical',
    items: [
      {
        q: 'technical.q1',
        a: 'technical.a1'
      },
      {
        q: 'technical.q2',
        a: 'technical.a2'
      }
    ]
  }
];

function FAQItem( {id, question, answer, initialOpen = false} ) {
  const [ open, setOpen ] = useState( initialOpen );
  const reduce = useReducedMotion();
  const {t} = useTranslation();

  return (
    <div className="group bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg p-6 rounded-xl transition-shadow duration-300">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 pr-4">
          <h3 className="font-medium text-gray-900 dark:text-white text-lg">{t( question )}</h3>
        </div>

        <button
          aria-expanded={open}
          aria-controls={`faq-panel-${ id }`}
          onClick={() => setOpen( ( s ) => !s )}
          className="inline-flex justify-center items-center rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-10 h-10 text-primary"
        >
          <span className="sr-only">{open ? t( 'faq.collapse' ) : t( 'faq.expand' )}</span>
          {open ? <HiMinus aria-hidden className="w-5 h-5" /> : <HiPlus aria-hidden className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-panel-${ id }`}
            key="panel"
            initial={reduce ? {opacity: 1, height: 'auto'} : 'collapsed'}
            animate={reduce ? {opacity: 1, height: 'auto'} : 'expanded'}
            exit={reduce ? {opacity: 0} : 'collapsed'}
            variants={expand}
            className="mt-4 text-gray-600 dark:text-gray-300"
            aria-live="polite"
          >
            <p>{t( answer )}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Faqs() {
  const {t} = useTranslation();

  return (
    <main className="flex-1">
      <div className="py-16 sm:py-24 fade-in">
        <div className="custom-container">
          <div className="text-center">
            <motion.h1
              className="font-black text-gray-900 dark:text-white text-4xl sm:text-5xl tracking-tight"
              initial="hidden"
              whileInView="show"
              viewport={{once: true, amount: 0.2}}
              variants={fadeUp}
            >
              {t( 'faq.title' )}
            </motion.h1>

            <motion.p
              className="mt-4 text-gray-600 dark:text-gray-300 text-lg leading-8"
              initial="hidden"
              whileInView="show"
              viewport={{once: true, amount: 0.2}}
              variants={fadeUp}
            >
              {t( 'faq.description' )}
            </motion.p>
          </div>

          <motion.div
            className="space-y-16 mt-20"
            initial="hidden"
            whileInView="show"
            viewport={{once: true, amount: 0.12}}
            variants={container}
          >
            {faqGroups.map( ( group, gi ) => (
              <section key={group.title}>
                <motion.h2 className="mb-8 font-bold text-gray-900 dark:text-white text-3xl" variants={fadeUp}>
                  {t( `faq.groups.${ group.title }.title` )}
                </motion.h2>

                <motion.div className="space-y-6" variants={container}>
                  {group.items.map( ( item, ii ) => (
                    <motion.div key={item.q} variants={fadeUp}>
                      <FAQItem id={`${ gi }-${ ii }`} question={t( `faq.groups.${ item.q }` )} answer={t( `faq.groups.${ item.a }` )} />
                    </motion.div>
                  ) )}
                </motion.div>
              </section>
            ) )}

            <motion.div className="mt-24 text-center" variants={subtle}>
              <h3 className="font-bold text-gray-900 dark:text-white text-2xl">{t( 'faq.contact.title' )}</h3>
              <p className="mt-3 text-gray-600 dark:text-gray-300 text-lg">{t( 'faq.contact.description' )}</p>
              <div className="mt-8">
                <motion.a
                  href="#contact"
                  className="inline-block bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg font-semibold text-white text-lg hover:scale-105 transition-all duration-300"
                  whileHover={{scale: 1.03}}
                >
                  {t( 'faq.contact.button' )}
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

export default Faqs;
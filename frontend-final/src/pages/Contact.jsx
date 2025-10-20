import React from 'react';
import {motion, useReducedMotion} from 'framer-motion';
import {CiPhone, CiLocationOn} from 'react-icons/ci';
import {VscMail} from "react-icons/vsc";
import {useTranslation} from 'react-i18next';
import {container, fadeUp, subtleFade, hoverLift} from '../utils/motionVariants';

function Contact() {
  const reduceMotion = useReducedMotion();
  const {t} = useTranslation();

  return (
    <main className="flex-1">
      <div className="py-16 sm:py-24">
        <div className="custom-container">
          <motion.header
            className="flex flex-col items-center"
            initial="hidden"
            animate={reduceMotion ? undefined : 'show'}
            variants={container}
          >
            <motion.h1
              className="font-black text-gray-900 dark:text-white text-4xl sm:text-5xl tracking-tight"
              variants={fadeUp}
            >
              {t( 'contact.title' )}
            </motion.h1>

            <motion.p
              className="mt-4 max-w-2xl text-gray-600 dark:text-gray-300 text-lg text-center leading-8"
              variants={fadeUp}
            >
              {t( 'contact.description' )}
            </motion.p>
          </motion.header>

          <section className="items-start gap-16 grid grid-cols-1 lg:grid-cols-3 mt-20">
            <motion.aside
              className="space-y-8 lg:col-span-1"
              initial="hidden"
              whileInView={reduceMotion ? undefined : 'show'}
              viewport={{once: true, amount: 0.15}}
              variants={container}
            >
              <motion.div className="flex items-start gap-4" variants={fadeUp}>
                <motion.div
                  className="flex-shrink-0 bg-white/5 p-1 rounded-full"
                  initial="rest"
                  whileHover="hover"
                  variants={hoverLift}
                  style={{display: 'inline-flex'}}
                >
                  <CiPhone className="w-8 h-8 text-primary" aria-hidden />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-xl">{t( 'contact.phone.title' )}</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">{t( 'contact.phone.description' )}</p>
                  <a className="inline-block mt-2 text-primary hover:underline" href="tel:+15551234567">+1 (555) 123-4567</a>
                </div>
              </motion.div>

              <motion.div className="flex items-start gap-4" variants={fadeUp}>
                <motion.div
                  className="flex-shrink-0 bg-white/5 p-2 rounded-full"
                  initial="rest"
                  whileHover="hover"
                  variants={hoverLift}
                  style={{display: 'inline-flex'}}
                >
                  <VscMail className="w-6 h-6 text-primary" aria-hidden />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-xl">{t( 'contact.email.title' )}</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">{t( 'contact.email.description' )}</p>
                  <a className="inline-block mt-2 text-primary hover:underline" href="mailto:support@eduplatform.com">support@eduplatform.com</a>
                </div>
              </motion.div>

              <motion.div className="flex items-start gap-4" variants={fadeUp}>
                <motion.div
                  className="flex-shrink-0 bg-white/5 p-1 rounded-full"
                  initial="rest"
                  whileHover="hover"
                  variants={hoverLift}
                  style={{display: 'inline-flex'}}
                >
                  <CiLocationOn className="w-8 h-8 text-primary" aria-hidden />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-xl">{t( 'contact.location.title' )}</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">{t( 'contact.location.address' )}</p>
                </div>
              </motion.div>

              <motion.div className="shadow-lg mt-8 rounded-xl overflow-hidden" variants={subtleFade}>
                <div className="w-full h-64">
                  <motion.iframe
                    className="w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={t( 'contact.map.title' )}
                    src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
                    style={{filter: 'grayscale(1) contrast(1.2) opacity(0.85)', border: 0}}
                    aria-hidden="false"
                    initial={reduceMotion ? undefined : {opacity: 0, y: 10}}
                    animate={reduceMotion ? undefined : {opacity: 1, y: 0, transition: {duration: 0.6}}}
                  />
                </div>
              </motion.div>
            </motion.aside>

            <motion.div
              className="lg:col-span-2 mx-auto"
              initial="hidden"
              whileInView={reduceMotion ? undefined : 'show'}
              viewport={{once: true, amount: 0.15}}
              variants={container}
            >
              <motion.form
                id="contactForm"
                className="space-y-6 bg-white dark:bg-gray-800 shadow p-6 rounded-xl w-160 max-w-xl"
                noValidate
                onSubmit={( e ) => {
                  e.preventDefault();
                  const status = document.getElementById( 'formStatus' );
                  status.textContent = t( 'contact.form.success' );
                  status.className = 'mt-3 text-sm text-green-600';
                  e.currentTarget.reset();
                }}
                variants={fadeUp}
              >
                <div>
                  <label htmlFor="name" className="block font-medium text-gray-700 dark:text-gray-200 text-sm">{t( 'contact.form.name' )}</label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder={t( 'contact.form.namePlaceholder' )}
                      className="input-field"
                      aria-describedby="name-error"
                    />
                    <p id="name-error" className="sr-only mt-2 text-red-600 text-sm" role="alert"></p>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block font-medium text-gray-700 dark:text-gray-200 text-sm">{t( 'contact.form.email' )}</label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder={t( 'contact.form.emailPlaceholder' )}
                      className="input-field"
                      aria-describedby="email-error"
                    />
                    <p id="email-error" className="sr-only mt-2 text-red-600 text-sm" role="alert"></p>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block font-medium text-gray-700 dark:text-gray-200 text-sm">{t( 'contact.form.subject' )}</label>
                  <div className="mt-1">
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      placeholder={t( 'contact.form.subjectPlaceholder' )}
                      className="input-field"
                      aria-describedby="subject-error"
                    />
                    <p id="subject-error" className="sr-only mt-2 text-red-600 text-sm" role="alert"></p>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block font-medium text-gray-700 dark:text-gray-200 text-sm">{t( 'contact.form.message' )}</label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      required
                      placeholder={t( 'contact.form.messagePlaceholder' )}
                      className="input-field"
                      aria-describedby="message-error"
                    />
                    <p id="message-error" className="sr-only mt-2 text-red-600 text-sm" role="alert"></p>
                  </div>
                </div>

                <div>
                  <motion.button
                    id="submitBtn"
                    type="submit"
                    className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 shadow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full text-white transition-transform"
                    initial="rest"
                    whileHover={reduceMotion ? undefined : 'hover'}
                    variants={hoverLift}
                  >
                    {t( 'contact.form.button' )}
                  </motion.button>
                  <p id="formStatus" className="mt-3 text-sm" role="status" aria-live="polite"></p>
                </div>
              </motion.form>
            </motion.div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Contact;
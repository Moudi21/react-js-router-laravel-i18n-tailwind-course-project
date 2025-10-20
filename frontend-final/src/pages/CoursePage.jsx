// pages/CoursePage.jsx
import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router";
import api from "../utils/api";
import {useTranslation} from "react-i18next";
import {HiStar} from "react-icons/hi2";
import Button from "../components/Button";
import {TiPinOutline} from "react-icons/ti";
import DropDownInfo from "../components/DropDownInfo";
import {MdOutlineRateReview, MdOutlineWorkHistory} from "react-icons/md";
import {FaLinkedin} from "react-icons/fa";
import {PiChalkboardTeacherLight} from "react-icons/pi";
import Loading from "../components/Loading";


export default function CoursePage() {
  const {id} = useParams();
  const navigate = useNavigate();

  const {t} = useTranslation();


  const [ course, setCourse ] = useState( null );
  const [ loading, setLoading ] = useState( true );
  const [ error, setError ] = useState( null );

  const courseFeatures = [
    "Beginner to Advanced",
    "80+ hours of video content",
    "15 modules with over 150 lessons",
    "5 real-world projects",
    "Professional Certificate upon completion",
    "English",
    "Lifetime access with free updates",
    "No prior programming experience required",
  ];

  const itemsLearn = [
    "Prepare for Industry Certification Exam",
    "Hours and Hours of Video Instruction",
    "Over 25 Engaging Lab Exercises",
    "Client Side Programming with Javascript",
    "Comprehensive Coverage of HTML and CSS",
    "Learn Database Development with mySQL",
    "Dozens of Code Examples to Download and Study",
    "Earn Certification that is Proof of your Competence",
  ];


  useEffect( () => {
    let mounted = true;
    async function load() {
      try {
        setLoading( true );
        setError( null );
        const res = await api.get( `/courses/${ encodeURIComponent( id ) }` );
        if ( !mounted ) return;
        setCourse( res?.data?.data || res?.data || null );
      } catch ( err ) {
        if ( !mounted ) return;
        setError( err );
      } finally {
        if ( !mounted ) return;
        setLoading( false );
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [ id ] );

  if ( loading ) {
    return (
      <Loading />
    );
  }

  if ( error || !course ) {
    return (
      <div className="p-6">
        <div className="text-red-500">Failed to load course.</div>
        <button
          onClick={() => navigate( -1 )}
          className="inline-block bg-gray-200 mt-3 px-3 py-1 rounded"
        >
          Back
        </button>
      </div>
    );
  }

  const formattedDate = course.date ? new Date( course.date ).toLocaleDateString() : "—";

  function formatPrice( val ) {
    if ( val == null || val === "" ) return "Free";
    const n = Number( val );
    if ( Number.isNaN( n ) ) return val;
    return new Intl.NumberFormat( undefined, {style: "currency", currency: "USD"} ).format( n );
  }


  return (
    <div className="my-10 px-4 lg:px-16">

      <section className="bg-[#F1F4FF] dark:bg-app shadow-md p-4 lg:p-6 pt-6 rounded-4xl">
        <div className="flex lg:flex-row flex-col-reverse items-stretc gap-6">
          {/* Left */}
          <div className="flex flex-col flex-1 justify-between gap-6 px-6 py-8">
            <div className="space-y-4">
              <h2 className="font-semibold text-slate-900 dark:text-gray-100 text-2xl lg:text-3xl">
                {t( course.title )}
              </h2>

              <p className="max-w-prose text-slate-600 dark:text-slate-300 text-sm">
                {t( course.disc )}
              </p>
              <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-200">{course.provider}</span>
                <span className="mx-2">·</span>
                <time dateTime={course.date}>{formattedDate}</time>
              </p>

              <a
                href="#"
                className="inline-block font-medium text-indigo-600 dark:text-indigo-300 text-sm hover:underline"
              >
                {t( "By Sarah Lee" )}
              </a>
            </div>

            {/* Rating + enrolled + avatars */}
            <div className="flex justify-between items-center gap-4 max-w-100">
              <div className="flex items-center gap-3">

                <div className="flex -space-x-2">
                  {[ "/users-icon.jpg", "/users-icon.jpg", "/users-icon.jpg", "/users-icon.jpg" ].map( ( src, idx ) => (
                    <img
                      key={idx}
                      src={src}
                      alt=""
                      className="rounded-full ring-2 ring-white dark:ring-gray-900 w-8 h-8 object-cover"
                    />
                  ) )}
                </div>
                <span className="text-slate-600 dark:text-slate-300 text-sm">
                  {course.users} + {t( "enrolled" )}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex items-center" aria-hidden>
                  {[ ...Array( 5 ) ].map( ( _, i ) => (
                    <HiStar className="w-5 h-5 text-yellow-400" />
                  ) )}
                </div>
                <span className="font-semibold text-slate-900 dark:text-gray-100 text-sm">
                  {t( "5.0" )}
                </span>
              </div>
            </div>

            <div className="">
              <div className="font-semibold text-slate-900 dark:text-white text-4xl">
                {t( formatPrice( course.price ) )}
              </div>
            </div>

            {/* actions */}
            <div className="flex items-center gap-3 w-full">
              <Button link="#" title={t( "buyNow" )} classSize="min-w-40" />
              <Button link="#" title={t( "addToCart" )} outline={true} classSize="min-w-40" />
            </div>

          </div>

          {/* Right - image card */}
          <div className="flex-shrink-0 shadow-sm mt-8 rounded-2xl w-full lg:w-[480px] max-h-80 overflow-hidden">
            <img
              src={course.image}
              alt={t( "courseImageAlt" )}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content page Course Features, Course Curriculum Breakdown  */}
      <div className="gap-6 grid lg:grid-cols-3 my-10">
        {/* Center Content page left */}
        <div className="flex flex-col gap-4 col-span-1 lg:col-span-2">
          {/* What you’ll Learn DropDown  */}
          <DropDownInfo items={itemsLearn} isOpen="true" title="What you’ll Learn DropDown" />
          <div className="py-6">
            <h5 className="py-6 font-semibold text-gray-700 text-2xl">Course Curriculum Breakdown</h5>
            <div className="flex flex-col gap-4 px-3">
              <DropDownInfo items={itemsLearn} title="Module 1: Introduction to Web Development" textSize="text-lg" backGround="bg-app" />
              <DropDownInfo items={itemsLearn} title="Module 2: Advanced HTML & CSS" textSize="text-lg" backGround="bg-app" />
              <DropDownInfo items={itemsLearn} title="Module 3: JavaScript Essentials" textSize="text-lg" backGround="bg-app" />
              <DropDownInfo items={itemsLearn} title="Module 4: React Basics and Advanced Concepts" textSize="text-lg" backGround="bg-app" />
              <DropDownInfo items={itemsLearn} title="Module 5: Backend Development with Node.js & Express" textSize="text-lg" backGround="bg-app" />
              <DropDownInfo items={itemsLearn} title="Module 6: User Authentication and Authorization" textSize="text-lg" backGround="bg-app" />
              <DropDownInfo items={itemsLearn} title="Module 7: Final Capstone Project" textSize="text-lg" backGround="bg-app" />
            </div>
          </div>
          <DropDownInfo items={itemsLearn} title="Requirements" />
          <DropDownInfo items={itemsLearn} title="Description" />
        </div>
        {/* Center Content page right */}
        <div className="flex flex-col gap-8 col-span-1">
          {/* Course Features */}
          <div className="bg-app shadow-sm px-6 py-6 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
            <h5 className="mb-4 font-semibold text-gray-800 dark:text-gray-200 text-2xl">Course Features</h5>
            <div className="flex flex-col gap-2">

              {courseFeatures.map( text => (
                <span className="flex gap-2 p-1 font-medium text-gray-600 dark:text-gray-500">
                  <span className="flex-none">
                    <TiPinOutline className="w-6 h-6 text-primary-500" />
                  </span>{t( text )}
                </span>
              ) )}

            </div>
            <div className="mt-10">
              <Button title={t( "Buy Now" )} link="#" classSize="w-full flex justify-center" />
            </div>
          </div>

          {/* Instructor Basic Info */}
          <div className="flex flex-col gap-5 bg-app shadow-sm px-6 py-10 border border-gray-200 dark:border-gray-700 rounded-2xl">
            {/* Heading */}
            <h5 className="font-semibold text-gray-800 dark:text-gray-200 text-2xl">
              {t( "Instructor Profile" )}
            </h5>

            {/* Instructor Basic Info */}
            <div className="flex items-center gap-4">
              <img
                src="/users-icon.jpg"
                alt={t( "Instructor Photo" )}
                className="border border-gray-300 rounded-full w-16 h-16 object-cover"
              />
              <div>
                <h6 className="font-semibold text-gray-700 dark:text-gray-400 text-xl">Angela Yu</h6>
                <p className="text-gray-500 text-sm">
                  {t( "Lead Instructor, Software Engineer" )}
                </p>
              </div>
            </div>

            {/* Instructor Stats */}
            <div className="flex flex-col gap-3 text-gray-600 dark:text-gray-500">
              <div className="flex items-center gap-2 pb-2 border-gray-300 dark:border-gray-700 border-b">
                <MdOutlineWorkHistory className="flex-none text-blue-500 text-xl" />
                <span className="text-sm">{t( "10+ years Experience" )}</span>
              </div>

              <div className="flex items-center gap-2 pb-2 border-gray-300 dark:border-gray-700 border-b">
                <MdOutlineRateReview className="flex-none text-blue-500 text-xl" />
                <span className="text-sm">{t( "20,450+ Reviews" )}</span>
              </div>

              <div className="flex items-center gap-2 pb-2 border-gray-300 dark:border-gray-700 border-b">
                <PiChalkboardTeacherLight className="flex-none text-blue-500 text-xl" />
                <span className="text-sm">{t( "25+ Courses" )}</span>
              </div>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 pb-2 border-gray-300 dark:border-gray-700 border-b text-blue-600 hover:text-blue-700 transition"
              >
                <FaLinkedin className="flex-none text-blue-500 text-xl" />
                <span className="text-sm">{t( "Follow on LinkedIn" )}</span>
              </a>
            </div>

            {/* CTA Button */}
            <div className="flex mt-6">
              <Button
                classSize="w-full"
                title={t( "Learn more about" )}
                link="#"
              />
            </div>
          </div>
        </div>
      </div>

    </div >

  );
}
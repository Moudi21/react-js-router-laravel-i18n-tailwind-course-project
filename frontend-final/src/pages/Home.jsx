import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {UserContext} from '../contexts/UserProvider';
import LanguageSelector from '../components/LanguageSelector';
import {Link} from 'react-router';
import Hero from '../components/Hero';
import SliderResponsive from '../components/SliderResponsive';
import TrendingCourses from '../components/TrendingCourses';
import CourseBrandsSection from '../components/CourseBrandsSection';
import Button from '../components/Button';
import MobileCategories from '../components/MobileCategories';
import LimitedTimeDeals from '../components/LimitedTimeDeals';

function Home() {
  const {user, logout, isAuth} = useContext( UserContext );

  const {t, i18n} = useTranslation();

  const images = [
    'https://source.unsplash.com/random/800x600?nature',
    'https://source.unsplash.com/random/800x600?city',
    'https://source.unsplash.com/random/800x600?tech',
    'https://source.unsplash.com/random/800x600?forest',
    'https://source.unsplash.com/random/800x600?space',
  ];

  const InstructorCard = ( {src, alt, name, role, className = ''} ) => {
    return (
      <article className={`group flex flex-col gap-4 ${ className }`}>
        <div className="relative shadow-md group-hover:shadow-xl rounded-2xl w-full aspect-square overflow-hidden group-hover:scale-105 transition-all duration-500 transform">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            loading="lazy"
            width={400}
            height={400}
          />

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          />

          {/* Instructor Info */}
          <div className="right-0 bottom-0 left-0 absolute p-4 transition-transform translate-y-full group-hover:translate-y-0 duration-300 transform">
            <h3 className="font-bold text-white text-lg">{name}</h3>
            <p className="text-gray-200 text-sm">{role}</p>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div>
      <Hero />
      <CourseBrandsSection />
      <TrendingCourses />

      <LimitedTimeDeals />

      <section className="relative my-15 py-4 overflow-hidden custom-container">
        <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center gap-12 w-full">

          {/* Text Content */}
          <div className="flex flex-col gap-8 w-full lg:max-w-2xl text-center lg:text-start">
            <header className="flex flex-col gap-6">
              <h1 className="font-semibold text-blue-600 dark:text-white text-3xl lg:text-4xl leading-tight tracking-[-0.033em]">
                Meet Our Top Instructors
              </h1>
              <p className="mx-auto lg:mx-0 max-w-2xl font-normal text-gray-600 dark:text-gray-400 lg:text-lg leading-relaxed">
                Learn from the best in the field. Our top instructors bring industry experience
                and expertise across various subjects, guiding you to achieve your learning goals.
              </p>
            </header>

            <div className="flex justify-center lg:justify-start">
              <Button
                classSize="leading-normal hover:-translate-y-1 duration-300 cursor-pointer transform min-w-[180px]"
                title="Meet All Our Experts"
                outline={true}
                aria-label="View all our expert instructors"
              />
            </div>
          </div>

          {/* Instructor Grid */}
          <div className="flex justify-center lg:justify-end w-full">
            <div className="gap-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 lg:max-w-lg md:max-w-3xl">

              {/* Instructor 1 */}
              <InstructorCard
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI8oWPUFqiZgCMVL3iGyArI28W-YXOMz1UDqyzrTZIwrXQ7clSlbi1u0jw8FgzbupB_kaIIzSW1CJIhPCqe8kbbGJVMAjXkbU37gTqIUlLChIUZLhgpf870HbBNgtl7vONQLZNOwTw4tBe7Ob4kT8-y7tMwd5SNPgKnim_s3mZNN7muc0lveXPtt1Ip8RmbFd0QO68kUrlrqjGO_DJaxAe4c4kZXMVrAXYl274o5f5oKhbju5K_00VyQkpwL5aYvjtO7aNgJEwioaT"
                alt="Professional headshot of Sarah Johnson, Leadership Communication Expert"
                name="Sarah Johnson"
                role="Leadership Communication Expert"
                className="mt-0"
              />

              {/* Instructor 2 */}
              <InstructorCard
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWR42UiAbIaXbA1r5K3GgjLVZHEaC0NgfDyV-WOcxKk-8wZ8wqEHTlbufQfYVPej5GRE5oMXd7lWBeZ-aXkn3cthx_8o83ehVX5cETZ19Uol1Kt9nki3-oRH59HnR-Y_UgEnO3E-IPCNL-lTq9QYiur96DS0AmE_qbpiVQqMd7nc8s9nWbo2-rkV_HA7NlXQZT9DMp8o1vh0WzWF4yzyZ4c144nuzqM1Po_O6i9pT3wZUcUjrsPv6HhEuSG-7URTwrrKF-KpAWGoMx"
                alt="Professional headshot of Michael Chen, Data Science Specialist"
                name="Michael Chen"
                role="Data Science Specialist"
                className="mt-8 lg:mt-12"
              />

              {/* Instructor 3 */}
              <InstructorCard
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbhGUOQQFlqdWOfrYYT4NYLi1M0CtygvmAlYj4WvEWD72kbSdoy7-aVVreeoBhuQKC8KUYd5r1FKTC4NUYN9YrrRK3oMqEjHjqmLBy4P2GWf9vdZDJbIFjv5O6du45WKo4jRL5sXGK43mszXL70Tf21ctfLKlDa3Aj3PDQt-K0VSfysPpkc57W_QtgyZakJ1sWmEmdpRwig-UR5Ko28EQQBQtvjQG9jI6t-q5qwy2P1o8xxdRnF6J7VXRjmmZFREigBTcaCMwQIy63"
                alt="Professional headshot of Elena Rodriguez, UX Design Instructor"
                name="Elena Rodriguez"
                role="UX Design Instructor"
                className="mt-0"
              />

              {/* Instructor 4 */}
              <InstructorCard
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDISE28fA8I9mincTF6Ai3xQQNb5RmmA5vCL8ygiqNCbsPlj5phbbpVOQVPU4FkWHFCKSxD7oeZntxxd-aqOF70UkO0S45DFQT_1SAZECP1GK83iPlWBRll9FcA1b8eIcBE5NyPeUR4wP7papC1NqiOqdv9gQ4Db83d2jq6EZNQNz7WUP34e-64DJ0M9sw8Lv4jMfy7XQq1nvzFC_kxI4bnosYh4XB2s5F4YqWmLhhlDWqkAiarIdVeGCmek7SebkOwA6whWGSlH6NF"
                alt="Professional headshot of David Wilson, Business Strategy Coach"
                name="David Wilson"
                role="Business Strategy Coach"
                className="mt-8 lg:mt-12"
              />

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;;
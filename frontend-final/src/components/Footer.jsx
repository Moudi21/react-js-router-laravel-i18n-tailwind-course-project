import {FaFacebook, FaGithub, FaInstagram, FaYoutube} from 'react-icons/fa';
import {FaXTwitter} from 'react-icons/fa6';
import {useTranslation} from 'react-i18next';

function Footer() {
  const {t} = useTranslation();
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'footer.courses.title',
      links: [
        'footer.courses.python',
        'footer.courses.marketing',
        'footer.courses.pmp',
        'footer.courses.design',
        'footer.courses.webdev',
        'footer.courses.excel',
        'footer.courses.powerbi',
        'footer.courses.ux',
        'footer.courses.all'
      ]
    },
    {
      title: 'footer.categories.title',
      links: [
        'footer.categories.tech',
        'footer.categories.software',
        'footer.categories.design',
        'footer.categories.marketing',
        'footer.categories.health',
        'footer.categories.development',
        'footer.categories.math',
        'footer.categories.language',
        'footer.categories.all'
      ]
    },
    {
      title: 'footer.company.title',
      links: [
        'footer.company.about',
        'footer.company.offer',
        'footer.company.careers',
        'footer.company.leadership',
        'footer.company.enterprise',
        'footer.company.partner',
        'footer.company.press',
        'footer.company.contact',
        'footer.company.catalog',
        'footer.company.support'
      ]
    },
    {
      title: 'footer.community.title',
      links: [
        'footer.community.instructors',
        'footer.community.stories',
        'footer.community.forums',
        'footer.community.events',
        'footer.community.partnerships',
        'footer.community.affiliate'
      ]
    }
  ];

  const socialIcons = [
    {Icon: FaInstagram, key: 'instagram'},
    {Icon: FaYoutube, key: 'youtube'},
    {Icon: FaXTwitter, key: 'twitter'},
    {Icon: FaGithub, key: 'github'},
    {Icon: FaFacebook, key: 'facebook'}
  ];

  return (
    <footer className="bg-[#F3F7FF] dark:bg-gray-900/60 dark:border-gray-800 dark:border-t custom-container">
      <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-12">
        {sections.map( ( section ) => (
          <div key={section.title}>
            <h3 className="mb-4 font-semibold text-gray-800 dark:text-white text-lg">
              {t( section.title )}
            </h3>
            <ul className="space-y-2">
              {section.links.map( ( link ) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-400 transition-colors duration-200"
                  >
                    {t( link )}
                  </a>
                </li>
              ) )}
            </ul>
          </div>
        ) )}
      </div>

      <div className="border-gray-300 dark:border-gray-700 border-t"></div>

      <div className="flex md:flex-row flex-col justify-between items-center gap-4 py-6">
        <p className="text-gray-600 dark:text-gray-400 md:text-left text-center">
          © {currentYear} <span className="font-semibold">{t( 'footer.copyright' )}</span>. {t( 'footer.rights' )}
        </p>
        <div className="flex gap-4 text-blue-500 text-2xl">
          {socialIcons.map( ( {Icon, key} ) => (
            <a key={key} href="#" className="hover:text-blue-600 transition">
              <Icon />
            </a>
          ) )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
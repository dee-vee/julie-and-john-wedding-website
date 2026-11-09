import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { Navigate, NavLink, useLocation } from 'react-router';
import { useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { useTranslation } from 'react-i18next';
import InvitationCard from './components/InvitationCard';
import LanguageSwitcher from './components/LanguageSwitcher';
import OurStory from './components/OurStory';
import TravelTabs from './components/TravelTabs';

interface GuideContent {
  key: string;
  details?: readonly string[];
}

interface SitePage extends GuideContent {
  path: string;
}

const pages: readonly SitePage[] = [
  { path: '/', key: 'home' },
  { path: '/events', key: 'sections.events', details: ['ceremony', 'reception', 'dress-code', 'weather'] },
  { path: '/travel', key: 'sections.travel' },
  { path: '/rsvp', key: 'sections.rsvp' },
  { path: '/faq', key: 'sections.faq' },
];

const pageRedirects = new Map([
  ['/about', '/#about'],
  ['/directions', '/travel?tab=flights'],
  ['/hotel', '/travel?tab=hotel'],
  ['/hotel-booking', '/travel?tab=hotel'],
  ['/dress-code', '/events'],
  ['/weather', '/events'],
]);

function SiteNavigation() {
  const { t } = useTranslation();

  return (
    <nav className="section-nav" aria-label={t('navigation')}>
      <ul>
        {pages.map(({ path, key }) => (
          <li key={path}>
            <NavLink to={path} end>
              {t(`${key}.title`)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function GuidePage({ page, title, children }: { page: GuideContent; title: string; children?: ReactNode }) {
  const { t } = useTranslation();
  const { key, details = [] } = page;

  return (
    <article className="guide-page">
      <h1>{title}</h1>
      <p>{t(`${key}.body`)}</p>
      {details.map((detail) => (
        <section className="guide-detail" key={detail}>
          <h2>{t(`${key}.${detail}.title`)}</h2>
          <p>{t(`${key}.${detail}.body`)}</p>
        </section>
      ))}
      {children}
    </article>
  );
}

export default function App() {
  const { t } = useTranslation();
  const { pathname, hash, key: locationKey } = useLocation();
  const currentPath = pathname.replace(/\/+$/, '') || '/';
  const previousDestination = useRef(currentPath);
  const mainRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const currentPage = pages.find(({ path }) => path === currentPath) ?? { key: 'missingPage' };
  const isHome = currentPath === '/';
  const siteTitle = t('title');
  const pageTitle = t(`${currentPage.key}.title`);

  useEffect(() => {
    document.title = isHome ? siteTitle : `${pageTitle} · ${siteTitle}`;
  }, [isHome, pageTitle, siteTitle]);

  useLayoutEffect(() => {
    const header = headerRef.current;
    const main = mainRef.current;
    if (!isHome || !header || !main) return;

    const updateHeaderHeight = () => {
      main.style.setProperty('--header-height', `${header.offsetHeight}px`);
    };

    updateHeaderHeight();
    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    const destination = currentPath + hash;
    const previous = previousDestination.current;
    previousDestination.current = destination;

    if (currentPath === '/' && hash === '#about') {
      const story = document.getElementById('about');
      story?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
      story?.focus({ preventScroll: true });
      return;
    }

    if (previous === destination) return;
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [currentPath, hash, locationKey, reduceMotion]);

  const redirect = pageRedirects.get(currentPath);
  if (redirect) return <Navigate to={redirect} replace />;

  return (
    <>
      <header className="site-header" ref={headerRef}>
        <SiteNavigation />
        <LanguageSwitcher />
      </header>
      <m.main
        key={currentPath}
        ref={mainRef}
        className={isHome ? 'home-main' : undefined}
        tabIndex={-1}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
      >
        {isHome ? (
          <>
            <InvitationCard title={siteTitle} coverAlt={t('coverAlt')} />
            <OurStory />
          </>
        ) : (
          <GuidePage page={currentPage} title={pageTitle}>
            {currentPath === '/travel' && <TravelTabs />}
          </GuidePage>
        )}
      </m.main>
    </>
  );
}

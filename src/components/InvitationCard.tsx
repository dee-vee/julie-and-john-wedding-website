import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import coverPhoto from '../assets/julie-john-cover.webp';
import roseBouquet from '../assets/rose-bouquet.webp';

export default function InvitationCard({ title, coverAlt }: { title: string; coverAlt: string }) {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!cardRef.current) return;

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.invitation-cover', { opacity: 0, duration: 0.8, ease: 'power1.out' });
    }, cardRef.current);

    return () => media.revert();
  }, []);

  return (
    <section className="invitation" aria-labelledby="wedding-title" ref={cardRef}>
      <img className="invitation-cover" src={coverPhoto} width="900" height="1350" alt={coverAlt} />
      <div className="invitation-details">
        <div className="invitation-heading">
          <p className="invitation-welcome">{t('invitationWelcome')}</p>
          <h1 id="wedding-title">{title}</h1>
        </div>
        <img className="invitation-bouquet" src={roseBouquet} width="480" height="480" alt="" />
        <p className="invitation-occasion">
          <time dateTime="2027-11-27">{t('weddingDate')}</time>
          <span>{t('weddingLocation')}</span>
        </p>
        <Link className="invitation-scroll" to="/#about" aria-label={t('scrollToStory')}>
          <svg width="29" height="29" viewBox="0 0 24 24" aria-hidden="true">
            <path d="m5 9 7 7 7-7" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

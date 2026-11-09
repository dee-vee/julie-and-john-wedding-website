import { useReducedMotion, type Variants } from 'motion/react';
import * as m from 'motion/react-m';
import { useTranslation } from 'react-i18next';

const photos = Object.entries(import.meta.glob<string>('../assets/story/*.webp', {
  eager: true,
  import: 'default',
  query: '?url',
})).sort(([first], [second]) => first.localeCompare(second))
  .map(([, src], index) => ({ src, index }));

const reveal: Variants = {
  waiting: { opacity: 0, y: 8, transition: { duration: 0 } },
  shown: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: index * 0.13, ease: 'easeOut' },
  }),
};

function PhotoColumn({ side }: { side: 'left' | 'right' }) {
  const reduceMotion = useReducedMotion();
  const parity = side === 'left' ? 0 : 1;

  return (
    <div className={`story-photos story-photos--${side}`} aria-hidden="true">
      {photos.filter(({ index }) => index % 2 === parity).map(({ src, index }) => (
        <m.img
          key={src}
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          custom={index}
          variants={reduceMotion ? undefined : reveal}
        />
      ))}
    </div>
  );
}

export default function OurStory() {
  const { t } = useTranslation();

  return (
    <section id="about" className="home-story guide-page" aria-labelledby="story-title" tabIndex={-1}>
      <h2 id="story-title">{t('sections.about.storyTitle')}</h2>
      <m.div
        className="story-layout"
        initial="waiting"
        whileInView="shown"
        viewport={{ amount: 0.15 }}
      >
        <PhotoColumn side="left" />
        <p className="story-copy">{t('sections.about.body')}</p>
        <PhotoColumn side="right" />
      </m.div>
    </section>
  );
}

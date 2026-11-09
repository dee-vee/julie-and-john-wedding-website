import type { KeyboardEvent } from 'react';
import { useSearchParams } from 'react-router';
import { useTranslation } from 'react-i18next';

const tabs = [
  { id: 'flights', detail: 'directions' },
  { id: 'hotel', detail: 'booking' },
  { id: 'activities' },
] as const;

export default function TravelTabs() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = tabs.find(({ id }) => id === searchParams.get('tab')) ?? tabs[0];

  function selectTab(id: string) {
    if (id === activeTab.id) return;
    setSearchParams((params) => {
      const next = new URLSearchParams(params);
      next.set('tab', id);
      return next;
    });
  }

  function moveFocus(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        nextIndex = (index + tabs.length - 1) % tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const { id } = tabs[nextIndex];
    selectTab(id);
    document.getElementById(`travel-tab-${id}`)?.focus();
  }

  return (
    <div className="travel-tabs">
      <div className="travel-tablist" role="tablist" aria-label={t('sections.travel.title')}>
        {tabs.map(({ id }, index) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`travel-tab-${id}`}
            aria-controls={`travel-panel-${id}`}
            aria-selected={id === activeTab.id}
            tabIndex={id === activeTab.id ? 0 : -1}
            onClick={() => selectTab(id)}
            onKeyDown={(event) => moveFocus(event, index)}
          >
            {t(`sections.travel.${id}.title`)}
          </button>
        ))}
      </div>
      {tabs.map((tab) => {
        const key = `sections.travel.${tab.id}`;

        return (
          <div
            key={tab.id}
            className="travel-panel"
            role="tabpanel"
            id={`travel-panel-${tab.id}`}
            aria-labelledby={`travel-tab-${tab.id}`}
            hidden={tab.id !== activeTab.id}
            tabIndex={0}
          >
            <p>{t(`${key}.body`)}</p>
            {'detail' in tab && (
              <section className="guide-detail">
                <h2>{t(`${key}.${tab.detail}.title`)}</h2>
                <p>{t(`${key}.${tab.detail}.body`)}</p>
              </section>
            )}
          </div>
        );
      })}
    </div>
  );
}

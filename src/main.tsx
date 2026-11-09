import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react';
import App from './App';
import { translationsReady } from './i18n';
import './styles.css';

const container = document.getElementById('root');
if (!container) throw new Error('Missing wedding website root element');

void translationsReady.then(() => {
  createRoot(container).render(
    <StrictMode>
      <BrowserRouter>
        <LazyMotion features={domAnimation} strict>
          <MotionConfig reducedMotion="user">
            <App />
          </MotionConfig>
        </LazyMotion>
      </BrowserRouter>
    </StrictMode>,
  );
});

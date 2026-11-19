import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootEl = document.getElementById('root')!;
const initialPath = window.location.pathname;

const hasPrerenderedContent =
  rootEl.childElementCount > 0 ||
  (rootEl.firstChild !== null && rootEl.firstChild.nodeType === Node.ELEMENT_NODE);

if (hasPrerenderedContent) {
  hydrateRoot(rootEl, <App initialPath={initialPath} />);
} else {
  createRoot(rootEl).render(<App initialPath={initialPath} />);
}

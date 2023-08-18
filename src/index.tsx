import { render } from 'preact';
import { LocationProvider, Route, Router } from 'preact-iso';
import Home from './pages/Home';
import { NotFound } from './pages/_404.jsx';
import './style.css';
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    /* eslint-disable no-alert */
    if (confirm('New content available. Reload?')) {
      updateSW(true);
    }
  },
});

const Footer = () => (
  <footer style="position: absolute; bottom: 8px">
    See source code{' '}
    <a
      href="https://github.com/dannyh79/wake-up"
      target="_blank"
      rel="noopener noreferrer"
    >
      here
    </a>
    . Internet required ;)
  </footer>
);

export const App = () => (
  <LocationProvider>
    <Router>
      <Route path="/" component={Home} />
      <Route default component={NotFound} />
    </Router>
    <Footer />
  </LocationProvider>
);

render(<App />, document.getElementById('app'));

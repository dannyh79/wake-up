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
  }
});

export function App() {
  return (
    <LocationProvider>
      <Router>
        <Route path="/" component={Home} />
        <Route default component={NotFound} />
      </Router>
    </LocationProvider>
  );
}

render(<App />, document.getElementById('app'));

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import '@fontsource-variable/stix-two-text/wght.css'
import '@fontsource-variable/stix-two-text/wght-italic.css'
import './styles.css'
import { TimeProvider } from './lib/time'
import Layout from './components/Layout'
import Home from './pages/Home'
import Menus from './pages/Menus'
import PrivateDining from './pages/PrivateDining'
import ThePub from './pages/ThePub'
import Visit from './pages/Visit'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TimeProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="menus" element={<Menus />} />
            <Route path="menus/:which" element={<Menus />} />
            <Route path="private-dining" element={<PrivateDining />} />
            <Route path="the-pub" element={<ThePub />} />
            <Route path="visit" element={<Visit />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </TimeProvider>
  </StrictMode>,
)

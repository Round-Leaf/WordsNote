import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.tsx'
import MasteryPage from './components/MasteryPage.tsx'

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/mastery" element={<MasteryPage/>} />
      </Routes>
    </BrowserRouter>
  //</StrictMode>,
)

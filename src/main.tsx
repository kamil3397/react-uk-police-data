import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {ForceDetails} from './pages/ForceDetails/ForceDetails.tsx'
import {Home} from './pages/Home/Home.tsx'
import App from './App.tsx'
import './App.scss'
import {CrimesPage} from './pages/CrimesPage/CrimesPage.tsx'
import { CrimesProvider } from './context/CrimeContext.tsx'
import { PoliceProvider } from './context/PoliceContext.tsx'
import { ForcesPage } from './pages/Forces/ForcesPage.tsx'

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    { index: true, element: <Home /> },
    { path: 'forces', element: <ForcesPage /> },
    { path: 'forces/:id', element: <ForceDetails /> },
    { path: 'crimes', element: <CrimesPage /> },
  ]
}])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PoliceProvider>
      <CrimesProvider>
        <RouterProvider router={router} />
      </CrimesProvider>
    </PoliceProvider>
  </StrictMode>,
)

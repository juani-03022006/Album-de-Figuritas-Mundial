import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { AlbumProvider } from './context/AlbumContext.jsx';
import SeleccionesSection from './sections/SeleccionesSection.jsx';
import PosicionesSection from './sections/PosicionesSection.jsx';
import FiguritasSection from './sections/FiguritasSection.jsx';
import SidebarSection from './sections/SidebarSection.jsx';
import DashboardSection from './sections/DashboardSection.jsx';


const AUTH_URL = import.meta.env.VITE_AUTH_URL || 'http://localhost:4000';
const USER_FRONTEND_URL = import.meta.env.VITE_USER_FRONTEND_URL || 'http://localhost:5173';
const TOKEN_KEY = 'album_admin_access_token';
const ADMIN_USERNAMES = (import.meta.env.VITE_ADMIN_USERNAMES || 'admin_album')
    .split(',')
    .map((username) => username.trim())
    .filter(Boolean);


function readTokenFromCallbackHash() {
    if (window.location.pathname !== '/auth/callback') return null;

    const hash = window.location.hash.startsWith('#')
        ? window.location.hash.slice(1)
        : window.location.hash;

    const params = new URLSearchParams(hash);
    return params.get('access_token');
};

function clearCallbackUrl() {
    if (window.location.pathname === '/auth/callback') {
        window.history.replaceState({}, document.title, '/');
    };
};

function redirectToUserLogin() {
    window.location.replace(USER_FRONTEND_URL);
};


function isAdminUser(user) {
    return user?.roles?.includes('admin') || ADMIN_USERNAMES.includes(user?.username);
}

async function fetchAdminUser(accessToken) {
    const response = await fetch(`${AUTH_URL}/api/me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error('No se pudo validar la sesión de administrador');
    };

    const data = await response.json();
    return data.usuario;
};

function Layout({ children, handleLogout }) {
    return (
        <div className="d-flex" style={{ minHeight: "100vh", background: "#f0f4f8" }}>
            <SidebarSection />
            {handleLogout && (
                <button
                    type="button"
                    className="btn btn-outline-danger bg-white shadow-sm position-fixed fw-semibold"
                    style={{ top: 16, right: 24, zIndex: 1050 }}
                    onClick={handleLogout}
                >
                    Cerrar sesión
                </button>
            )}

            <main className="flex-grow-1 p-4 overflow-auto">{children}</main>
        </div>
    );
};


export default function App() {
    const [isInitialized, setIsInitialized] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        let isMounted = true;

        async function validateSession() {
            const callbackToken = readTokenFromCallbackHash();

            if (callbackToken) {
                localStorage.setItem(TOKEN_KEY, callbackToken);
                clearCallbackUrl();
            }

            const token = callbackToken || localStorage.getItem(TOKEN_KEY);

            if (!token) {
                redirectToUserLogin();
                return;
            }

            try {
                const user = await fetchAdminUser(token);


                if (!isAdminUser(user)) {
                    throw new Error('El usuario no tiene rol admin');
                }

                if (!isMounted) return;
                setIsAuthorized(true);
            } catch {
                localStorage.removeItem(TOKEN_KEY);
                redirectToUserLogin();
                return;
            } finally {
                if (isMounted) {
                    setIsInitialized(true);
                }
            }
        }

        validateSession();

        return () => {
            isMounted = false;
        };
    }, []);

    function handleLogout() {
        localStorage.removeItem(TOKEN_KEY);
        window.location.href = `${AUTH_URL}/logout`;
    }

    if (!isInitialized || !isAuthorized) {
        return (
            <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light text-secondary">
                Validando sesión de administrador...
            </div>
        );
    }

    return (
        <BrowserRouter>
            <AlbumProvider>
                <Layout handleLogout={handleLogout}>
                    <Routes>
                        <Route path="/" element={<DashboardSection />} />
                        <Route path="/selecciones" element={<SeleccionesSection />} />
                        <Route path="/posiciones" element={<PosicionesSection />} />
                        <Route path="/figuritas" element={<FiguritasSection />} />
                        <Route path="/auth/callback" element={<DashboardSection />} />
                    </Routes>
                </Layout>
            </AlbumProvider>
        </BrowserRouter>
    );
};

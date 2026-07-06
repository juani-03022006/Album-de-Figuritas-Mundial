import { NavLink } from 'react-router-dom';


function SidebarSection() {
    const navItems = [
        { to: "/", label: "Dashboard", icon: "🏠" },
        { to: "/selecciones", label: "Selecciones", icon: "🌍" },
        { to: "/posiciones", label: "Posiciones", icon: "📋" },
        { to: "/figuritas", label: "Figuritas", icon: "⚽" },
    ];

    return (
        <nav
            className="d-flex flex-column p-0 text-white"
            style={{
                width: 220,
                minHeight: "100vh",
                background: "linear-gradient(180deg, #1a3a6b 0%, #0d2444 100%)",
                flexShrink: 0,
            }}
        >

            {/* Logo */}
            <div className="p-4 border-bottom border-white border-opacity-25 text-center">
                <div style={{ fontSize: 36 }}>🏆</div>
                <div className="fw-bold mt-1" style={{ fontSize: 13, letterSpacing: 1 }}>
                    ALBUM MUNDIAL
                </div>
                <div className="text-white-50" style={{ fontSize: 11 }}>
                    Panel de Administración
                </div>
            </div>

            {/* Nav links */}
            <ul className="nav flex-column p-2 flex-grow-1">
                {navItems.map((item) => (
                    <li className="nav-item" key={item.to}>
                        <NavLink
                            to={item.to}
                            end={item.to === "/"}
                            className={({ isActive }) =>
                                `nav-link d-flex align-items-center gap-2 rounded mb-1 px-3 py-2 ${isActive
                                    ? "active text-white fw-semibold"
                                    : "text-white-50"
                                }`
                            }
                            style={({ isActive }) => ({
                                background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
                                transition: "background 0.15s",
                            })}
                        >
                            <span>{item.icon}</span>
                            <span style={{ fontSize: 14 }}>{item.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>

            <div className="p-3 text-center text-white-50" style={{ fontSize: 11 }}>
                USA - CANADA - MEXICO 2026
            </div>
        </nav>
    );
};

export default SidebarSection;

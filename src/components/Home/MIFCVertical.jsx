import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ImagePlaceholder, BusinessCard, AnimatedCard, AboutSection, BusinessCardGrid } from '../Common/CommonComponents';
import HeroImageSection from '../Common/HeroImageSection';
import '../../assets/reckless/stylesheet.css';
import LOGO from '../../assets/MIFC_logo.svg';

// Import hero images for carousel
import hero1 from "../../assets/HeroImages/hero1.png";
import hero2 from "../../assets/HeroImages/hero2.png";
import hero3 from "../../assets/HeroImages/hero3.jpg";
import hero4 from "../../assets/HeroImages/hero4.jpg";

const colors = {
    turquoise: '#0ddbcc',
    deepBlue: '#3b76d8',
    lightCyan: '#43ebff',
    navy: '#003A76',
    brightBlue: '#0094fb',
    futureBg: '#3B76D8',
    whatsOnBg: '#0C347A'
};

// ...existing code...

const MIFCVertical = () => {
    const containerRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [navOpacity, setNavOpacity] = useState(1);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    
    // Hero images array for the carousel
    const heroImages = [hero1, hero2, hero3, hero4];
    
    // Lifestyle cards data
    const lifestyleCards = [
        { title: 'Retail', subtitle: 'A vibrant destination to shop', color: '#888888', bgColor: '#F5F5F5', image: null },
        { title: 'Dine', subtitle: 'Dining options to suit all tastes', color: colors.navy, bgColor: 'white', border: `1px solid ${colors.navy}20`, image: null },
        { title: 'Discover', subtitle: 'A world of art, in one place', color: colors.navy, bgColor: '#F5F5F5', image: null },
        { title: 'Unwind', subtitle: 'Take a moment for yourself', color: colors.navy, bgColor: 'white', border: `1px solid ${colors.navy}20`, image: null },
        { title: 'Sports &', subtitle2: 'Entertainment', desc: 'The fun never ends.', color: 'white', bgColor: colors.turquoise, special: true, image: null },
        { title: 'Safaris', subtitle: 'Wildlife adventures await', color: colors.navy, bgColor: '#F5F5F5', image: null },
        { title: 'Snorkeling', subtitle: 'Explore underwater wonders', color: colors.navy, bgColor: 'white', border: `1px solid ${colors.navy}20`, image: null },
        { title: 'Islands', subtitle: 'Discover pristine paradise', color: colors.navy, bgColor: '#F5F5F5', image: null },
        { title: 'Offers', subtitle: 'Exclusive deals and packages', color: colors.navy, bgColor: 'white', border: `1px solid ${colors.navy}20`, image: null },
        { title: 'Events', subtitle: 'Memorable experiences', color: colors.navy, bgColor: '#F5F5F5', image: null }
    ];
    
    // Properties data
    const propertiesData = [
        { name: 'Tower 1', image: null },
        { name: 'Tower 2', image: null },
        { name: 'Tower 3', image: null },
        { name: 'Tower 4', image: null },
        { name: 'Tower 5', image: null },
        { name: 'Tower 6', image: null }
    ];
    
    const [propertySlide, setPropertySlide] = useState(0);
    const maxPropertySlides = Math.max(0, propertiesData.length - 3); // Show 3 cards at a time
    
    const maxSlides = Math.max(0, lifestyleCards.length - 4); // Show 4 cards at a time
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const nextSlide = () => {
        const maxMobileSlides = Math.max(0, lifestyleCards.length - 1); // Show 1 card at a time on mobile
        const currentMaxSlides = isMobile ? maxMobileSlides : maxSlides;
        setCurrentSlide(prev => Math.min(prev + 1, currentMaxSlides));
    };
    
    const prevSlide = () => {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
    };
    
    const getTransformValue = () => {
        if (isMobile) {
            return `translateX(-${currentSlide * (260 + 30)}px)`;
        }
        return `translateX(-${currentSlide * (280 + 30)}px)`;
    };
    
    const getPropertyTransformValue = () => {
        if (isMobile) {
            return `translateX(-${propertySlide * (300 + 30)}px)`;
        }
        return `translateX(-${propertySlide * (350 + 30)}px)`;
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const progress = (container.scrollTop / (container.scrollHeight - container.clientHeight)) * 100;
            setScrollProgress(progress);
            
            // Hide nav completely when scrolling past first section (100vh)
            const firstSectionHeight = window.innerHeight;
            const opacity = container.scrollTop < firstSectionHeight ? 1 : 0;
            setNavOpacity(opacity);
        };

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                container.scrollBy({ top: -300, behavior: 'smooth' });
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                container.scrollBy({ top: 300, behavior: 'smooth' });
            }
        };

        container.addEventListener('scroll', handleScroll);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            container.removeEventListener('scroll', handleScroll);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const ImagePlaceholder = ({ height = 300, src = null, alt = "Image", className = "" }) => (
        <div className={className} style={{ height, borderRadius: '12px', overflow: 'hidden', border: `1px solid ${colors.turquoise}20`, position: 'relative' }}>
            {src ? (


                <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
                <div style={{ height: '100%', background: colors.lightCyan, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', fontWeight: 600 }}>
                    Image Placeholder
                </div>
            )}
        </div>
    );

    const BusinessCard = ({ icon, title, description, buttonColor = 'turquoise', buttonText = 'Get started' }) => (
        <motion.div whileHover={{ y: -8, scale: 1.02 }} style={{ cursor: 'pointer' }}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', height: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ fontSize: '48px', color: colors[buttonColor], marginBottom: '20px', textAlign: 'center' }}>{icon}</div>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: colors.navy, marginBottom: '16px', textAlign: 'center' }}>{title}</h3>
                    <p style={{ fontSize: '14px', color: colors.navy, opacity: 0.8, lineHeight: 1.5, textAlign: 'center' }}>{description}</p>
                </div>
                <motion.button whileHover={{ scale: 1.05 }} style={{ width: '100%', padding: '12px 24px', background: colors[buttonColor], color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    {buttonText} <span>→</span>
                </motion.button>
            </div>
        </motion.div>
    );

    const AnimatedCard = ({ children }) => (
        <motion.div whileHover={{ y: -15, scale: 1.03, transition: { duration: 0.4, ease: 'easeOut' } }} style={{ cursor: 'pointer', transformOrigin: 'center' }}>
            {children}
        </motion.div>
    );

    // ...existing code...
    return (
        <div style={{ height: '100vh', overflow: 'hidden', background: colors.navy }}>

            <style>{`
* {
    font-family: 'Reckless Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif !important;
}

.logo-responsive {
    width: 200px;
    height: 60px;
    object-fit: contain;
}

.vertical-container::-webkit-scrollbar { 
    width: 8px; 
}
.vertical-container::-webkit-scrollbar-track { 
    background: transparent; 
}
.vertical-container::-webkit-scrollbar-thumb { 
    background: ${colors.turquoise}40; 
    border-radius: 4px; 
}
.vertical-container::-webkit-scrollbar-thumb:hover { 
    background: ${colors.turquoise}60; 
}
.vertical-container { 
    scrollbar-width: thin; 
    scrollbar-color: ${colors.turquoise}40 transparent; 
}

.nav-menu {
    display: flex;
    align-items: center;
    gap: 32px;
}

.hamburger-menu {
    display: none;
    flex-direction: column;
    cursor: pointer;
    padding: 8px;
}

.hamburger-line {
    width: 25px;
    height: 3px;
    background: white;
    margin: 3px 0;
    transition: 0.3s;
}

.mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${colors.navy};
    padding: 20px;
    border-radius: 0 0 16px 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.mobile-menu-item {
    padding: 15px 0;
    border-bottom: 1px solid ${colors.turquoise}20;
    color: white;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.3s ease;
}

.mobile-menu-item:hover {
    color: ${colors.turquoise};
}

.mobile-menu-item:last-child {
    border-bottom: none;
}

@media (max-width: 768px) {
    .logo-responsive {
        width: 150px;
        height: 45px;
    }
    
    .nav-menu {
        display: none;
    }
    
    .hamburger-menu {
        display: flex;
    }
    
    .vertical-container { 
        padding: 0 20px !important; 
    }
    .vertical-container > section { 
        min-height: 100vh !important; 
        padding: 40px 20px !important; 
    }
    
    /* Mobile card grid */
    .business-card-grid {
        grid-template-columns: 1fr !important;
        gap: 24px !important;
        max-width: 350px !important;
        margin: 0 auto !important;
        padding: 0 20px !important;
        justify-items: center !important;
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
        .business-card-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 32px !important;
            max-width: 800px !important;
        }
    }
    
    @media (min-width: 1025px) {
        .business-card-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 48px !important;
            max-width: 1400px !important;
        }
    }
    
    /* Mobile lifestyle section */
    .lifestyle-header {
        flex-direction: column !important;
        text-align: center !important;
        gap: 30px !important;
    }
    
    .lifestyle-controls {
        order: -1 !important;
    }
    
    .lifestyle-card {
        height: 280px !important;
        padding: 16px !important;
        min-width: 260px !important;
        width: 260px !important;
    }
    
    /* Mobile properties section */
    .properties-header {
        flex-direction: column !important;
        text-align: center !important;
        gap: 20px !important;
    }
    
    .properties-controls {
        order: -1 !important;
    }
    
    .property-card {
        height: 220px !important;
        min-width: 250px !important;
        width: 250px !important;
    }
}

.dropdown-menu {
position: fixed;
top: 55px;
left: 20%;
transform: translateX(-20%);
background: white;
border-radius: 16px;
padding: 24px;
box-shadow: 0 15px 45px rgba(0,0,0,0.12);
border: 1px solid ${colors.turquoise}20;
width: 1000px;
max-width: 90vw;
z-index: 999;
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 30px;
will-change: transform, opacity;
backface-visibility: hidden;
}
.dropdown-column {
display: flex;
flex-direction: column;
}
.dropdown-header {
display: flex;
align-items: center;
gap: 8px;
padding: 12px 0;
border-bottom: 2px solid ${colors.turquoise};
margin-bottom: 16px;
}
.dropdown-header h3 {
font-size: 16px;
font-weight: 700;
color: ${colors.navy};
margin: 0;
}
.dropdown-header-arrow {
color: ${colors.turquoise};
font-size: 18px;
font-weight: bold;
}
.dropdown-item {
padding: 10px 12px;
color: ${colors.navy};
font-size: 14px;
font-weight: 500;
cursor: pointer;
transition: all 0.3s ease;
display: flex;
align-items: center;
gap: 8px;
border-radius: 8px;
margin-bottom: 4px;
}
.dropdown-item:hover {
background: ${colors.turquoise}10;
color: ${colors.turquoise};
transform: translateX(6px);
}
.dropdown-item-icon {
width: 8px;
height: 8px;
background: ${colors.turquoise};
border-radius: 50%;
opacity: 0.7;
transition: all 0.3s ease;
}
.dropdown-item:hover .dropdown-item-icon {
opacity: 1;
transform: scale(1.2);
}
.frequently-accessed {
grid-column: 1 / -1;
margin-top: 20px;
padding-top: 20px;
border-top: 2px solid ${colors.turquoise}20;
}
.frequently-accessed h4 {
display: flex;
align-items: center;
gap: 8px;
font-size: 16px;
font-weight: 700;
color: ${colors.turquoise};
margin-bottom: 16px;
}
.frequently-accessed-items {
display: flex;
gap: 12px;
flex-wrap: wrap;
}
.frequently-accessed-item {
padding: 8px 16px;
background: ${colors.turquoise}10;
color: ${colors.turquoise};
border-radius: 20px;
font-size: 13px;
font-weight: 600;
cursor: pointer;
transition: all 0.3s ease;
border: 1px solid ${colors.turquoise}20;
}
.frequently-accessed-item:hover {
background: ${colors.turquoise};
color: white;
transform: translateY(-3px);
box-shadow: 0 8px 25px ${colors.turquoise}40;
}

.enquiry-button {
position: absolute;
top: 20px;
right: 20px;
background: ${colors.navy};
color: white;
padding: 12px 24px;
border: none;
border-radius: 8px;
font-size: 14px;
font-weight: 600;
cursor: pointer;
transition: all 0.3s ease;
}

.enquiry-button:hover {
background: ${colors.turquoise};
transform: translateY(-2px);
box-shadow: 0 8px 20px rgba(13, 219, 204, 0.3);
}
`}</style>

            <motion.nav 
                style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    zIndex: 1000, 
                    background: 'transparent', 
                    padding: '16px 0',
                    opacity: navOpacity,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: navOpacity > 0 ? 'auto' : 'none'
                }}
            >
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px' }}>
                    <img src={LOGO} alt="MIFC Logo" className="logo-responsive" />
                    
                    {/* Desktop Navigation */}
                    <div className="nav-menu">
                        {[
                            { name: 'About', dropdown: null },
                            { 
                                name: 'Business', 
                                dropdown: {
                                    'Establish a Business': [
                                        'Financial', 
                                        'Non-Financial', 
                                        'AI, FinTech and Innovation', 
                                        'Retail and Leisure'
                                    ],
                                    'Services': [
                                        'Data Centres', 
                                        'Spaces & Offices', 
                                        'Event Hosting', 
                                        'Visas', 
                                        'Documents Hub',
                                        'Application Tracking'
                                    ],
                                    'Laws and Regulations': [
                                        'Public Register', 
                                        'Registrars & Commissioners', 
                                        'List of Registered Auditors', 
                                        'List of Insolvency Practitioners'
                                    ]
                                }
                            },
                            { name: 'Services', dropdown: null },
                            { name: 'Decentralized Finance', dropdown: null },
                            { name: 'Lifestyle & Wellbeing', dropdown: null },
                            { name: 'News & Press', dropdown: null },
                            { name: 'Contact', dropdown: null }
                        ].map((item) => (
                            <div key={item.name} style={{ position: 'relative' }}
                                onMouseEnter={() => setActiveDropdown(item.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <a href="#" style={{ fontSize: '20px', fontWeight: 500, color: '#003A76', textDecoration: 'none', transition: 'color 0.3s ease', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                                    {item.name}
                                    {item.dropdown && <span style={{ fontSize: '10px', color: colors.turquoise }}>▼</span>}
                                </a>
                                {item.dropdown && activeDropdown === item.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                        transition={{ 
                                            duration: 0.2, 
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                            type: 'tween'
                                        }}
                                        className="dropdown-menu"
                                    >
                                        {/* <button className="enquiry-button">Make an Enquiry</button> */}
                                        {Object.entries(item.dropdown).map(([category, items], i) => (
                                            <div key={category} className="dropdown-column">
                                                <div className="dropdown-header">
                                                    <h3>{category}</h3>
                                                    <span className="dropdown-header-arrow">→</span>
                                                </div>
                                                {items.map((subItem, j) => (
                                                    <div key={j} className="dropdown-item">
                                                        <div className="dropdown-item-icon" />
                                                        {subItem}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                        {item.name === 'Business' && (
                                            <div className="frequently-accessed">
                                                <h4>
                                                    <div className="dropdown-item-icon" style={{ background: colors.turquoise, opacity: 1 }} />
                                                    Frequently Accessed
                                                </h4>
                                                <div className="frequently-accessed-items">
                                                    <div className="frequently-accessed-item">Public Register</div>
                                                    <div className="frequently-accessed-item">Legal Database</div>
                                                    <div className="frequently-accessed-item">Handbooks & Fees</div>
                                                    <div className="frequently-accessed-item">Templates & Downloads</div>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Mobile Hamburger Menu */}
                    <div className="hamburger-menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <div className="hamburger-line" style={{ 
                            transform: isMobileMenuOpen ? 'rotate(-45deg) translate(-5px, 6px)' : 'none' 
                        }}></div>
                        <div className="hamburger-line" style={{ 
                            opacity: isMobileMenuOpen ? '0' : '1' 
                        }}></div>
                        <div className="hamburger-line" style={{ 
                            transform: isMobileMenuOpen ? 'rotate(45deg) translate(-5px, -6px)' : 'none' 
                        }}></div>
                    </div>
                    
                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mobile-menu"
                        >
                            {[
                                'About', 'Business', 'Services', 'Decentralized Finance', 
                                'Lifestyle & Wellbeing', 'News & Press', 'Contact'
                            ].map((item) => (
                                <div key={item} className="mobile-menu-item">
                                    {item}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </motion.nav>

            <div ref={containerRef} className="vertical-container" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden', scrollBehavior: 'smooth' }}>

                <HeroImageSection 
                    images={heroImages}
                    activeDropdown={activeDropdown}
                    title="Maldives International Financial Centre"
                >
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 1.2, delay: 0.3 }} 
                        style={{ 
                            position: 'relative', 
                            zIndex: 2, 
                            textAlign: 'left', 
                            maxWidth: '900px', 
                            padding: '0 40px', 
                            color: 'white' 
                        }}
                    >
                        <h1 style={{ 
                            fontSize: 'clamp(2.5rem,6vw,5rem)', 
                            fontWeight: 800, 
                            marginBottom: '24px', 
                            lineHeight: 1.1, 
                            color: 'white', 
                            textShadow: '0 4px 20px rgba(0,0,0,0.3)' 
                        }}>
                            Maldives International Financial Centre
                        </h1>
                        {/* <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }} style={{ fontSize: 'clamp(1.2rem,3vw,2rem)', fontWeight: 300, marginBottom: '40px', color: colors.lightCyan, opacity: 0.95 }}>Rethinking finance. Redefining lifestyle.</motion.p> */}
                    </motion.div>
                </HeroImageSection>

                <AboutSection minWidth="100%" />

                <section style={{ minHeight: '85vh', background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '50px 20px' }}>
                    <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
                        <BusinessCardGrid
                            title="MIFC Business Categories"
                            backgroundColor="#f0f2f5"
                            titleColor="turquoise"
                            columns={4}
                            padding="10px"
                            minHeight="auto"
                            cardWidth="280px"
                            cards={[
                            {
                                icon: "💼",
                                title: "Business in MIFC",
                                description: "The leading financial hub in the region.",
                                buttonColor: "turquoise",
                                buttonText: "Get started"
                            },
                            {
                                icon: "�",
                                title: "Legal Resources",
                                description: "A world-class judicial system based on English common law.",
                                buttonColor: "deepBlue",
                                buttonText: "Get started"
                            },
                            {
                                icon: "🏖️",
                                title: "Experience in MIFC",
                                description: "An unparalleled destination for residents and visitors.",
                                buttonColor: "brightBlue",
                                buttonText: "Get started"
                            },
                            {
                                icon: "🏢",
                                title: "MIFC Public Register",
                                description: "An extensive range of registered companies in MIFC.",
                                buttonColor: "turquoise",
                                buttonText: "Get started"
                            }
                        ]}
                    />
                    </div>
                </section>

                {/* New Lifestyle & Entertainment Section */}
                <section style={{ minHeight: '100vh', background: 'white', display: 'flex', alignItems: 'center', padding: '80px 0', position: 'relative' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 40px' }}>
                        <div className="lifestyle-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '60px' }}>
                            <div style={{ flex: 1, maxWidth: '500px' }}>
                                {/* <h2 style={{ 
                                    fontSize: 'clamp(2rem, 4vw, 3rem)', 
                                    fontWeight: 800, 
                                    color: colors.navy, 
                                    marginBottom: '20px',
                                    lineHeight: 1.2
                                }}>
                                    Experience an urban lifestyle
                                </h2> */}
                                <p style={{ 
                                    fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', 
                                    color: colors.navy, 
                                    opacity: 0.8, 
                                    lineHeight: 1.4,
                                    marginBottom: '0'
                                }}>
                                    Experience an urban lifestyle collective of dining, retail, and entertainment options
                                </p>
                            </div>
                            <div className="lifestyle-controls" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <button style={{ 
                                    background: colors.navy, 
                                    color: 'white', 
                                    padding: '12px 24px', 
                                    border: 'none', 
                                    borderRadius: '8px', 
                                    fontSize: '14px', 
                                    fontWeight: 600, 
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}>
                                    Things to do
                                </button>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button 
                                        onClick={prevSlide}
                                        disabled={currentSlide === 0}
                                        style={{ 
                                            width: '40px', 
                                            height: '40px', 
                                            borderRadius: '50%', 
                                            border: `2px solid ${colors.navy}20`, 
                                            background: currentSlide === 0 ? '#f0f0f0' : 'white', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center', 
                                            cursor: currentSlide === 0 ? 'not-allowed' : 'pointer',
                                            fontSize: '18px',
                                            color: currentSlide === 0 ? '#ccc' : colors.navy,
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        ‹
                                    </button>
                                    <button 
                                        onClick={nextSlide}
                                        disabled={currentSlide >= (isMobile ? lifestyleCards.length - 1 : maxSlides)}
                                        style={{ 
                                            width: '40px', 
                                            height: '40px', 
                                            borderRadius: '50%', 
                                            border: `2px solid ${colors.navy}20`, 
                                            background: currentSlide >= (isMobile ? lifestyleCards.length - 1 : maxSlides) ? '#f0f0f0' : 'white', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center', 
                                            cursor: currentSlide >= (isMobile ? lifestyleCards.length - 1 : maxSlides) ? 'not-allowed' : 'pointer',
                                            fontSize: '18px',
                                            color: currentSlide >= (isMobile ? lifestyleCards.length - 1 : maxSlides) ? '#ccc' : colors.navy,
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        ›
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div style={{ 
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div 
                                className="lifestyle-cards-container"
                                style={{ 
                                    display: 'flex',
                                    gap: '30px',
                                    transition: 'transform 0.5s ease',
                                    transform: getTransformValue(),
                                    paddingBottom: '20px'
                                }}
                            >
                                {lifestyleCards.map((item, index) => (
                                    <motion.div 
                                        key={index}
                                        className="lifestyle-card"
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        style={{ 
                                            background: item.bgColor, 
                                            // borderRadius: '16px', 
                                            padding: '20px', 
                                            height: '320px',
                                            minWidth: '280px',
                                            width: '280px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            border: item.border || 'none',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            flexShrink: 0
                                        }}
                                    >
                                        {/* Image area */}
                                        <div style={{ 
                                            width: '100%', 
                                            height: '140px', 
                                            background: item.image ? `url(${item.image}) center/cover` : (item.special ? 'rgba(255,255,255,0.2)' : `${colors.turquoise}10`), 
                                            borderRadius: '12px',
                                            marginBottom: '16px',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}>
                                            {!item.image && (
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    fontSize: '48px',
                                                    opacity: 0.3,
                                                    color: item.special ? 'white' : colors.turquoise
                                                }}>
                                                    {item.title === 'Retail' && '🛍️'}
                                                    {item.title === 'Dine' && '🍽️'}
                                                    {item.title === 'Discover' && '🎨'}
                                                    {item.title === 'Unwind' && '🧘'}
                                                    {item.title === 'Sports &' && '🎯'}
                                                    {item.title === 'Safaris' && '🦁'}
                                                    {item.title === 'Snorkeling' && '🤿'}
                                                    {item.title === 'Islands' && '🏝️'}
                                                    {item.title === 'Offers' && '💎'}
                                                    {item.title === 'Events' && '🎪'}
                                                </div>
                                            )}
                                        </div>

                                        {/* Title section */}
                                        <div style={{ marginBottom: 'auto' }}>
                                            <h3 style={{ 
                                                fontSize: '24px', 
                                                fontWeight: 700, 
                                                color: item.color, 
                                                marginBottom: item.subtitle2 ? '0' : '8px',
                                                lineHeight: 1.2
                                            }}>
                                                {item.title}
                                            </h3>
                                            {item.subtitle2 && (
                                                <h3 style={{ 
                                                    fontSize: '24px', 
                                                    fontWeight: 700, 
                                                    color: item.color, 
                                                    marginBottom: '8px',
                                                    marginTop: '0',
                                                    lineHeight: 1.2
                                                }}>
                                                    {item.subtitle2}
                                                </h3>
                                            )}
                                        </div>

                                        {/* Description at bottom */}
                                        <div style={{ marginTop: 'auto' }}>
                                            {item.desc && (
                                                <p style={{ 
                                                    fontSize: '14px', 
                                                    color: item.color, 
                                                    opacity: 0.9, 
                                                    margin: '0 0 16px 0',
                                                    lineHeight: 1.4
                                                }}>
                                                    {item.desc}
                                                </p>
                                            )}
                                            {item.subtitle && (
                                                <p style={{ 
                                                    fontSize: '14px', 
                                                    color: item.color, 
                                                    opacity: 0.8, 
                                                    margin: '0 0 16px 0',
                                                    lineHeight: 1.4
                                                }}>
                                                    {item.subtitle}
                                                </p>
                                            )}

                                            <motion.div 
                                                whileHover={{ x: 8 }}
                                                style={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    gap: '12px', 
                                                    color: item.special ? 'white' : colors.turquoise, 
                                                    fontWeight: 600, 
                                                    fontSize: '14px', 
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Explore More
                                                <div style={{ 
                                                    width: '32px', 
                                                    height: '32px', 
                                                    background: item.special ? 'rgba(255,255,255,0.2)' : colors.turquoise, 
                                                    borderRadius: '50%', 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'center', 
                                                    color: item.special ? 'white' : 'white', 
                                                    fontSize: '16px' 
                                                }}>
                                                    →
                                                </div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* New Properties Section */}
                <section style={{ 
                    minHeight: '50vh', 
                    background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '40px 0', 
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Background overlay pattern */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `radial-gradient(circle at 25% 25%, ${colors.turquoise}05 0%, transparent 50%), 
                                         radial-gradient(circle at 75% 75%, ${colors.brightBlue}05 0%, transparent 50%)`,
                        pointerEvents: 'none'
                    }} />
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 40px', position: 'relative', zIndex: 1 }}>
                        {/* Header */}
                        <div className="properties-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '25px' }}>
                            <div style={{ flex: 1, maxWidth: '700px' }}>
                                <div style={{ 
                                    display: 'inline-block',
                                    background: `linear-gradient(135deg, ${colors.turquoise}, ${colors.lightCyan})`,
                                    padding: '8px 20px',
                                    borderRadius: '25px',
                                    // marginBottom: '20px',
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    color: 'white',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    boxShadow: `0 4px 15px ${colors.turquoise}30`
                                }}>
                                    Properties & Spaces
                                </div>
                                <h2 style={{ 
                                    fontSize: 'clamp(2rem, 4vw, 3rem)', 
                                    fontWeight: 900, 
                                    background: `linear-gradient(135deg, white 0%, ${colors.turquoise} 100%)`,
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    color: 'transparent',
                                    marginBottom: '15px',
                                    lineHeight: 1.1,
                                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                                }}>
                                    Reimagining world-class residences and offices
                                </h2>
                            </div>
                            <div className="properties-controls" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button 
                                        onClick={() => setPropertySlide(prev => Math.max(prev - 1, 0))}
                                        disabled={propertySlide === 0}
                                        style={{ 
                                            width: '36px', 
                                            height: '36px', 
                                            borderRadius: '8px', 
                                            border: `2px solid ${propertySlide === 0 ? '#333' : colors.turquoise}`, 
                                            background: propertySlide === 0 ? '#1A1A1A' : 'rgba(13, 219, 204, 0.1)', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center', 
                                            cursor: propertySlide === 0 ? 'not-allowed' : 'pointer',
                                            fontSize: '14px',
                                            color: propertySlide === 0 ? '#666' : colors.turquoise,
                                            transition: 'all 0.3s ease',
                                            backdropFilter: 'blur(10px)'
                                        }}
                                    >
                                        ‹
                                    </button>
                                    <button 
                                        onClick={() => setPropertySlide(prev => Math.min(prev + 1, maxPropertySlides))}
                                        disabled={propertySlide >= maxPropertySlides}
                                        style={{ 
                                            width: '36px', 
                                            height: '36px', 
                                            borderRadius: '8px', 
                                            border: `2px solid ${propertySlide >= maxPropertySlides ? '#333' : colors.turquoise}`, 
                                            background: propertySlide >= maxPropertySlides ? '#1A1A1A' : 'rgba(13, 219, 204, 0.1)', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center', 
                                            cursor: propertySlide >= maxPropertySlides ? 'not-allowed' : 'pointer',
                                            fontSize: '14px',
                                            color: propertySlide >= maxPropertySlides ? '#666' : colors.turquoise,
                                            transition: 'all 0.3s ease',
                                            backdropFilter: 'blur(10px)'
                                        }}
                                    >
                                        ›
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Subtitle */}
                        <div style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <h3 style={{ 
                                    fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)', 
                                    fontWeight: 700, 
                                    color: colors.turquoise, 
                                    marginBottom: '8px',
                                    lineHeight: 1.3,
                                    textShadow: `0 0 20px ${colors.turquoise}40`
                                }}>
                                    MIFC Spaces & Offices
                                </h3>
                                <p style={{ 
                                    fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', 
                                    color: '#CCCCCC', 
                                    opacity: 0.9, 
                                    lineHeight: 1.4,
                                    marginBottom: '0',
                                    fontWeight: 400
                                }}>
                                    Live where it all happens
                                </p>
                            </div>
                            <button style={{ 
                                background: `linear-gradient(135deg, ${colors.turquoise}, ${colors.lightCyan})`, 
                                color: 'white', 
                                padding: '14px 28px', 
                                border: 'none', 
                                borderRadius: '10px', 
                                fontSize: '14px', 
                                fontWeight: 600, 
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: `0 6px 20px ${colors.turquoise}40`,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                whiteSpace: 'nowrap'
                            }}>
                                View all Properties
                            </button>
                        </div>

                        {/* Properties Carousel */}
                        <div style={{ 
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div 
                                className="properties-cards-container"
                                style={{ 
                                    display: 'flex',
                                    gap: '25px',
                                    transition: 'transform 0.5s ease',
                                    transform: getPropertyTransformValue(),
                                    // paddingBottom: '20px'
                                }}
                            >
                                {propertiesData.map((property, index) => (
                                    <motion.div 
                                        key={index}
                                        className="property-card"
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        style={{ 
                                            // background: 'linear-gradient(145deg, #1A1A1A 0%, #0F0F0F 100%)',
                                            background: 'white', 
                                            // borderRadius: '16px', 
                                            padding: '0', 
                                            height: '320px',
                                            minWidth: '340px',
                                            width: '450px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            cursor: 'pointer',
                                            transition: 'all 0.4s ease',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            flexShrink: 0,
                                            boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${colors.turquoise}20`,
                                            // border: `1px solid rgba(13, 219, 204, 0.1)`
                                        }}
                                    >
                                        {/* Property Image */}
                                        <div style={{ 
                                            width: '100%', 
                                            height: '300px', 
                                            background: property.image ? `url(${property.image}) center/cover` : `linear-gradient(135deg, ${colors.turquoise}20 0%, ${colors.brightBlue}20 100%)`, 
                                            // borderRadius: '16px 16px 0 0',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)'
                                            }} />
                                            {!property.image && (
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    fontSize: '56px',
                                                    opacity: 0.6,
                                                    color: colors.turquoise,
                                                    textShadow: `0 0 20px ${colors.turquoise}40`
                                                }}>
                                                    🏢
                                                </div>
                                            )}
                                        </div>

                                        {/* Property Content */}
                                        <div style={{ 
                                            padding: '20px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: '',
                                            flex: 1,
                                            background: 'linear-gradient(145deg, #1A1A1A 0%, #0F0F0F 100%)'
                                        }}>
                                            {/* Property name badge */}
                                            <div style={{ 
                                                display: 'inline-block',
                                                background: `linear-gradient(135deg, ${colors.turquoise}, ${colors.lightCyan})`,
                                                color: 'white',
                                                padding: '8px 16px',
                                                borderRadius: '25px',
                                                fontSize: '13px',
                                                fontWeight: 700,
                                                alignSelf: 'left',
                                                boxShadow: `0 4px 12px ${colors.turquoise}40`,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px'
                                            }}>
                                                {property.name}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Ecosystem Section */}
                <section style={{ 
                    minHeight: '80vh', 
                    background: 'linear-gradient(135deg, #f8fffe 0%, #e8f9f7 50%, #f0f9ff 100%)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '60px 0', 
                    position: 'relative'
                }}>
                    {/* Background decorative elements */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `radial-gradient(circle at 20% 20%, ${colors.turquoise}08 0%, transparent 50%), 
                                         radial-gradient(circle at 80% 80%, ${colors.brightBlue}08 0%, transparent 50%)`,
                        pointerEvents: 'none'
                    }} />
                    
                    <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 40px', position: 'relative', zIndex: 1 }}>
                        {/* Section Header */}
                        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                            <div style={{ 
                                display: 'inline-block',
                                background: `linear-gradient(135deg, ${colors.turquoise}, ${colors.lightCyan})`,
                                padding: '8px 20px',
                                borderRadius: '25px',
                                fontSize: '12px',
                                fontWeight: 700,
                                color: 'white',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                boxShadow: `0 4px 15px ${colors.turquoise}30`,
                                marginBottom: '24px'
                            }}>
                                Our Ecosystem
                            </div>
                            <h2 style={{ 
                                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', 
                                fontWeight: 900, 
                                background: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.turquoise} 100%)`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                                marginBottom: '20px',
                                lineHeight: 1.1
                            }}>
                                Building the Future Together
                            </h2>
                            <p style={{ 
                                fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', 
                                color: colors.navy, 
                                opacity: 0.8, 
                                lineHeight: 1.4,
                                maxWidth: '700px',
                                margin: '0 auto'
                            }}>
                                Discover our comprehensive ecosystem of innovation, education, and sustainable growth
                            </p>
                        </div>

                        {/* Ecosystem Cards Grid */}
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                            gap: '30px',
                            marginBottom: '40px'
                        }}>
                            {/* MIFC Academy */}
                            <motion.div 
                                whileHover={{ y: -8, scale: 1.02 }}
                                style={{ 
                                    background: 'white', 
                                    borderRadius: '20px', 
                                    padding: '40px', 
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.08)', 
                                    border: `2px solid ${colors.turquoise}15`, 
                                    height: '400px', 
                                    position: 'relative', 
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transition: 'all 0.4s ease'
                                }}
                            >
                                {/* Decorative gradient */}
                                <div style={{ 
                                    position: 'absolute', 
                                    top: 0, 
                                    right: 0, 
                                    width: '80px', 
                                    height: '80px', 
                                    background: `linear-gradient(135deg, ${colors.turquoise}20, ${colors.lightCyan}20)`, 
                                    borderRadius: '0 20px 0 80px' 
                                }} />
                                
                                {/* Icon */}
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    background: `linear-gradient(135deg, ${colors.turquoise}, ${colors.lightCyan})`,
                                    borderRadius: '18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '32px',
                                    marginBottom: '24px',
                                    boxShadow: `0 8px 25px ${colors.turquoise}40`
                                }}>
                                    🎓
                                </div>
                                
                                <h3 style={{ 
                                    fontSize: '26px', 
                                    fontWeight: 800, 
                                    color: colors.navy, 
                                    marginBottom: '16px',
                                    lineHeight: 1.2
                                }}>
                                    MIFC Academy
                                </h3>
                                <p style={{ 
                                    fontSize: '16px', 
                                    color: colors.navy, 
                                    opacity: 0.8, 
                                    lineHeight: 1.6, 
                                    marginBottom: '24px',
                                    flex: 1
                                }}>
                                    World-class education and professional development programs designed to build expertise in finance and innovation.
                                </p>
                                
                                <motion.div 
                                    whileHover={{ x: 8 }} 
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '12px', 
                                        color: colors.turquoise, 
                                        fontWeight: 600, 
                                        fontSize: '16px', 
                                        cursor: 'pointer',
                                        marginTop: 'auto'
                                    }}
                                >
                                    Learn More
                                    <div style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        background: colors.turquoise, 
                                        borderRadius: '50%', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        color: 'white', 
                                        fontSize: '18px' 
                                    }}>
                                        →
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* Family Wealth */}
                            <motion.div 
                                whileHover={{ y: -8, scale: 1.02 }}
                                style={{ 
                                    background: 'white', 
                                    borderRadius: '20px', 
                                    padding: '40px', 
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.08)', 
                                    border: `2px solid ${colors.deepBlue}15`, 
                                    height: '400px', 
                                    position: 'relative', 
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transition: 'all 0.4s ease'
                                }}
                            >
                                {/* Decorative gradient */}
                                <div style={{ 
                                    position: 'absolute', 
                                    top: 0, 
                                    right: 0, 
                                    width: '80px', 
                                    height: '80px', 
                                    background: `linear-gradient(135deg, ${colors.deepBlue}20, ${colors.brightBlue}20)`, 
                                    borderRadius: '0 20px 0 80px' 
                                }} />
                                
                                {/* Icon */}
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    background: `linear-gradient(135deg, ${colors.deepBlue}, ${colors.brightBlue})`,
                                    borderRadius: '18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '32px',
                                    marginBottom: '24px',
                                    boxShadow: `0 8px 25px ${colors.deepBlue}40`
                                }}>
                                    👨‍👩‍👧‍👦
                                </div>
                                
                                <h3 style={{ 
                                    fontSize: '26px', 
                                    fontWeight: 800, 
                                    color: colors.navy, 
                                    marginBottom: '16px',
                                    lineHeight: 1.2
                                }}>
                                    Family Wealth
                                </h3>
                                <p style={{ 
                                    fontSize: '16px', 
                                    color: colors.navy, 
                                    opacity: 0.8, 
                                    lineHeight: 1.6, 
                                    marginBottom: '24px',
                                    flex: 1
                                }}>
                                    Comprehensive wealth management solutions and legacy planning services for families and high-net-worth individuals.
                                </p>
                                
                                <motion.div 
                                    whileHover={{ x: 8 }} 
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '12px', 
                                        color: colors.deepBlue, 
                                        fontWeight: 600, 
                                        fontSize: '16px', 
                                        cursor: 'pointer',
                                        marginTop: 'auto'
                                    }}
                                >
                                    Learn More
                                    <div style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        background: colors.deepBlue, 
                                        borderRadius: '50%', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        color: 'white', 
                                        fontSize: '18px' 
                                    }}>
                                        →
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* Disruption Centre */}
                            <motion.div 
                                whileHover={{ y: -8, scale: 1.02 }}
                                style={{ 
                                    background: 'white', 
                                    borderRadius: '20px', 
                                    padding: '40px', 
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.08)', 
                                    border: `2px solid ${colors.brightBlue}15`, 
                                    height: '400px', 
                                    position: 'relative', 
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transition: 'all 0.4s ease'
                                }}
                            >
                                {/* Decorative gradient */}
                                <div style={{ 
                                    position: 'absolute', 
                                    top: 0, 
                                    right: 0, 
                                    width: '80px', 
                                    height: '80px', 
                                    background: `linear-gradient(135deg, ${colors.brightBlue}20, ${colors.turquoise}20)`, 
                                    borderRadius: '0 20px 0 80px' 
                                }} />
                                
                                {/* Icon */}
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    background: `linear-gradient(135deg, ${colors.brightBlue}, ${colors.turquoise})`,
                                    borderRadius: '18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '32px',
                                    marginBottom: '24px',
                                    boxShadow: `0 8px 25px ${colors.brightBlue}40`
                                }}>
                                    🚀
                                </div>
                                
                                <h3 style={{ 
                                    fontSize: '26px', 
                                    fontWeight: 800, 
                                    color: colors.navy, 
                                    marginBottom: '16px',
                                    lineHeight: 1.2
                                }}>
                                    Disruption Centre
                                </h3>
                                <p style={{ 
                                    fontSize: '16px', 
                                    color: colors.navy, 
                                    opacity: 0.8, 
                                    lineHeight: 1.6, 
                                    marginBottom: '24px',
                                    flex: 1
                                }}>
                                    Innovation hub fostering fintech breakthroughs and technological advancement in financial services.
                                </p>
                                
                                <motion.div 
                                    whileHover={{ x: 8 }} 
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '12px', 
                                        color: colors.brightBlue, 
                                        fontWeight: 600, 
                                        fontSize: '16px', 
                                        cursor: 'pointer',
                                        marginTop: 'auto'
                                    }}
                                >
                                    Learn More
                                    <div style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        background: colors.brightBlue, 
                                        borderRadius: '50%', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        color: 'white', 
                                        fontSize: '18px' 
                                    }}>
                                        →
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* Sustainability */}
                            <motion.div 
                                whileHover={{ y: -8, scale: 1.02 }}
                                style={{ 
                                    background: 'white', 
                                    borderRadius: '20px', 
                                    padding: '40px', 
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.08)', 
                                    border: `2px solid ${colors.turquoise}15`, 
                                    height: '400px', 
                                    position: 'relative', 
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transition: 'all 0.4s ease'
                                }}
                            >
                                {/* Decorative gradient */}
                                <div style={{ 
                                    position: 'absolute', 
                                    top: 0, 
                                    right: 0, 
                                    width: '80px', 
                                    height: '80px', 
                                    background: `linear-gradient(135deg, ${colors.turquoise}20, ${colors.lightCyan}20)`, 
                                    borderRadius: '0 20px 0 80px' 
                                }} />
                                
                                {/* Icon */}
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    background: `linear-gradient(135deg, #22c55e, ${colors.turquoise})`,
                                    borderRadius: '18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '32px',
                                    marginBottom: '24px',
                                    boxShadow: `0 8px 25px rgba(34, 197, 94, 0.4)`
                                }}>
                                    🌱
                                </div>
                                
                                <h3 style={{ 
                                    fontSize: '26px', 
                                    fontWeight: 800, 
                                    color: colors.navy, 
                                    marginBottom: '16px',
                                    lineHeight: 1.2
                                }}>
                                    Sustainability
                                </h3>
                                <p style={{ 
                                    fontSize: '16px', 
                                    color: colors.navy, 
                                    opacity: 0.8, 
                                    lineHeight: 1.6, 
                                    marginBottom: '24px',
                                    flex: 1
                                }}>
                                    Leading environmental and social responsibility initiatives for a sustainable financial future.
                                </p>
                                
                                <motion.div 
                                    whileHover={{ x: 8 }} 
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '12px', 
                                        color: '#22c55e', 
                                        fontWeight: 600, 
                                        fontSize: '16px', 
                                        cursor: 'pointer',
                                        marginTop: 'auto'
                                    }}
                                >
                                    Learn More
                                    <div style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        background: '#22c55e', 
                                        borderRadius: '50%', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        color: 'white', 
                                        fontSize: '18px' 
                                    }}>
                                        →
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Bottom CTA */}
                        <div style={{ textAlign: 'center', marginTop: '50px' }}>
                            <motion.button 
                                whileHover={{ 
                                    scale: 1.05, 
                                    y: -2,
                                    boxShadow: `0 8px 30px ${colors.turquoise}50`
                                }}
                                whileTap={{ scale: 0.98 }}
                                style={{ 
                                    background: `linear-gradient(135deg, ${colors.turquoise}, ${colors.lightCyan})`, 
                                    color: 'white', 
                                    padding: '16px 32px', 
                                    border: 'none', 
                                    borderRadius: '12px', 
                                    fontSize: '16px', 
                                    fontWeight: 600, 
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: `0 6px 20px ${colors.turquoise}40`,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}
                            >
                                Explore Our Ecosystem
                            </motion.button>
                        </div>
                    </div>
                </section>

              

                <section style={{ minHeight: 'auto', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
                    <div style={{ width: '100%', maxWidth: '1200px' }}>
                        
                        {/* Main Footer Content */}
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                            gap: '40px', 
                            marginBottom: '40px'
                        }}>
                            
                            {/* Company Section with MIFC Logo */}
                            <div>
                                <div style={{ marginBottom: '20px' }}>
                                    <img src={LOGO} alt="MIFC Logo" style={{ 
                                        width: '120px', 
                                        height: 'auto', 
                                        objectFit: 'contain',
                                        marginBottom: '16px'
                                    }} />
                                </div>
                                <p style={{ 
                                    fontSize: '14px', 
                                    color: colors.navy, 
                                    opacity: 0.8, 
                                    lineHeight: 1.6, 
                                    margin: '0',
                                    maxWidth: '280px'
                                }}>
                                    Maldives International Financial Centre - Building the future of finance in the heart of the Indian Ocean.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 style={{ fontSize: '16px', fontWeight: 600, color: colors.navy, marginBottom: '20px' }}>
                                    Quick Links
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {[
                                        'About Us',
                                        'Services',
                                        'Business Registration',
                                        'Legal Framework',
                                        'Contact Us'
                                    ].map((link, index) => (
                                        <a 
                                            key={index}
                                            href="#" 
                                            style={{ 
                                                fontSize: '14px', 
                                                color: colors.navy, 
                                                opacity: 0.8, 
                                                textDecoration: 'none', 
                                                transition: 'opacity 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => e.target.style.opacity = '1'}
                                            onMouseLeave={(e) => e.target.style.opacity = '0.8'}
                                        >
                                            {link}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div>
                                <h4 style={{ fontSize: '16px', fontWeight: 600, color: colors.navy, marginBottom: '20px' }}>
                                    Contact Info
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div style={{ fontSize: '14px', color: colors.navy, opacity: 0.8 }}>
                                        📍 Male', Republic of Maldives
                                    </div>
                                    <div style={{ fontSize: '14px', color: colors.navy, opacity: 0.8 }}>
                                        📧 info@mifc.mv
                                    </div>
                                    <div style={{ fontSize: '14px', color: colors.navy, opacity: 0.8 }}>
                                        📞 +960 330 5500
                                    </div>
                                </div>
                            </div>

                            {/* Follow Us */}
                            <div>
                                <h4 style={{ fontSize: '16px', fontWeight: 600, color: colors.navy, marginBottom: '20px' }}>
                                    Follow Us
                                </h4>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <motion.a href="#" whileHover={{ scale: 1.1, y: -2 }} style={{ 
                                        width: '36px', 
                                        height: '36px', 
                                        background: '#0A66C2', 
                                        borderRadius: '8px', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        color: 'white', 
                                        textDecoration: 'none', 
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        in
                                    </motion.a>
                                    <motion.a href="#" whileHover={{ scale: 1.1, y: -2 }} style={{ 
                                        width: '36px', 
                                        height: '36px', 
                                        background: '#1877F2', 
                                        borderRadius: '8px', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        color: 'white', 
                                        textDecoration: 'none', 
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        f
                                    </motion.a>
                               
                                    <motion.a href="#" whileHover={{ scale: 1.1, y: -2 }} style={{ 
                                        width: '36px', 
                                        height: '36px', 
                                        background: '#000000', 
                                        borderRadius: '8px', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        color: 'white', 
                                        textDecoration: 'none', 
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        𝕏
                                    </motion.a>
                                    <motion.a href="#" whileHover={{ scale: 1.1, y: -2 }} style={{ 
                                        width: '36px', 
                                        height: '36px', 
                                        background: '#FF0000', 
                                        borderRadius: '8px', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        color: 'white', 
                                        textDecoration: 'none', 
                                        fontSize: '14px',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        ▶
                                    </motion.a>
                               
                                </div>
                            </div>
                        </div>

                        {/* Footer Bottom */}
                        <div style={{ 
                            borderTop: `1px solid ${colors.navy}20`, 
                            paddingTop: '20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '20px'
                        }}>
                            <p style={{ 
                                fontSize: '14px', 
                                color: colors.navy, 
                                opacity: 0.8, 
                                margin: '0'
                            }}>
                                © 2025 Maldives International Financial Centre. All rights reserved.
                            </p>
                            
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <a href="#" style={{ fontSize: '14px', color: colors.navy, opacity: 0.8, textDecoration: 'none' }}>Privacy Policy</a>
                                <a href="#" style={{ fontSize: '14px', color: colors.navy, opacity: 0.8, textDecoration: 'none' }}>Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            {/* Top Progress Bar */}
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: colors.turquoise, transformOrigin: 'left', transform: `scaleX(${scrollProgress / 100})`, zIndex: 1001, transition: 'transform 0.1s ease' }} />

            {/* Fixed Bottom Buttons */}
            <div 
                style={{ 
                    position: 'fixed', 
                    bottom: '20px', 
                    left: '0',
                    right: '0',
                    zIndex: 1002, 
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '16px',
                    pointerEvents: 'none'
                }}
            >
                <motion.button 
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    whileHover={{ 
                        scale: 1.02, 
                        y: -2,
                        background: colors.lightCyan,
                        boxShadow: '0 4px 15px rgba(13, 219, 204, 0.4)',
                        transition: { duration: 0.2, ease: 'easeOut' }
                    }}
                    whileTap={{ scale: 0.98, y: 0 }}
                    style={{ 
                        padding: '12px 28px', 
                        background: colors.turquoise, 
                        color: '#003A76', 
                        border: 'none', 
                        borderRadius: '6px', 
                        fontSize: '20px', 
                        fontWeight: 400, 
                        cursor: 'pointer', 
                        transition: 'all 0.2s ease', 
                        boxShadow: '0 2px 8px rgba(13, 219, 204, 0.25)',
                        minWidth: '140px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'auto',
                        fontFamily: '"Reckless Neue", serif',
                        position: 'relative',
                        overflow: 'hidden'
                        
                    }}
                >
                    Apply Online
                </motion.button>
                <motion.button 
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.6 }}
                    whileHover={{ 
                        scale: 1.02, 
                        y: -2,
                        background: colors.navy,
                        color: colors.turquoise,
                        border: `2px solid ${colors.turquoise}`,
                        boxShadow: '0 4px 15px rgba(0, 58, 118, 0.3)',
                        transition: { duration: 0.2, ease: 'easeOut' }
                    }}
                    whileTap={{ scale: 0.98, y: 0 }}
                    style={{ 
                        padding: '12px 28px', 
                        background: colors.turquoise, 
                        color: '#003A76', 
                        border: 'none', 
                        borderRadius: '6px', 
                        fontSize: '20px', 
                        fontWeight: 400, 
                        cursor: 'pointer', 
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 8px rgba(13, 219, 204, 0.25)',
                        minWidth: '140px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'auto',
                        fontFamily: '"Reckless Neue", serif',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    Request callback
                </motion.button>
            </div>

            {/* Sticky Chatbot Icon */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 2, type: "spring", stiffness: 100 }}
                whileHover={{ 
                    scale: 1.1, 
                    y: -3,
                    boxShadow: `0 8px 30px ${colors.turquoise}50`
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '80px', // Position it to the left of the scroll indicator
                    width: '60px',
                    height: '60px',
                    background: `linear-gradient(135deg, ${colors.turquoise}, ${colors.lightCyan})`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 1002,
                    boxShadow: `0 4px 20px ${colors.turquoise}40`,
                    border: '3px solid white',
                    transition: 'all 0.3s ease'
                }}
                onClick={() => {
                    // Add chatbot functionality here
                    console.log('Chatbot clicked!');
                }}
            >
                <img 
                    src={LOGO} 
                    alt="MIFC Chat" 
                    style={{
                        width: '35px',
                        height: '35px',
                        objectFit: 'contain',
                        filter: 'brightness(0) invert(1)' // Makes the logo white
                    }}
                />
                
                {/* Chat bubble indicator */}
                <motion.div
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        position: 'absolute',
                        top: '-2px',
                        right: '-2px',
                        width: '18px',
                        height: '18px',
                        background: '#ff4444',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        color: 'white',
                        border: '2px solid white'
                    }}
                >
                    💬
                </motion.div>
            </motion.div>

            <div style={{ position: 'fixed', bottom: 20, right: 20, height: '60px', width: '4px', background: `${colors.turquoise}20`, borderRadius: '2px', zIndex: 1001 }}>
                <div style={{ height: `${scrollProgress}%`, background: colors.turquoise, borderRadius: '2px', transition: 'height 0.1s ease' }} />
            </div>

        </div>
    );
};

export default MIFCVertical;
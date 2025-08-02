import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import HeroImage from "../../assets/HeroImages/hero1.png";
import { ImagePlaceholder, BusinessCard, AnimatedCard, AboutSection, BusinessCardGrid } from '../Common/CommonComponents';
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
    
    // Hero carousel state
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [heroImages, setHeroImages] = useState([hero1, hero2, hero3, hero4]);
    const [isLoading, setIsLoading] = useState(false);

    // Hero carousel effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                (prevIndex + 1) % heroImages.length
            );
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [heroImages.length]);

    // Function to fetch images from API (ready for integration)
    const fetchHeroImages = async () => {
        setIsLoading(true);
        try {
            // Replace this with your actual API call
            // const response = await fetch('your-api-endpoint');
            // const data = await response.json();
            // setHeroImages(data.images || [hero1, hero2, hero3, hero4]);
            
            // For now, using local images
            setHeroImages([hero1, hero2, hero3, hero4]);
        } catch (error) {
            console.error('Error fetching hero images:', error);
            // Fallback to local images
            setHeroImages([hero1, hero2, hero3, hero4]);
        } finally {
            setIsLoading(false);
        }
    };

    // Uncomment this to fetch images on component mount
    // useEffect(() => {
    //     fetchHeroImages();
    // }, []);

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

    const HeroCarousel = ({ images, currentIndex }) => {
        const goToPrevious = () => {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === 0 ? images.length - 1 : prevIndex - 1
            );
        };

        const goToNext = () => {
            setCurrentImageIndex((prevIndex) => 
                (prevIndex + 1) % images.length
            );
        };

        return (
            <div style={{ 
                position: 'relative', 
                width: '100%', 
                height: '100%', 
                overflow: 'hidden',
                background: '#000',
               
            }}>
                {/* Smooth cross-fade with simultaneous image loading */}
                <AnimatePresence>
                    {heroImages.map((image, index) => {
                        const isActive = index === currentIndex;
                        const isPrevious = index === (currentIndex === 0 ? heroImages.length - 1 : currentIndex - 1);
                        
                        if (!isActive && !isPrevious) return null;
                        
                        return (
                            <motion.div
                                key={`image-${index}`}
                                initial={{ opacity: isActive ? 0 : 1 }}
                                animate={{ opacity: isActive ? 1 : 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ 
                                    duration: 1.8,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    width: '100%',
                                    height: '100%',
                                    zIndex: isActive ? 2 : 1
                                }}
                            >
                                <img
                                    src={image}
                                    alt={`Hero ${index + 1}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        display: 'block',
                                        userSelect: 'none',
                                        pointerEvents: 'none',
                                        transform: 'translate3d(0, 0, 0)',
                                        backfaceVisibility: 'hidden'
                                    }}
                                    draggable={false}
                                />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
                
                {/* Left Navigation Arrow */}
                <motion.button
                    onClick={goToPrevious}
                    whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: colors.turquoise,
                        transition: { duration: 0.15, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        position: 'absolute',
                        left: '40px',
                        top: '50%',
                        transform: 'translateY(-50%) translateZ(0)',
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(12px)',
                        border: `1px solid rgba(255, 255, 255, 0.2)`,
                        color: 'white',
                        fontSize: '22px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 3,
                        transition: 'all 0.15s ease-out',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                        backfaceVisibility: 'hidden'
                    }}
                >
                    ‹
                </motion.button>

                {/* Right Navigation Arrow */}
                <motion.button
                    onClick={goToNext}
                    whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: colors.turquoise,
                        transition: { duration: 0.15, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        position: 'absolute',
                        right: '40px',
                        top: '50%',
                        transform: 'translateY(-50%) translateZ(0)',
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(12px)',
                        border: `1px solid rgba(255, 255, 255, 0.2)`,
                        color: 'white',
                        fontSize: '22px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 3,
                        transition: 'all 0.15s ease-out',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                        backfaceVisibility: 'hidden'
                    }}
                >
                    ›
                </motion.button>
                
                {/* Carousel indicators - Slash Style */}
                <div 
                    style={{ 
                        position: 'absolute', 
                        bottom: '200px', 
                        left: '50%', 
                        transform: 'translateX(-50%) translateZ(0)', 
                        display: 'flex', 
                        gap: '20px',
                        zIndex: 3,
                        padding: '20px 28px',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '16px',
                        border: `3px solid ${colors.turquoise}`,
                        boxShadow: `0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px ${colors.turquoise}40`
                    }}
                >
                    {images.map((_, index) => (
                        <motion.div
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            animate={{
                                scale: index === currentIndex ? 1.4 : 1,
                                opacity: index === currentIndex ? 1 : 0.7,
                            }}
                            transition={{ 
                                duration: 0.3, 
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            style={{
                                width: '24px',
                                height: '3px',
                                background: index === currentIndex ? colors.turquoise : colors.navy,
                                cursor: 'pointer',
                                borderRadius: '1px',
                                transform: 'rotate(60deg)',
                                transformOrigin: 'center',
                                position: 'relative',
                                boxShadow: index === currentIndex ? 
                                    `0 0 12px ${colors.turquoise}, 0 2px 4px rgba(0,0,0,0.3)` : 
                                    '0 1px 3px rgba(0,0,0,0.2)',
                                border: index === currentIndex ? `1px solid white` : 'none'
                            }}
                            whileHover={{ 
                                scale: index === currentIndex ? 1.6 : 1.2,
                                opacity: 1,
                                background: colors.turquoise,
                                boxShadow: `0 0 20px ${colors.turquoise}, 0 4px 8px rgba(0,0,0,0.4)`,
                                transition: { duration: 0.15 }
                            }}
                            whileTap={{ scale: 0.9 }}
                        />
                    ))}
                </div>

                {/* Slash Navigation Controls - Bottom Right */}
                <div 
                    style={{ 
                        position: 'absolute', 
                        bottom: '120px', 
                        right: '20px', 
                        display: 'flex', 
                        flexDirection: 'column',
                        gap: '16px',
                        zIndex: 1010,
                        padding: '24px',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '16px',
                        border: `3px solid ${colors.turquoise}`,
                        boxShadow: `0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px ${colors.turquoise}40`
                    }}
                >
                    <div style={{
                        fontSize: '12px',
                        color: colors.navy,
                        fontWeight: 600,
                        textAlign: 'center',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        Navigate
                    </div>
                    {images.map((_, index) => (
                        <motion.div
                            key={`slash-${index}`}
                            onClick={() => setCurrentImageIndex(index)}
                            animate={{
                                scale: index === currentIndex ? 1.6 : 1,
                                opacity: index === currentIndex ? 1 : 0.8,
                            }}
                            transition={{ 
                                duration: 0.3, 
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            style={{
                                width: '40px',
                                height: '6px',
                                background: index === currentIndex ? colors.turquoise : colors.navy,
                                cursor: 'pointer',
                                borderRadius: '3px',
                                transform: 'rotate(45deg)',
                                transformOrigin: 'center',
                                position: 'relative',
                                boxShadow: index === currentIndex ? 
                                    `0 0 20px ${colors.turquoise}, 0 4px 8px rgba(0,0,0,0.3)` : 
                                    '0 2px 6px rgba(0,0,0,0.2)',
                                border: index === currentIndex ? `2px solid white` : 'none'
                            }}
                            whileHover={{ 
                                scale: index === currentIndex ? 1.7 : 1.3,
                                opacity: 1,
                                background: colors.turquoise,
                                boxShadow: `0 0 24px ${colors.turquoise}, 0 6px 12px rgba(0,0,0,0.4)`,
                                transition: { duration: 0.15 }
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {/* Active indicator */}
                            {index === currentIndex && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '8px',
                                        height: '8px',
                                        background: 'white',
                                        borderRadius: '50%',
                                        boxShadow: '0 0 8px rgba(255,255,255,0.8)'
                                    }}
                                />
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Loading overlay */}
                {isLoading && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 4
                    }}>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            style={{
                                width: '40px',
                                height: '40px',
                                border: `3px solid ${colors.turquoise}`,
                                borderTop: '3px solid transparent',
                                borderRadius: '50%'
                            }}
                        />
                    </div>
                )}
            </div>
        );
    };

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
@media (max-width: 768px) {
.vertical-container { 
    padding: 0 20px !important; 
}
.vertical-container > section { 
    min-height: 100vh !important; 
    padding: 40px 20px !important; 
}
}
.dropdown-menu {
position: absolute;
top: 100%;
left: -300px;
background: white;
border-radius: 20px;
padding: 40px;
box-shadow: 0 20px 60px rgba(0,0,0,0.15);
border: 1px solid ${colors.turquoise}20;
width: 1000px;
z-index: 1003;
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 50px;
}
.dropdown-column {
display: flex;
flex-direction: column;
}
.dropdown-header {
display: flex;
align-items: center;
gap: 12px;
padding: 16px 0;
border-bottom: 3px solid ${colors.turquoise};
margin-bottom: 24px;
}
.dropdown-header h3 {
font-size: 20px;
font-weight: 700;
color: ${colors.navy};
margin: 0;
}
.dropdown-header-arrow {
color: ${colors.turquoise};
font-size: 24px;
font-weight: bold;
}
.dropdown-item {
padding: 14px 16px;
color: ${colors.navy};
font-size: 15px;
font-weight: 500;
cursor: pointer;
transition: all 0.3s ease;
display: flex;
align-items: center;
gap: 12px;
border-radius: 10px;
margin-bottom: 6px;
}
.dropdown-item:hover {
background: ${colors.turquoise}10;
color: ${colors.turquoise};
transform: translateX(8px);
}
.dropdown-item-icon {
width: 10px;
height: 10px;
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
margin-top: 30px;
padding-top: 30px;
border-top: 2px solid ${colors.turquoise}20;
}
.frequently-accessed h4 {
display: flex;
align-items: center;
gap: 12px;
font-size: 18px;
font-weight: 700;
color: ${colors.turquoise};
margin-bottom: 20px;
}
.frequently-accessed-items {
display: flex;
gap: 16px;
flex-wrap: wrap;
}
.frequently-accessed-item {
padding: 12px 20px;
background: ${colors.turquoise}10;
color: ${colors.turquoise};
border-radius: 25px;
font-size: 14px;
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
                    <img src={LOGO} alt="MIFC Logo" style={{ height: '100px', width: 'auto', objectFit: 'contain' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                        {[
                            {
                                name: 'Business',
                                dropdown: {
                                    'Establish a Business': ['Financial', 'Non-Financial', 'AI, FinTech and Innovation', 'Retail and Leisure'],
                                    'Services': ['Data Centres', 'Spaces & Offices', 'Event Hosting', 'Visas', 'Documents Hub'],
                                    'Laws and Regulations': ['Public Register', 'Registrars & Commissioners List', 'of Registered Auditors', 'List of Insolvency Practitioners']
                                }
                            },
                            { name: 'Experience', dropdown: null },
                            { name: 'Developments', dropdown: null },
                            { name: 'Ecosystem', dropdown: null },
                            { name: 'What\'s On', dropdown: null },
                            { name: 'Innovation Hub', dropdown: null }
                        ].map((item) => (
                            <div key={item.name} style={{ position: 'relative' }}
                                onMouseEnter={() => setActiveDropdown(item.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <a href="#" style={{ fontSize: '20px', fontWeight: 600, color: 'white', textDecoration: 'none', transition: 'color 0.3s ease', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    {item.name}
                                    {item.dropdown && <span style={{ fontSize: '10px', color: colors.turquoise }}>▼</span>}
                                </a>
                                {item.dropdown && activeDropdown === item.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                        transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                                        className="dropdown-menu"
                                    >
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
                                    </motion.div>
                                )}
                            </div>
                        ))}
                       
                    </div>
                </div>
            </motion.nav>

            <div ref={containerRef} className="vertical-container" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden', scrollBehavior: 'smooth' }}>

                <section style={{ minHeight: '100vh', position: 'relative', background: colors.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                        <HeroCarousel images={heroImages} currentIndex={currentImageIndex} />
                    </div>
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.3 }} style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '900px', padding: '0 40px', color: 'white' }}>
                        <h1 style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 800, marginBottom: '24px', lineHeight: 1.1, color: 'white', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>Maldives International Financial Centre</h1>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }} style={{ fontSize: 'clamp(1.2rem,3vw,2rem)', fontWeight: 300, marginBottom: '40px', color: colors.lightCyan, opacity: 0.95 }}>Rethinking finance. Redefining lifestyle.</motion.p>
                    </motion.div>
                </section>

                {/* About Section */}
                <section style={{ minHeight: '100vh', background: 'white', display: 'flex', alignItems: 'center', padding: '0' }}>
                    <div style={{ width: '100%', display: 'flex' }}>
                        <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                            
                            {/* Left Side - Content */}
                            <motion.div 
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                style={{ padding: '0 40px', flex: '1', maxWidth: '600px' }}
                            >

                                <div style={{ marginBottom: '24px' }}>
                                    <span style={{ 
                                        fontSize: '16px', 
                                        fontWeight: 600, 
                                        color: colors.turquoise, 
                                        textTransform: 'uppercase', 
                                        letterSpacing: '2px' 
                                    }}>
                                        About MIFC
                                    </span>
                                </div>
                                
                                <h2 style={{ 
                                    fontSize: 'clamp(2rem, 4vw, 3.5rem)', 
                                    fontWeight: 800, 
                                    color: colors.navy, 
                                    marginBottom: '32px', 
                                    lineHeight: 1.2 
                                }}>
                                    World's premier International Financial Centre in the capital
                                </h2>
                                
                                <div style={{ 
                                    padding: '24px', 
                                    background: `linear-gradient(135deg, ${colors.turquoise}10, ${colors.lightCyan}10)`, 
                                    borderRadius: '16px', 
                                    borderLeft: `6px solid ${colors.turquoise}`, 
                                    marginBottom: '32px' 
                                }}>
                                    <p style={{ 
                                        fontSize: '18px', 
                                        color: colors.navy, 
                                        lineHeight: 1.7, 
                                        margin: 0, 
                                        fontStyle: 'italic' 
                                    }}>
                                        The Maldives International Financial Centre (MIFC) is a wholly sustainable, 
                                        blockchain-powered financial freezone located in the Maldives and governed by 
                                        the Maldives International Financial Services Authority (MIFSA). MIFSA is the 
                                        centralized government agency committed to maintaining the highest 
                                        international standards and best practices.
                                    </p>
                                </div>
                            </motion.div>
                            
                            {/* Right Side - Image and Features */}
                            <motion.div 
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                style={{ position: 'relative', flex: '0.7', padding: '0 20px', maxWidth: '500px' }}
                            >
                                <div style={{ position: 'relative' }}>
                                    <ImagePlaceholder height={300} />
                                    
                                    {/* Floating Quote Card */}
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.8 }}
                                        viewport={{ once: true }}
                                        style={{ 
                                            position: 'absolute', 
                                            bottom: '-40px', 
                                            right: '-20px', 
                                            background: colors.turquoise, 
                                            color: 'white', 
                                            padding: '20px', 
                                            borderRadius: '16px', 
                                            width: '280px', 
                                            boxShadow: '0 15px 40px rgba(13,219,204,0.3)' 
                                        }}
                                    >
                                        <div style={{ 
                                            fontSize: '48px', 
                                            color: 'rgba(255,255,255,0.3)', 
                                            lineHeight: 1, 
                                            marginBottom: '12px' 
                                        }}>
                                            "
                                        </div>
                                        <p style={{ 
                                            fontSize: '16px', 
                                            fontWeight: 600, 
                                            lineHeight: 1.5, 
                                            margin: 0, 
                                            color: 'white' 
                                        }}>
                                            Engagement and brand storytelling are at the heart of our approach.
                                        </p>
                                    </motion.div>
                                </div>
                            </motion.div>
                            
                        </div>
                    </div>
                </section>

                <section style={{ minHeight: '100vh', background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px' }}>
                    <BusinessCardGrid
                        title="MIFC Business Categories"
                        backgroundColor="#f0f2f5"
                        titleColor="turquoise"
                        columns={4}
                        padding="80px"
                        minHeight="100vh"
                        cards={[
                            {
                                icon: "💼",
                                title: "Business in MIFC",
                                description: "The leading financial hub in the region.",
                                buttonColor: "turquoise",
                                buttonText: "Get started"
                            },
                            {
                                icon: "📊",
                                title: "Legal Database",
                                description: "A world-class judicial system based on English common law.",
                                buttonColor: "deepBlue",
                                buttonText: "Get started"
                            },
                            {
                                icon: "🏖️",
                                title: "Experience MIFC",
                                description: "An unparalleled destination for residents and visitors.",
                                buttonColor: "turquoise",
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
                </section>

                <section style={{ minHeight: '100vh', background: 'white', display: 'flex', alignItems: 'center', padding: '80px' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '40px' }}>

                            <AnimatedCard>
                                <div style={{ background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 15px 50px rgba(0,0,0,0.12)', border: `1px solid ${colors.turquoise}20`, height: '500px', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', top: 0, right: 0, width: '60px', height: '60px', background: colors.turquoise + '20', borderRadius: '0 24px 0 60px' }} />
                                    <ImagePlaceholder height={240} />
                                    <h3 style={{ fontSize: '24px', fontWeight: 700, color: colors.navy, marginBottom: '16px', marginTop: '24px' }}>Business in MIFC</h3>
                                    <p style={{ fontSize: '16px', color: colors.navy, opacity: 0.8, lineHeight: 1.6, marginBottom: '20px' }}>The leading financial hub in the region providing world-class infrastructure...</p>
                                    <motion.div whileHover={{ x: 8 }} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: colors.turquoise, fontWeight: 600, fontSize: '16px', cursor: 'pointer' }}>
                                        Explore More
                                        <div style={{ width: '40px', height: '40px', background: colors.turquoise, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '18px' }}>→</div>
                                    </motion.div>
                                </div>
                            </AnimatedCard>

                            <AnimatedCard>
                                <div style={{ background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 15px 50px rgba(0,0,0,0.12)', border: `1px solid ${colors.deepBlue}20`, height: '500px', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', top: 0, right: 0, width: '60px', height: '60px', background: colors.deepBlue + '20', borderRadius: '0 24px 0 60px' }} />
                                    <ImagePlaceholder height={240} />
                                    <h3 style={{ fontSize: '24px', fontWeight: 700, color: colors.navy, marginBottom: '16px', marginTop: '24px' }}>Legal Database</h3>
                                    <p style={{ fontSize: '16px', color: colors.navy, opacity: 0.8, lineHeight: 1.6, marginBottom: '20px' }}>A world-class legal judicial system based on English common law with modern innovations...</p>
                                    <motion.div whileHover={{ x: 8 }} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: colors.deepBlue, fontWeight: 600, fontSize: '16px', cursor: 'pointer' }}>
                                        Explore More
                                        <div style={{ width: '40px', height: '40px', background: colors.deepBlue, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '18px' }}>→</div>
                                    </motion.div>
                                </div>
                            </AnimatedCard>

                            <AnimatedCard>
                                <div style={{ background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 15px 50px rgba(0,0,0,0.12)', border: `1px solid ${colors.brightBlue}20`, height: '500px', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', top: 0, right: 0, width: '60px', height: '60px', background: colors.brightBlue + '20', borderRadius: '0 24px 0 60px' }} />
                                    <ImagePlaceholder height={240} />
                                    <h3 style={{ fontSize: '24px', fontWeight: 700, color: colors.navy, marginBottom: '16px', marginTop: '24px' }}>Experience MIFC</h3>
                                    <p style={{ fontSize: '16px', color: colors.navy, opacity: 0.8, lineHeight: 1.6, marginBottom: '20px' }}>An unparalleled destination for residents and visitors with luxury amenities...</p>
                                    <motion.div whileHover={{ x: 8 }} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: colors.brightBlue, fontWeight: 600, fontSize: '16px', cursor: 'pointer' }}>
                                        Explore More
                                        <div style={{ width: '40px', height: '40px', background: colors.brightBlue, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '18px' }}>→</div>
                                    </motion.div>
                                </div>
                            </AnimatedCard>

                        </div>
                    </div>
                </section>

                <section style={{ minHeight: '100vh', background: colors.futureBg, display: 'flex', alignItems: 'center', padding: '80px', position: 'relative' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                        <h2 style={{ fontSize: '40px', fontWeight: 800, textAlign: 'center', marginBottom: '60px', color: 'white' }}>MIFC is leading the future of finance</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '40px' }}>

                            <AnimatedCard>
                                <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: `1px solid ${colors.turquoise}30`, borderRadius: '24px', padding: '40px', height: '500px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', top: 0, right: 0, width: '60px', height: '60px', background: colors.turquoise + '20', borderRadius: '0 24px 0 60px' }} />
                                    <ImagePlaceholder height={240} />
                                    <h3 style={{ fontSize: '24px', fontWeight: 700, color: colors.turquoise, marginBottom: '16px', marginTop: '24px' }}>Retail</h3>
                                    <p style={{ fontSize: '16px', color: 'white', opacity: 0.9, lineHeight: 1.6, marginBottom: '20px' }}>A vibrant destination to shop with world-class retail experiences...</p>
                                    <motion.div whileHover={{ x: 8 }} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: colors.lightCyan, fontWeight: 600, fontSize: '16px', cursor: 'pointer' }}>
                                        Explore More
                                        <div style={{ width: '40px', height: '40px', background: colors.turquoise, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '18px' }}>→</div>
                                    </motion.div>
                                    <p style={{ position: 'absolute', bottom: '20px', right: '20px', fontSize: '12px', color: colors.lightCyan, opacity: 0.7 }}>Jan 22, 2025</p>
                                </div>
                            </AnimatedCard>

                            <AnimatedCard>
                                <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: `1px solid ${colors.turquoise}30`, borderRadius: '24px', padding: '40px', height: '500px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', top: 0, right: 0, width: '60px', height: '60px', background: colors.lightCyan + '20', borderRadius: '0 24px 0 60px' }} />
                                    <ImagePlaceholder height={240} />
                                    <h3 style={{ fontSize: '24px', fontWeight: 700, color: colors.turquoise, marginBottom: '16px', marginTop: '24px' }}>Dine</h3>
                                    <p style={{ fontSize: '16px', color: 'white', opacity: 0.9, lineHeight: 1.6, marginBottom: '20px' }}>Dining options to suit all tastes with premium restaurants...</p>
                                    <motion.div whileHover={{ x: 8 }} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: colors.lightCyan, fontWeight: 600, fontSize: '16px', cursor: 'pointer' }}>
                                        Explore More
                                        <div style={{ width: '40px', height: '40px', background: colors.turquoise, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '18px' }}>→</div>
                                    </motion.div>
                                    <p style={{ position: 'absolute', bottom: '20px', right: '20px', fontSize: '12px', color: colors.lightCyan, opacity: 0.7 }}>Jan 20, 2025</p>
                                </div>
                            </AnimatedCard>

                            <AnimatedCard>
                                <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: `1px solid ${colors.turquoise}30`, borderRadius: '24px', padding: '40px', height: '500px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', top: 0, right: 0, width: '60px', height: '60px', background: colors.brightBlue + '20', borderRadius: '0 24px 0 60px' }} />
                                    <ImagePlaceholder height={240} />
                                    <h3 style={{ fontSize: '24px', fontWeight: 700, color: colors.turquoise, marginBottom: '16px', marginTop: '24px' }}>Discover</h3>
                                    <p style={{ fontSize: '16px', color: 'white', opacity: 0.9, lineHeight: 1.6, marginBottom: '20px' }}>A world of art, culture and innovation in one place...</p>
                                    <motion.div whileHover={{ x: 8 }} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: colors.lightCyan, fontWeight: 600, fontSize: '16px', cursor: 'pointer' }}>
                                        Explore More
                                        <div style={{ width: '40px', height: '40px', background: colors.turquoise, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '18px' }}>→</div>
                                    </motion.div>
                                    <p style={{ position: 'absolute', bottom: '20px', right: '20px', fontSize: '12px', color: colors.lightCyan, opacity: 0.7 }}>Jan 17, 2025</p>
                                </div>
                            </AnimatedCard>

                        </div>
                    </div>
                </section>

                <section style={{ minHeight: '100vh', background: colors.whatsOnBg, display: 'flex', alignItems: 'center', padding: '80px' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                            <h2 style={{ fontSize: '40px', fontWeight: 800, color: 'white', marginBottom: '12px' }}>What's on in MIFC</h2>
                            <p style={{ fontSize: '16px', color: colors.lightCyan, opacity: 0.9 }}>Latest Blogs, News, and Podcasts</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '50px', flexWrap: 'wrap' }}>
                            {['All', 'Business', 'Store', 'Innovation', 'Sustainability', 'Insights'].map((filter, i) => (
                                <button key={filter} style={{ padding: '8px 20px', background: i === 0 ? colors.turquoise : 'transparent', color: i === 0 ? 'white' : colors.lightCyan, border: `1px solid ${colors.turquoise}`, borderRadius: '20px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.3s ease' }}>{filter}</button>
                            ))}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '40px' }}>
                            {[
                                { title: 'A vibrant destination to shop', date: 'Dec 23, 2024', category: 'Retail' },
                                { title: 'Dining options to suit all tastes', date: 'Dec 23, 2024', category: 'Lifestyle' },
                                { title: 'A world of art, in one place', date: 'Dec 23, 2024', category: 'Culture' }
                            ].map((article, i) => (
                                <AnimatedCard key={i}>
                                    <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', border: `1px solid ${colors.turquoise}20`, borderRadius: '24px', padding: '40px', height: '450px', position: 'relative', overflow: 'hidden' }}>
                                        <div style={{ position: 'absolute', top: 0, right: 0, width: '60px', height: '60px', background: colors.turquoise + '15', borderRadius: '0 24px 0 60px' }} />
                                        <ImagePlaceholder height={200} />
                                        <div style={{ position: 'absolute', top: '20px', left: '20px', padding: '4px 12px', background: colors.turquoise, color: 'white', borderRadius: '12px', fontSize: '10px', fontWeight: 600 }}>{article.category}</div>
                                        <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '12px', marginTop: '20px', lineHeight: 1.3 }}>{article.title}</h3>
                                        <p style={{ fontSize: '14px', color: colors.lightCyan, opacity: 0.8, marginBottom: '20px' }}>{article.date} • 4 mins read</p>
                                        <motion.div whileHover={{ x: 8 }} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: colors.turquoise, fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
                                            Read More
                                            <div style={{ width: '32px', height: '32px', background: colors.turquoise, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px' }}>→</div>
                                        </motion.div>
                                    </div>
                                </AnimatedCard>
                            ))}
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '50px' }}>
                            <button style={{ padding: '14px 28px', background: 'transparent', color: colors.turquoise, border: `2px solid ${colors.turquoise}`, borderRadius: '30px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease' }}>See more articles</button>
                        </div>

                    </div>
                </section>

                <section style={{ minHeight: '100vh', background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '120px', height: '120px', margin: '0 auto 30px', background: `linear-gradient(135deg,${colors.turquoise},${colors.lightCyan})`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', color: 'white', boxShadow: '0 10px 30px rgba(13,219,204,0.3)' }}>🏢</div>
                        <h2 style={{ fontSize: '36px', fontWeight: 800, color: colors.turquoise, marginBottom: '16px' }}>MIFC</h2>
                        <p style={{ fontSize: '18px', color: colors.navy, opacity: 0.8, marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>Copyright © Maldives International Financial Centre. All rights reserved.</p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
                            <motion.a href="#" whileHover={{ scale: 1.2, rotate: 5 }} style={{ width: '50px', height: '50px', background: colors.brightBlue, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', fontSize: '20px', boxShadow: '0 8px 20px rgba(0,148,251,0.3)' }}>in</motion.a>
                            <motion.a href="#" whileHover={{ scale: 1.2, rotate: -5 }} style={{ width: '50px', height: '50px', background: colors.turquoise, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', fontSize: '18px', boxShadow: '0 8px 20px rgba(13,219,204,0.3)' }}>𝕏</motion.a>
                            <motion.a href="#" whileHover={{ scale: 1.2, rotate: 5 }} style={{ width: '50px', height: '50px', background: colors.deepBlue, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', fontSize: '18px', boxShadow: '0 8px 20px rgba(59,118,216,0.3)' }}>📷</motion.a>
                            <motion.a href="#" whileHover={{ scale: 1.2, rotate: -5 }} style={{ width: '50px', height: '50px', background: colors.brightBlue, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', fontSize: '18px', boxShadow: '0 8px 20px rgba(0,148,251,0.3)' }}>▶</motion.a>
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
                        padding: '14px 28px', 
                        background: colors.turquoise, 
                        color: '#003A76', 
                        border: 'none', 
                        borderRadius: '6px', 
                        fontSize: '20px', 
                        fontWeight: 600, 
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
                        padding: '14px 28px', 
                        background: colors.turquoise, 
                        color: '#003A76', 
                        border: 'none', 
                        borderRadius: '6px', 
                        fontSize: '20px', 
                        fontWeight: 600, 
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

            <div style={{ position: 'fixed', bottom: 20, right: 20, height: '60px', width: '4px', background: `${colors.turquoise}20`, borderRadius: '2px', zIndex: 1001 }}>
                <div style={{ height: `${scrollProgress}%`, background: colors.turquoise, borderRadius: '2px', transition: 'height 0.1s ease' }} />
            </div>

        </div>
    );
};

export default MIFCVertical;
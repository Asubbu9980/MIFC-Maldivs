import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import HeroImage from "../../assets/Hero.png"

const colors = {
    turquoise: '#0ddbcc',
    deepBlue: '#3b76d8',
    lightCyan: '#43ebff',
    navy: '#003A76',
    brightBlue: '#0094fb',
    futureBg: '#3B76D8',
    whatsOnBg: '#0C347A'
};

const MIFCVertical = () => {
    const containerRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [navOpacity, setNavOpacity] = useState(1);
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const progress = (container.scrollTop / (container.scrollHeight - container.clientHeight)) * 100;
            setScrollProgress(progress);
            
            // Update nav opacity based on scroll position
            const opacity = container.scrollTop > 50 ? 0.95 : 1;
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

    return (
        <div style={{ height: '100vh', overflow: 'hidden', background: colors.navy }}>

            <style>{`
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

            <motion.nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: `rgba(255,255,255,${navOpacity})`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${colors.turquoise}30`, padding: '16px 0', transition: 'all 0.3s ease' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px' }}>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: colors.turquoise }}>MIFC</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <motion.button whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }} style={{ padding: '12px 24px', background: colors.brightBlue, color: 'white', border: 'none', borderRadius: '25px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,148,251,0.3)', transition: 'all 0.3s ease' }}>Apply Online</motion.button>
                        <motion.button whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }} style={{ padding: '12px 24px', background: 'transparent', color: colors.deepBlue, border: `2px solid ${colors.deepBlue}`, borderRadius: '25px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease' }}>Request callback</motion.button>
                    </div>
                </div>
            </motion.nav>

            <div ref={containerRef} className="vertical-container" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden', scrollBehavior: 'smooth' }}>

                <section style={{ minHeight: '100vh', position: 'relative', background: colors.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                        <ImagePlaceholder src={HeroImage} height="100vh" alt="MIFC Hero" />
                    </div>
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.3 }} style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '900px', padding: '0 40px', color: 'white' }}>
                        <h1 style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 800, marginBottom: '24px', lineHeight: 1.1, color: 'white', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>Maldives International Financial Centre</h1>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }} style={{ fontSize: 'clamp(1.2rem,3vw,2rem)', fontWeight: 300, marginBottom: '40px', color: colors.lightCyan, opacity: 0.95 }}>Rethinking finance. Redefining lifestyle.</motion.p>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }} style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button style={{ padding: '16px 32px', fontSize: '16px', fontWeight: 600, background: colors.turquoise, color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer', boxShadow: `0 8px 25px ${colors.turquoise}40`, transition: 'all 0.3s ease' }}>Learn More</button>
                            <button style={{ padding: '16px 32px', fontSize: '16px', fontWeight: 600, background: 'transparent', color: 'white', border: '2px solid white', borderRadius: '50px', cursor: 'pointer', transition: 'all 0.3s ease' }}>Contact Us</button>
                        </motion.div>
                    </motion.div>
                </section>

                <section style={{ minHeight: '100vh', background: '#f0f2f5', display: 'flex', alignItems: 'center', padding: '80px' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                        <h2 style={{ fontSize: '32px', fontWeight: 700, color: colors.turquoise, marginBottom: '60px' }}>MIFC Business Categories</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '30px' }}>
                            <BusinessCard
                                icon="💼"
                                title="Business in MIFC"
                                description="The leading financial hub in the region."
                                buttonColor="turquoise"
                            />
                            <BusinessCard
                                icon="📊"
                                title="Legal Database"
                                description="A world-class judicial system based on English common law."
                                buttonColor="deepBlue"
                            />
                            <BusinessCard
                                icon="🏖️"
                                title="Experience MIFC"
                                description="An unparalleled destination for residents and visitors."
                                buttonColor="turquoise"
                            />
                            <BusinessCard
                                icon="🏢"
                                title="MIFC Public Register"
                                description="An extensive range of registered companies in MIFC."
                                buttonColor="turquoise"
                            />
                        </div>
                    </div>
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

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
                            <motion.button whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }} style={{ padding: '18px 36px', background: colors.brightBlue, color: 'white', border: 'none', borderRadius: '50px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,148,251,0.4)', transition: 'all 0.3s ease' }}>Apply Online</motion.button>
                            <motion.button whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }} style={{ padding: '18px 36px', background: 'transparent', color: colors.turquoise, border: `3px solid ${colors.turquoise}`, borderRadius: '50px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s ease' }}>Request callback</motion.button>
                        </div>
                    </div>
                </section>

            </div>

            <div style={{ position: 'fixed', bottom: 20, right: 20, height: '60px', width: '4px', background: `${colors.turquoise}20`, borderRadius: '2px', zIndex: 1001 }}>
                <div style={{ height: `${scrollProgress}%`, background: colors.turquoise, borderRadius: '2px', transition: 'height 0.1s ease' }} />
            </div>

        </div>
    );
};

export default MIFCVertical;
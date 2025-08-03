import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const colors = {
    turquoise: '#0ddbcc',
    deepBlue: '#3b76d8',
    lightCyan: '#43ebff',
    navy: '#003A76',
    brightBlue: '#0094fb',
    futureBg: '#3B76D8',
    whatsOnBg: '#0C347A'
};

const HeroImageSection = ({ 
    images, 
    title = "Maldives International Financial Centre",
    subtitle = null,
    activeDropdown = null,
    className = "",
    style = {},
    children = null
}) => {
    const intervalRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // Hero carousel effect - completely stop/start interval based on dropdown
    useEffect(() => {
        // Clear any existing interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        // Only start interval if no dropdown is active and we have images
        if (!activeDropdown && images && images.length > 1) {
            intervalRef.current = setInterval(() => {
                setCurrentImageIndex((prevIndex) => {
                    const nextIndex = (prevIndex + 1) % images.length;
                    console.log(`Carousel transition: ${prevIndex} -> ${nextIndex}`);
                    return nextIndex;
                });
            }, 5000);
        } else if (activeDropdown) {
            console.log('Carousel paused due to active dropdown:', activeDropdown);
        }

        // Cleanup function
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [images?.length, activeDropdown]);

    // Reset to first image when images change
    useEffect(() => {
        setCurrentImageIndex(0);
    }, [images]);

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

    if (!images || images.length === 0) {
        return (
            <section 
                className={className}
                style={{ 
                    minHeight: '100vh', 
                    position: 'relative', 
                    background: colors.navy, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    overflow: 'hidden',
                    ...style 
                }}
            >
                <div style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: colors.navy, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    zIndex: 1
                }}>
                    <div style={{ color: 'white', fontSize: '18px', fontWeight: 600 }}>
                        No images provided
                    </div>
                </div>
                {children}
            </section>
        );
    }

    return (
        <section 
            className={className}
            style={{ 
                minHeight: '100vh', 
                position: 'relative', 
                background: colors.navy, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                overflow: 'hidden',
                ...style 
            }}
        >
            {/* Hero Carousel Background */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                <div style={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: '100%', 
                    overflow: 'hidden',
                    background: '#000'
                }}>
                    {/* Smooth cross-fade with simultaneous image loading */}
                    <AnimatePresence mode="sync">
                        {images.map((image, index) => {
                            const isActive = index === currentImageIndex;
                            
                            return (
                                <motion.div
                                    key={`image-${index}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isActive ? 1 : 0 }}
                                    transition={{ 
                                        duration: activeDropdown ? 0 : 0.8,
                                        ease: [0.25, 0.1, 0.25, 1.0],
                                        type: "tween"
                                    }}
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        width: '100%',
                                        height: '100%',
                                        zIndex: isActive ? 2 : 1,
                                        willChange: 'opacity',
                                        backfaceVisibility: 'hidden'
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
                    
                    {/* Slash Navigation Controls - Bottom Right */}
                    {images.length > 1 && (
                        <ul 
                            style={{ 
                                position: 'absolute', 
                                bottom: '180px', 
                                right: '200px', 
                                display: 'flex', 
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: '2px',
                                zIndex: 1010,
                                padding: '0px',
                                borderRadius: '5px',
                                listStyle: 'none',
                                margin: 0
                            }}
                        >
                            {images.map((_, index) => (
                                <li
                                    key={`slash-${index}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                    style={{
                                        listStyle: 'none',
                                        width: '30px',
                                        height: '4px',
                                        background: index === currentImageIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                                        cursor: 'pointer',
                                        borderRadius: '2px',
                                        transform: 'rotate(-45deg)',
                                        transformOrigin: 'center',
                                        position: 'relative',
                                        boxShadow: index === currentImageIndex ? 
                                            `0 0 5px rgba(255, 255, 255, 0.8), 0 2px 4px rgba(0,0,0,0.3)` : 
                                            '0 1px 3px rgba(0,0,0,0.15)',
                                        border: index === currentImageIndex ? `1px solid rgba(255, 255, 255, 0.8)` : 'none',
                                        transition: 'all 0.3s ease',
                                        opacity: index === currentImageIndex ? 1 : 0.8,
                                        scale: index === currentImageIndex ? '1.3' : '1'
                                    }}
                                />
                            ))}
                        </ul>
                    )}

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
            </div>
            
            {/* Default Content Overlay */}
            {!children && (
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
                        {title}
                    </h1>
                    {subtitle && (
                        <motion.p 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ duration: 0.8, delay: 0.8 }} 
                            style={{ 
                                fontSize: 'clamp(1.2rem,3vw,2rem)', 
                                fontWeight: 300, 
                                marginBottom: '40px', 
                                color: colors.lightCyan, 
                                opacity: 0.95 
                            }}
                        >
                            {subtitle}
                        </motion.p>
                    )}
                </motion.div>
            )}
            
            {/* Custom Children Content */}
            {children}
        </section>
    );
};

export default HeroImageSection;

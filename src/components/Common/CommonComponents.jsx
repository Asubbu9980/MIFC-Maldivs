import React from 'react';
import { motion } from 'framer-motion';

const colors = {
    turquoise: '#0ddbcc',
    deepBlue: '#3b76d8',
    lightCyan: '#43ebff',
    navy: '#003A76',
    brightBlue: '#0094fb',
    futureBg: '#3B76D8',
    whatsOnBg: '#0C347A'
};

export const ImagePlaceholder = ({ height = 300, src = null, alt = "Image", className = "" }) => (
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

export const BusinessCard = ({ icon, title, description, buttonColor = 'turquoise', buttonText = 'Get started' }) => (
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

export const AnimatedCard = ({ children }) => (
    <motion.div whileHover={{ y: -15, scale: 1.03, transition: { duration: 0.4, ease: 'easeOut' } }} style={{ cursor: 'pointer', transformOrigin: 'center' }}>
        {children}
    </motion.div>
);

export const AboutSection = () => (
    <section style={{ minWidth: '100vw', height: '100vh', background: 'white', display: 'flex', alignItems: 'center', padding: '0' }}>
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
                    
                    {/* <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '40px' }}>
                        <div style={{ 
                            background: 'white', 
                            padding: '24px', 
                            borderRadius: '12px', 
                            border: `1px solid ${colors.turquoise}20`, 
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)' 
                        }}>
                            <div style={{ 
                                fontSize: '32px', 
                                fontWeight: 800, 
                                color: colors.turquoise, 
                                marginBottom: '8px' 
                            }}>
                                100+
                            </div>
                            <p style={{ 
                                fontSize: '14px', 
                                color: colors.navy, 
                                opacity: 0.8, 
                                margin: 0 
                            }}>
                                Registered Companies
                            </p>
                        </div>
                        
                        <div style={{ 
                            background: 'white', 
                            padding: '24px', 
                            borderRadius: '12px', 
                            border: `1px solid ${colors.deepBlue}20`, 
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)' 
                        }}>
                            <div style={{ 
                                fontSize: '32px', 
                                fontWeight: 800, 
                                color: colors.deepBlue, 
                                marginBottom: '8px' 
                            }}>
                                24/7
                            </div>
                            <p style={{ 
                                fontSize: '14px', 
                                color: colors.navy, 
                                opacity: 0.8, 
                                margin: 0 
                            }}>
                                Digital Services
                            </p>
                        </div>
                    </div> */}
                    
                    {/* <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ 
                                padding: '16px 32px', 
                                background: colors.turquoise, 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '50px', 
                                fontSize: '16px', 
                                fontWeight: 600, 
                                cursor: 'pointer', 
                                boxShadow: `0 8px 25px ${colors.turquoise}40`, 
                                transition: 'all 0.3s ease' 
                            }}
                        >
                            Learn More About MIFC
                        </motion.button>
                        
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ 
                                padding: '16px 32px', 
                                background: 'transparent', 
                                color: colors.navy, 
                                border: `2px solid ${colors.navy}`, 
                                borderRadius: '50px', 
                                fontSize: '16px', 
                                fontWeight: 600, 
                                cursor: 'pointer', 
                                transition: 'all 0.3s ease' 
                            }}
                        >
                            View Public Register
                        </motion.button>
                    </div> */}
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
                    
                    {/* Feature Pills */}
                    {/* <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        viewport={{ once: true }}
                        style={{ 
                            display: 'flex', 
                            gap: '12px', 
                            marginTop: '40px', 
                            flexWrap: 'wrap' 
                        }}
                    >
                        {['Blockchain-Powered', 'Sustainable Future', 'English Common Law', 'Digital First'].map((feature, i) => (
                            <div 
                                key={feature}
                                style={{ 
                                    padding: '8px 16px', 
                                    background: i % 2 === 0 ? colors.turquoise + '15' : colors.deepBlue + '15', 
                                    color: i % 2 === 0 ? colors.turquoise : colors.deepBlue, 
                                    borderRadius: '20px', 
                                    fontSize: '14px', 
                                    fontWeight: 600,
                                    border: `1px solid ${i % 2 === 0 ? colors.turquoise : colors.deepBlue}30`
                                }}
                            >
                                {feature}
                            </div>
                        ))}
                    </motion.div> */}
                </motion.div>
                
            </div>
        </div>
    </section>
);

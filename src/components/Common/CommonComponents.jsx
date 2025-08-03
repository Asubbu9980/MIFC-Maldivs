import React from 'react';
import { motion } from 'framer-motion';
import '../../assets/reckless/stylesheet.css';

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
            <div style={{ height: '100%', background: colors.lightCyan, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', fontWeight: 600, fontFamily: '"Reckless Neue", serif' }}>
                Image Placeholder
            </div>
        )}
    </div>
);

export const BusinessCard = ({ icon, title, description, buttonColor = 'turquoise', buttonText = 'Get started' }) => (
    <motion.div 
        whileHover={{ 
            y: -8, 
            transition: { duration: 0.3, ease: 'easeOut' }
        }} 
        style={{ cursor: 'pointer', height: '100%', width: '100%', maxWidth: '350px' }}
    >
        <div 
            style={{ 
                background: 'white', 
                borderRadius: '16px', 
                padding: '20px', 
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)', 
                height: '100%', 
                width: '100%',
                minHeight: '280px',
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between', 
                fontFamily: '"Reckless Neue", serif',
                border: '1px solid #f0f0f0',
                transition: 'all 0.3s ease'
            }}
        >
            {/* Icon/Image section at the top */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                marginBottom: '12px'
            }}>
                <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    background: colors[buttonColor], 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '24px',
                    color: 'white',
                    boxShadow: `0 4px 15px ${colors[buttonColor]}30`
                }}>
                    {icon}
                </div>
            </div>

            {/* Title */}
            <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 700, 
                color: colors.navy, 
                marginBottom: '8px', 
                textAlign: 'center', 
                fontFamily: '"Reckless Neue", serif',
                lineHeight: 1.2
            }}>
                {title}
            </h3>

            {/* Description */}
            <p style={{ 
                fontSize: '13px', 
                color: colors.navy, 
                opacity: 0.7, 
                lineHeight: 1.4, 
                textAlign: 'center', 
                fontFamily: '"Reckless Neue", serif',
                margin: '0 0 16px 0',
                flex: 1
            }}>
                {description}
            </p>

            {/* Get started button */}
            <motion.button 
                whileHover={{ 
                    background: colors[buttonColor],
                    color: 'white',
                    transform: 'translateY(-2px)'
                }} 
                whileTap={{ scale: 0.98 }}
                style={{ 
                    width: '100%', 
                    padding: '12px 20px', 
                    background: 'transparent', 
                    color: colors[buttonColor], 
                    border: `2px solid ${colors[buttonColor]}`, 
                    borderRadius: '8px', 
                    fontSize: '14px', 
                    fontWeight: 600, 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '6px', 
                    fontFamily: '"Reckless Neue", serif',
                    transition: 'all 0.3s ease'
                }}
            >
                {buttonText} <span style={{ fontSize: '16px' }}>→</span>
            </motion.button>
        </div>
    </motion.div>
);

export const AnimatedCard = ({ children }) => (
    <motion.div whileHover={{ y: -15, scale: 1.03, transition: { duration: 0.4, ease: 'easeOut' } }} style={{ cursor: 'pointer', transformOrigin: 'center' }}>
        {children}
    </motion.div>
);

export const BusinessCardGrid = ({ 
    title, 
    backgroundColor = '#f0f2f5', 
    titleColor = 'turquoise',
    columns = 4,
    cards = [],
    padding = '80px',
    minHeight = '100vh',
    cardStyle = 'default', // 'default' or 'advanced'
    cardWidth = null // Fixed width for cards (e.g., '300px')
}) => (
    <div style={{ 
        minHeight, 
        background: backgroundColor, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding,
        width: '100%'
    }}>
        <div style={{ 
            maxWidth: '1400px', 
            margin: '0 auto', 
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            {title && (
                <h2 style={{ 
                    fontSize: 'clamp(24px, 4vw, 28px)', 
                    fontWeight: 700, 
                    color: colors[titleColor], 
                    marginBottom: '40px', 
                    fontFamily: '"Reckless Neue", serif',
                    textAlign: 'center',
                    width: '100%'
                }}>
                    {title}
                </h2>
            )}
            <div 
                className="business-card-grid"
                style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(4, 1fr)', 
                    gap: '48px',
                    width: '100%',
                    maxWidth: '1400px',
                    justifyItems: 'stretch',
                    alignItems: 'stretch',
                    margin: '0 auto'
                }}
            >
                {cards.map((card, index) => (
                    cardStyle === 'advanced' ? (
                        <AnimatedCard key={index}>
                            <div style={{ 
                                background: 'white', 
                                borderRadius: '24px', 
                                padding: '40px', 
                                boxShadow: '0 15px 50px rgba(0,0,0,0.12)', 
                                border: `1px solid ${colors[card.buttonColor || 'turquoise']}20`, 
                                height: '500px', 
                                position: 'relative', 
                                overflow: 'hidden',
                                width: '100%',
                                maxWidth: '250px'
                            }}>
                                <div style={{ 
                                    position: 'absolute', 
                                    top: 0, 
                                    right: 0, 
                                    width: '60px', 
                                    height: '60px', 
                                    background: colors[card.buttonColor || 'turquoise'] + '20', 
                                    borderRadius: '0 24px 0 60px' 
                                }} />
                                <ImagePlaceholder height={240} />
                                <h3 style={{ 
                                    fontSize: '24px', 
                                    fontWeight: 700, 
                                    color: colors.navy, 
                                    marginBottom: '16px', 
                                    marginTop: '24px',
                                    fontFamily: '"Reckless Neue", serif' 
                                }}>
                                    {card.title}
                                </h3>
                                <p style={{ 
                                    fontSize: '16px', 
                                    color: colors.navy, 
                                    opacity: 0.8, 
                                    lineHeight: 1.6, 
                                    marginBottom: '20px',
                                    fontFamily: '"Reckless Neue", serif' 
                                }}>
                                    {card.description}
                                </p>
                                <motion.div 
                                    whileHover={{ x: 8 }} 
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '12px', 
                                        color: colors[card.buttonColor || 'turquoise'], 
                                        fontWeight: 600, 
                                        fontSize: '16px', 
                                        cursor: 'pointer',
                                        fontFamily: '"Reckless Neue", serif' 
                                    }}
                                >
                                    {card.buttonText || 'Explore More'}
                                    <div style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        background: colors[card.buttonColor || 'turquoise'], 
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
                            </div>
                        </AnimatedCard>
                    ) : (
                        <BusinessCard
                            key={index}
                            icon={card.icon}
                            title={card.title}
                            description={card.description}
                            buttonColor={card.buttonColor || 'turquoise'}
                            buttonText={card.buttonText || 'Get started'}
                        />
                    )
                ))}
            </div>
        </div>
    </div>
);

export const AboutSection = ({ minWidth = '100vw' }) => (
    <section style={{ minWidth, height: '100vh', background: 'white', display: 'flex', alignItems: 'center', padding: '0' }}>
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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

const Home = ({ packages, stats, successStories, digitalProducts }) => {
    const navigate = useNavigate();
    const [config, setConfig] = useState({});
    const [loadingConfig, setLoadingConfig] = useState(true);
    const [openFaq, setOpenFaq] = useState(null);

    // Only show top 3 latest/highlighted packages
    const topPackages = (packages || []).slice(0, 3);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/config`)
            .then(res => res.json())
            .then(data => {
                setConfig(data);
                setLoadingConfig(false);
            })
            .catch(err => {
                console.error("Error fetching config:", err);
                setLoadingConfig(false);
            });
    }, []);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Parse JSON safely
    const parseJson = (jsonString, fallback) => {
        try {
            return jsonString ? JSON.parse(jsonString) : fallback;
        } catch (e) {
            console.error("Error parsing JSON config:", e);
            return fallback;
        }
    }

    const homeFeatures = parseJson(config.homeFeatures, [
        { title: "Income Focused", text: "Every module is designed to help you land your first client or high-paying job.", icon: "💸" },
        { title: "Live Support", text: "Get stuck? Our mentors are available 24/7 on our private Discord community.", icon: "📱" },
        { title: "Lifetime Updates", text: "Technology changes. Our packages update every month at no extra cost to you.", icon: "🛡️" }
    ]);

    const homeFaqs = parseJson(config.homeFaqs, [
        { question: "Do I need prior experience?", answer: "No! All our tracks start from absolute basics and move to advanced strategies." },
        { question: "Will I get a certificate?", answer: "Yes, you'll receive a verified certificate from SatyaInfotech Academy upon completion." },
        { question: "Is it accessible forever?", answer: "Yes! One-time payment gets you lifetime access to the package and all future updates." }
    ]);

    return (
        <>
            <section className="hero">
                <div className="hero-container">
                    <div className="hero-image-wrapper">
                        <div className="badge-overlay">Limited Time Offer</div>
                        <img src={packages && packages.length > 0 ? (packages.find(p => p.isHighlighted)?.imageUrl || packages[0].imageUrl) : "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"} alt="Featured Package" className="hero-thumb" />
                    </div>
                    <div className="hero-content">
                        {packages && packages.length > 0 ? (() => {
                            const featuredPackage = packages.find(p => p.isHighlighted) || packages[0];
                            return (
                                <>
                                    <div className="social-proof">
                                        <div style={{ display: 'flex', gap: '2px', color: '#f59e0b' }}>
                                            {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                                        </div>
                                        <span style={{ fontSize: '0.9rem' }}>{featuredPackage.studentCount?.toLocaleString() || '10,000'}+ Students Already Learning</span>
                                    </div>
                                    <h1 className="hero-title">{featuredPackage.title}</h1>
                                    <p className="hero-desc">{featuredPackage.description}</p>
                                    <div className="pricing-tag">
                                        <span className="original-price">₹{featuredPackage.originalPrice || (featuredPackage.price * 3).toFixed(0)}</span>
                                        <span className="discounted-price">₹{featuredPackage.price}</span>
                                    </div>
                                    <div className="hero-actions">
                                        <button className="btn-primary btn-lg pulse-animation" onClick={() => navigate('/packages')}>
                                            Start Your Journey Today
                                        </button>
                                        <button className="btn-secondary btn-lg" onClick={() => navigate(`/package/${featuredPackage.id}`)}>View Syllabus</button>
                                    </div>
                                    <span className="trust-badge">✓ Lifetime Access  ✓ Beginner Friendly</span>
                                </>
                            );
                        })() : (
                            <>
                                <h1 className="hero-title">{config.heroTitle || 'Master Skills That'} <span className="gradient-text">Actually Pay</span></h1>
                                <p className="hero-desc">{config.heroSubtitle || 'Stop learning theories. Start building a career that gives you financial freedom.'}</p>
                                <div className="hero-actions">
                                    <button className="btn-primary btn-lg" onClick={() => navigate('/packages')}>Browse Skill Tracks</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            <section className="stats">
                <div className="stat-item">
                    <span className="stat-number">{config.statStudents || (stats?.students?.toLocaleString() || '0') + '+'}</span>
                    <span className="stat-label">Active Students</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{config.statEarnings || '₹' + (stats?.earnings?.toFixed(1) || '0.0') + 'Cr+'}</span>
                    <span className="stat-label">Total Student Earnings</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{config.statRating || (stats?.rating || '0.0') + '/5'}</span>
                    <span className="stat-label">Student Satisfaction</span>
                </div>
            </section>

            <section className="why-us" id="why-us">
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{config.missionTitle || "Our Mission: Your Financial Freedom"}</h2>
                    <p>{config.missionText || "SatyaInfotech Academy was founded with one goal: to bridge the gap between academic theory and real-world wealth creation."}</p>
                </div>
                <div className="why-us-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {homeFeatures.map((feature, i) => (
                        <div key={i} className="feature-box">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="features" id="packages" style={{ padding: '6rem 2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '3rem' }}>High-Income <span className="gradient-text">Skill Tracks</span></h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>Pick a path and master the skill in as little as 4 weeks. (Showing Top 3 latest)</p>
                </div>
                <div className="grid" style={{ maxWidth: '1200px', margin: '0 auto', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 350px))', justifyContent: 'center' }}>
                    {topPackages.length > 0 ? (
                        topPackages.map(pkg => (
                            <div className={`card ${pkg.isHighlighted ? 'featured-card' : ''}`} key={pkg.id} style={{ display: 'flex', flexDirection: 'column' }}>
                                {pkg.badge && <span className="badge">{pkg.badge}</span>}
                                <div className="card-image-wrap" style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '8px 8px 0 0', background: '#000', marginBottom: '1.25rem' }}>
                                    <img src={pkg.imageUrl} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>{pkg.title}</h3>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{pkg.description}</p>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                    <span style={{ fontWeight: 'bold', color: 'var(--color-accent)', fontSize: '1.6rem' }}>₹{pkg.price}</span>
                                    <span style={{ textDecoration: 'line-through', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>₹{pkg.originalPrice || (pkg.price * 2).toFixed(0)}</span>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: 'auto' }}>
                                    <button className="btn-secondary" style={{ padding: '0.75rem 0.5rem', fontSize: '0.9rem' }} onClick={() => navigate(`/package/${pkg.id}`)}>View Details</button>
                                    <button className="btn-primary" style={{ padding: '0.75rem 0.5rem', fontSize: '0.9rem' }} onClick={() => navigate(`/payment/${pkg.id}`)}>Join Now</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>Loading our premium tracks...</p>
                    )}
                </div>
                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <button className="btn-secondary btn-lg" onClick={() => navigate('/packages')}>Explore All {packages?.length || 0} Tracks →</button>
                </div>
            </section>

            <section className="digital-preview" style={{ padding: '6rem 2rem', background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.05), transparent)' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '3rem' }}>Digital <span className="gradient-text">Treasury</span></h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>Premium toolkits, eBooks, and resources to boost your output.</p>
                </div>
                <div className="grid" style={{ maxWidth: '1200px', margin: '0 auto', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 350px))', justifyContent: 'center' }}>
                    {(digitalProducts || []).slice(0, 3).map(product => (
                        <div className="card" key={product.id}>
                            <div className="card-image" style={{ backgroundImage: `url(${product.imageUrl})`, height: '180px', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px 8px 0 0', marginBottom: '1rem' }}></div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{product.title}</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>₹{product.price}</span>
                                <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{product.category}</span>
                            </div>
                            <button className="btn-secondary" style={{ width: '100%' }} onClick={() => navigate(`/payment/dp-${product.id}`)}>Buy Now</button>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <button className="btn-primary" onClick={() => navigate('/digital-products')}>Browse Full Shop →</button>
                </div>
            </section>

            <section className="faq" id="faq" style={{ padding: '6rem 2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem' }}>Frequently Asked <span className="highlight">Questions</span></h2>
                </div>
                <div className="faq-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    {homeFaqs.map((faq, index) => (
                        <div className="faq-item" key={index} onClick={() => toggleFaq(index)} style={{ cursor: 'pointer' }}>
                            <div className="faq-question" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {faq.question}
                                <span>{openFaq === index ? '−' : '+'}</span>
                            </div>
                            {openFaq === index && (
                                <div className="faq-answer" style={{ marginTop: '1rem', color: '#ccc' }}>{faq.answer}</div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <section className="final-cta" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                <h2>Ready to Start Your New Life?</h2>
                <p>Join {stats?.students?.toLocaleString() || '0'}+ students and start mastering high-income skills today.</p>
                <button className="btn-primary btn-lg" style={{ backgroundColor: 'white', color: 'var(--color-primary)' }} onClick={() => navigate('/packages')}>
                    Join The Academy Now 🚀
                </button>
                <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', opacity: '0.8' }}>Enrollment closing soon for this batch!</p>
            </section>
        </>
    );
};

export default Home;

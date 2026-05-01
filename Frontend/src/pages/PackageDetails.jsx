import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

const PackageDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/packages`);
                const packagesData = await response.json();

                const foundPackage = (packagesData || []).find(p => p.id === parseInt(id));
                setPkg(foundPackage);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>Loading package details...</p>
            </div>
        );
    }

    if (!pkg) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                <h2>Package Not Found</h2>
                <button className="btn-primary" onClick={() => navigate('/packages')}>Back to Packages</button>
            </div>
        );
    }

    return (
        <div className="package-details-page">
            <section className="hero about-hero" style={{ minHeight: '65vh', padding: '6rem 2rem' }}>
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="badge" style={{ display: 'inline-block', marginBottom: '1rem' }}>{pkg.badge || 'Premium Track'}</div>
                        <h1 className="hero-title" style={{ fontSize: '3rem', lineHeight: '1.2' }}>Master <span className="gradient-text">{pkg.title}</span> in 30 Days</h1>
                        <p className="hero-desc" style={{ maxWidth: '600px', fontSize: '1.25rem' }}>{pkg.description}</p>

                        <div style={{ margin: '1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span className="stars">★★★★★</span>
                            <span style={{ fontSize: '0.95rem', opacity: '0.9' }}>⭐ 4.8/5 Rating</span>
                        </div>

                        <div className="package-quick-facts" style={{ marginTop: '3rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '1.2rem' }}>⏱</span>
                                <div style={{ fontSize: '0.9rem' }}>
                                    <div style={{ opacity: 0.6 }}>Duration</div>
                                    <div style={{ fontWeight: 'bold' }}>{pkg.duration || '6 Weeks'}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '1.2rem' }}>🎯</span>
                                <div style={{ fontSize: '0.9rem' }}>
                                    <div style={{ opacity: 0.6 }}>Level</div>
                                    <div style={{ fontWeight: 'bold' }}>{pkg.level || 'Gold'}</div>
                                </div>
                            </div>
                            {pkg.hasCertificate && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '1.2rem' }}>📜</span>
                                    <div style={{ fontSize: '0.9rem' }}>
                                        <div style={{ opacity: 0.6 }}>Certificate</div>
                                        <div style={{ fontWeight: 'bold' }}>{pkg.certificateType || 'Verified Included'}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="hero-image-wrapper">
                        <img src={pkg.imageUrl} alt={pkg.title} className="hero-thumb" style={{ borderRadius: '24px', boxShadow: '0 30px 60px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                </div>
            </section>

            <section className="package-details-blueprint-section">
                <div className="package-details-grid">
                    <div className="main-content">
                        <h2 style={{ fontSize: '2.8rem', marginBottom: '3rem' }}>The <span className="highlight">Package Curriculum</span></h2>

                        <div className="package-steps" style={{ display: 'grid', gap: '2.5rem', position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '15px', top: '10px', bottom: '10px', width: '2px', background: 'var(--color-primary)', opacity: 0.3 }}></div>

                            {(pkg.modules && pkg.modules.length > 0 ? pkg.modules : (pkg.learningOutcomes ? pkg.learningOutcomes.map(o => ({ title: o, content: "Master this key topic to advance your career." })) : [])).map((module, index) => (
                                <div className="step-item" key={index} style={{ position: 'relative', paddingLeft: '3rem' }}>
                                    <div style={{ position: 'absolute', left: '0', top: '0', width: '32px', height: '32px', background: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, boxShadow: '0 0 15px var(--color-primary)', fontSize: '0.9rem', fontWeight: 'bold' }}>{index + 1}</div>
                                    <div className="feature-box" style={{ background: 'var(--color-surface)', margin: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                            <h3 style={{ margin: 0 }}>{module.title}</h3>
                                        </div>
                                        <p>{module.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="sidebar">
                        <div className="card featured-card" style={{ position: 'sticky', top: '100px', border: '1px solid var(--color-primary)' }}>
                            <div className="pulse-animation" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem' }}>
                                {pkg.offerText || `🔥 Limited Time Offer: Only ${(pkg.slotLimit || 50) - (pkg.enrolledCount || 0)} seats left`}
                            </div>

                            <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', opacity: 0.8 }}>Investment</h3>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '2rem' }}>
                                <span style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--color-accent)' }}>₹{pkg.price}</span>
                                <span style={{ textDecoration: 'line-through', color: 'var(--color-text-muted)', fontSize: '1.2rem' }}>₹{pkg.originalPrice || (pkg.price * 2).toFixed(0)}</span>
                            </div>

                            {pkg.enrolledCount >= (pkg.slotLimit || 50) ? (
                                <button
                                    className="btn-primary"
                                    disabled
                                    style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem', marginBottom: '1.5rem', background: '#333', cursor: 'not-allowed' }}
                                >
                                    ❌ Batch Sold Out
                                </button>
                            ) : (
                                <button
                                    className="btn-primary"
                                    onClick={() => navigate(`/payment/${pkg.id}`)}
                                    style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem', marginBottom: '1.5rem' }}
                                >
                                    🚀 Secure My Seat Now
                                </button>
                            )}

                            <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.95rem' }}>
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                    <span style={{ color: '#10b981' }}>✔</span> <span>Instant Access to Modules</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                    <span style={{ color: '#10b981' }}>✔</span> <span>Mobile Friendly Learning Page</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                    <span style={{ color: '#10b981' }}>✔</span> <span>No Hidden Charges Ever</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                    <span style={{ color: '#10b981' }}>✔</span> <span>Lifetime Updates Included</span>
                                </div>
                            </div>

                            <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.85rem', opacity: 0.6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                🔒 100% Secure Payments
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="testimonials" style={{ padding: '6rem 2rem', background: 'var(--color-surface)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '3rem' }}>Package <span className="highlight">Testimonials</span></h2>
                        <p style={{ opacity: 0.7, marginTop: '1rem', fontSize: '1.2rem' }}>See how others are transforming their lives with this track.</p>
                    </div>

                    <div className="testimonial-grid" style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '2rem'
                    }}>
                        {(pkg.testimonials || []).map((story, index) => (
                            <div className="testimonial-card" key={story.id || index} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: story.type === 'image' ? '1rem' : '2rem',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '1.5rem',
                                border: '1px solid rgba(255,255,255,0.05)',
                                maxWidth: story.aspectRatio === '9:16' ? '300px' : '400px',
                                width: '100%',
                                transition: 'transform 0.3s ease'
                            }}>
                                {story.type === 'video' ? (
                                    <div style={{
                                        width: '100%',
                                        aspectRatio: story.aspectRatio?.replace(':', '/') || '16/9',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        background: '#000',
                                        marginBottom: '1rem',
                                        maxHeight: '500px'
                                    }}>
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={story.videoUrl?.replace('watch?v=', 'embed/')}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                ) : story.type === 'image' ? (
                                    <div style={{
                                        width: '100%',
                                        aspectRatio: story.aspectRatio?.replace(':', '/') || '1/1',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        marginBottom: '1rem',
                                        background: 'rgba(255,255,255,0.05)',
                                        maxHeight: '450px'
                                    }}>
                                        <img
                                            src={story.imageUrl}
                                            alt="Testimonial Screenshot"
                                            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                                        />
                                    </div>
                                ) : (
                                    <p className="testimonial-text" style={{ flex: 1, fontSize: '1.1rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem' }}>"{story.content}"</p>
                                )}

                                {story.content && (story.type === 'video' || story.type === 'image') && (
                                    <p style={{ fontSize: '0.95rem', opacity: 0.8, lineHeight: '1.5', marginTop: 'auto' }}>{story.content}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="faq" style={{ background: 'var(--color-surface)' }}>
                <h2 style={{ textAlign: 'center', fontSize: '2.8rem', marginBottom: '4rem' }}>Package <span className="highlight">FAQ</span></h2>
                <div className="faq-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    {(pkg.faqs && pkg.faqs.length > 0 ? pkg.faqs : [
                        { question: "Do I need any prior experience?", answer: "No, we start from absolute basics." }
                    ]).map((faq, index) => (
                        <div className="faq-item" key={index}>
                            <div className="faq-question">{faq.question}</div>
                            <div className="faq-answer">{faq.answer}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default PackageDetails;

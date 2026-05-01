import React from 'react';
import { useNavigate } from 'react-router-dom';

const Packages = ({ packages }) => {
    const navigate = useNavigate();
    return (
        <div className="packages-page">
            <section className="hero about-hero" style={{ minHeight: '40vh' }}>
                <div className="hero-container" style={{ textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                    <div className="hero-content" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h1 className="hero-title" style={{ marginBottom: '1.5rem' }}>Our <span className="gradient-text">Packages</span></h1>
                    </div>
                </div>
            </section>

            <section className="features" style={{ background: 'var(--color-bg)', padding: '6rem 2rem' }}>
                <div className="grid" style={{ maxWidth: '1200px', margin: '0 auto', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 350px))', justifyContent: 'center', gap: '2rem' }}>
                    {packages && packages.length > 0 ? (
                        packages.map(pkg => (
                            <div className={`card ${pkg.isHighlighted ? 'featured-card' : ''}`} key={pkg.id} style={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: '350px' }}>
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
                                    <button className="btn-secondary" style={{ padding: '0.75rem 0.5rem', fontSize: '0.9rem' }} onClick={() => navigate(`/package/${pkg.id}`)}>View Package</button>
                                    <button className="btn-primary" style={{ padding: '0.75rem 0.5rem', fontSize: '0.9rem' }} onClick={() => navigate(`/payment/${pkg.id}`)}>Enroll Now</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '4rem' }}>
                            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>Fetching our premium tracks for you...</p>
                        </div>
                    )}
                </div>
            </section>

            <section className="final-cta" style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
                <h2>Not sure which path to choose?</h2>
                <p>Chat with our experts on WhatsApp to find the perfect skill track for your goals.</p>
                <a href="https://wa.me/919014091291" className="btn-secondary btn-lg">Get Free Consultation</a>
            </section>
        </div>
    );
};

export default Packages;

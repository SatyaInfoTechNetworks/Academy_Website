import React from 'react';
import { useNavigate } from 'react-router-dom';

const DigitalProducts = ({ products }) => {
    const navigate = useNavigate();

    return (
        <div className="packages-page">
            <section className="hero about-hero" style={{ minHeight: '40vh' }}>
                <div className="hero-container" style={{ textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                    <div className="hero-content" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h1 className="hero-title" style={{ marginBottom: '1.5rem' }}>Digital <span className="gradient-text">Products</span></h1>
                        <p className="hero-subtitle">Premium guides, toolkits, and resources to accelerate your growth.</p>
                    </div>
                </div>
            </section>

            <section className="features" style={{ background: 'var(--color-bg)', padding: '6rem 2rem' }}>
                <div className="grid">
                    {products && products.length > 0 ? (
                        products.map(product => (
                            <div className="card" key={product.id}>
                                <div className="card-image-wrap" style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '8px 8px 0 0', background: '#000', marginBottom: '1.25rem', position: 'relative' }}>
                                    <img src={product.imageUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    <span className="badge" style={{ position: 'absolute', top: '10px', right: '10px' }}>{product.category}</span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.4rem', margin: 0 }}>{product.title}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(255,215,0,0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                                        <span style={{ color: '#FFD700', fontSize: '0.9rem' }}>★</span>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{product.rating}</span>
                                    </div>
                                </div>

                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {product.description}
                                </p>

                                <div style={{ marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                                        <span>📂 {product.fileType}</span>
                                        <span>💾 {product.fileSize}</span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                    <span style={{ fontWeight: 'bold', color: 'var(--color-accent)', fontSize: '1.6rem' }}>₹{product.price}</span>
                                    <span style={{ textDecoration: 'line-through', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>₹{product.originalPrice}</span>
                                </div>

                                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
                                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '0.85rem' }}>
                                        {product.features && product.features.slice(0, 3).map((feature, idx) => (
                                            <li key={idx} style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span style={{ color: 'var(--color-accent)' }}>✓</span> {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button className="btn-primary" style={{ width: '100%', padding: '0.8rem' }} onClick={() => navigate(`/payment/dp-${product.id}`)}>
                                    Buy Now
                                </button>
                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '4rem' }}>
                            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>Loading our digital treasury...</p>
                        </div>
                    )}
                </div>
            </section>

            <section className="final-cta" style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
                <h2>Want a custom bundle?</h2>
                <p>We offer special pricing for bulk purchases of our digital assets. Get in touch with us.</p>
                <a href="https://wa.me/919014091291" className="btn-secondary btn-lg">Contact Sales</a>
            </section>
        </div>
    );
};

export default DigitalProducts;

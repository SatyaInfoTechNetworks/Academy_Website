import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config';

const AboutUs = () => {
    const [config, setConfig] = useState({});

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/config`)
            .then(res => res.json())
            .then(data => setConfig(data))
            .catch(err => console.error("Error loading about config:", err));
    }, []);

    return (
        <div className="about-us-page">
            <section className="hero about-hero">
                <div className="hero-container" style={{ textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                    <div className="hero-content" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h1 className="hero-title" style={{ marginBottom: '1.5rem' }}>{config.aboutHeroTitle || 'Empowering the Next Generation'}</h1>
                        <p className="hero-desc" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', lineHeight: '1.8' }}>
                            {config.aboutHeroDesc || 'SatyaInfotech Academy was built with a simple mission: To turn everyday students into high-earning digital professionals.'}
                        </p>
                    </div>
                </div>
            </section>

            <section className="why-us" style={{ background: 'var(--color-bg)', padding: '6rem 2rem' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{config.aboutStoryTitle || 'Our Story'}</h2>
                    <p style={{ maxWidth: '850px', margin: '0 auto', fontSize: '1.15rem', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
                        {config.aboutStoryDesc || 'Started as a small YouTube community, SatyaInfotech Academy has grown into a leading digital skills hub.'}
                    </p>
                </div>
            </section>

            <section className="mentors" id="team" style={{ background: 'var(--color-surface)' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '3rem' }}>The <span className="highlight">Visionaries</span></h2>
                    <p>Meet the minds behind SatyaInfotech Academy</p>
                </div>

                <div className="mentor-grid">
                    <div className="mentor-card founders-card">
                        <div className="founder-badge">Founder</div>
                        <img src={config.founderImage || "https://i.pravatar.cc/300?u=satya"} alt={config.founderName} style={{ width: '200px', height: '200px' }} />
                        <h3>{config.founderName || 'Satya Dev'}</h3>
                        <p className="tester-role">{config.founderRole || 'Mentor & YouTuber'}</p>
                        <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)' }}>
                            {config.founderDesc || 'A passionate educator and YouTube creator with over 5 years of experience.'}
                        </p>
                        <div className="social-links" style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            {config.founderSocial1Icon && config.founderSocial1Url && (
                                <a href={config.founderSocial1Url} target="_blank" rel="noopener noreferrer"><i className={config.founderSocial1Icon}></i></a>
                            )}
                            {config.founderSocial2Icon && config.founderSocial2Url && (
                                <a href={config.founderSocial2Url} target="_blank" rel="noopener noreferrer"><i className={config.founderSocial2Icon}></i></a>
                            )}
                        </div>
                    </div>

                    <div className="mentor-card founders-card">
                        <div className="founder-badge">Co-Founder</div>
                        <img src={config.coFounderImage || "https://i.pravatar.cc/300?u=dev"} alt={config.coFounderName} style={{ width: '200px', height: '200px' }} />
                        <h3>{config.coFounderName || 'Alex Rivera'}</h3>
                        <p className="tester-role">{config.coFounderRole || 'Software Developer & Affiliate Marketer'}</p>
                        <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)' }}>
                            {config.coFounderDesc || 'A full-stack engineer and affiliate marketing expert who brings the technical edge.'}
                        </p>
                        <div className="social-links" style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            {config.coFounderSocial1Icon && config.coFounderSocial1Url && (
                                <a href={config.coFounderSocial1Url} target="_blank" rel="noopener noreferrer"><i className={config.coFounderSocial1Icon}></i></a>
                            )}
                            {config.coFounderSocial2Icon && config.coFounderSocial2Url && (
                                <a href={config.coFounderSocial2Url} target="_blank" rel="noopener noreferrer"><i className={config.coFounderSocial2Icon}></i></a>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="stats" style={{ border: 'none' }}>
                <div className="stat-item">
                    <span className="stat-number">{config.aboutStat1Number || '5+'}</span>
                    <span className="stat-label">{config.aboutStat1Label || 'Years of Experience'}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{config.aboutStat2Number || '50k+'}</span>
                    <span className="stat-label">{config.aboutStat2Label || 'Community Members'}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{config.aboutStat3Number || '100%'}</span>
                    <span className="stat-label">{config.aboutStat3Label || 'Commitment to Success'}</span>
                </div>
            </section>

            <section className="final-cta" style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}>
                <h2>Want to join our mission?</h2>
                <p>Start your first skill track today and become part of our growing success story.</p>
                <a href="/packages" className="btn-primary btn-lg">Browse Our Packages</a>
            </section>
        </div>
    );
};

export default AboutUs;

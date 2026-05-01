import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../config';

const ConfigEditor = () => {
    const [config, setConfig] = useState({});
    const [loading, setLoading] = useState(true);

    // Dynamic Lists State
    const [features, setFeatures] = useState([]);
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/config`)
            .then(res => res.json())
            .then(data => {
                setConfig(data);

                // Parse JSON fields safely
                try {
                    setFeatures(data.homeFeatures ? JSON.parse(data.homeFeatures) : []);
                } catch (e) {
                    console.error("Bad JSON for features", e);
                    setFeatures([]);
                }

                try {
                    setFaqs(data.homeFaqs ? JSON.parse(data.homeFaqs) : []);
                } catch (e) {
                    console.error("Bad JSON for FAQs", e);
                    setFaqs([]);
                }

                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        setConfig({ ...config, [e.target.name]: e.target.value });
    };

    // Feature Handlers
    const addFeature = () => setFeatures([...features, { title: '', text: '', icon: '' }]);
    const removeFeature = (index) => setFeatures(features.filter((_, i) => i !== index));
    const updateFeature = (index, field, value) => {
        const newFeatures = [...features];
        newFeatures[index][field] = value;
        setFeatures(newFeatures);
    };

    // FAQ Handlers
    const addFaq = () => setFaqs([...faqs, { question: '', answer: '' }]);
    const removeFaq = (index) => setFaqs(faqs.filter((_, i) => i !== index));
    const updateFaq = (index, field, value) => {
        const newFaqs = [...faqs];
        newFaqs[index][field] = value;
        setFaqs(newFaqs);
    };

    const handleSave = async (e) => {
        e.preventDefault();

        // Prepare payload with stringified JSONs
        const payload = {
            ...config,
            homeFeatures: JSON.stringify(features),
            homeFaqs: JSON.stringify(faqs)
        };

        await fetch(`${API_BASE_URL}/api/config`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        alert('Configuration saved!');
    };

    if (loading) return <p>Loading config...</p>;

    const inputStyle = { width: '100%', padding: '0.8rem', marginBottom: '1rem', background: '#1e293b', border: '1px solid #333', color: 'white', borderRadius: '0.5rem' };
    const labelStyle = { display: 'block', marginBottom: '0.5rem', color: '#ccc', fontSize: '0.9rem' };
    const cardStyle = { background: '#2d3748', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem', position: 'relative' };
    const removeBtnStyle = { position: 'absolute', top: '0.5rem', right: '0.5rem', background: '#e53e3e', color: 'white', border: 'none', borderRadius: '4px', padding: '0.2rem 0.5rem', cursor: 'pointer' };

    return (
        <form onSubmit={handleSave} style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gap: '2rem' }}>
            <h2 style={{ borderBottom: '1px solid #333', paddingBottom: '1rem' }}>Website Configuration</h2>

            <div className="section">
                <h3>Hero Section</h3>
                <label style={labelStyle}>Hero Title</label>
                <input name="heroTitle" value={config.heroTitle || ''} onChange={handleChange} style={inputStyle} />

                <label style={labelStyle}>Hero Subtitle</label>
                <input name="heroSubtitle" value={config.heroSubtitle || ''} onChange={handleChange} style={inputStyle} />
            </div>

            <div className="section">
                <h3>Contact Info</h3>
                <label style={labelStyle}>Support Email</label>
                <input name="contactEmail" value={config.contactEmail || ''} onChange={handleChange} style={inputStyle} />

                <label style={labelStyle}>Phone Number</label>
                <input name="contactPhone" value={config.contactPhone || ''} onChange={handleChange} style={inputStyle} />
            </div>

            <div className="section">
                <h3>Home Stats</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>Students</label>
                        <input name="statStudents" value={config.statStudents || ''} onChange={handleChange} style={inputStyle} placeholder="12,000+" />
                    </div>
                    <div>
                        <label style={labelStyle}>Earnings</label>
                        <input name="statEarnings" value={config.statEarnings || ''} onChange={handleChange} style={inputStyle} placeholder="₹3.5Cr+" />
                    </div>
                    <div>
                        <label style={labelStyle}>Satisfaction</label>
                        <input name="statRating" value={config.statRating || ''} onChange={handleChange} style={inputStyle} placeholder="4.9/5" />
                    </div>
                </div>
            </div>

            <div className="section">
                <h3>Mission Section</h3>
                <label style={labelStyle}>Mission Title</label>
                <input name="missionTitle" value={config.missionTitle || ''} onChange={handleChange} style={inputStyle} />

                <label style={labelStyle}>Mission Text</label>
                <textarea name="missionText" value={config.missionText || ''} onChange={handleChange} style={{ ...inputStyle, height: '80px' }} />
            </div>

            <div className="section">
                <h3>About Us Page - Hero</h3>
                <label style={labelStyle}>About Hero Title</label>
                <input name="aboutHeroTitle" value={config.aboutHeroTitle || ''} onChange={handleChange} style={inputStyle} />
                <label style={labelStyle}>About Hero Description</label>
                <textarea name="aboutHeroDesc" value={config.aboutHeroDesc || ''} onChange={handleChange} style={{ ...inputStyle, height: '80px' }} />
            </div>

            <div className="section">
                <h3>About Us Page - Story</h3>
                <label style={labelStyle}>About Story Title</label>
                <input name="aboutStoryTitle" value={config.aboutStoryTitle || ''} onChange={handleChange} style={inputStyle} />
                <label style={labelStyle}>About Story Description</label>
                <textarea name="aboutStoryDesc" value={config.aboutStoryDesc || ''} onChange={handleChange} style={{ ...inputStyle, height: '100px' }} />
            </div>

            <div className="section">
                <h3>About Us Page - Founders</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div style={cardStyle}>
                        <h4>Founder</h4>
                        <label style={labelStyle}>Name</label>
                        <input name="founderName" value={config.founderName || ''} onChange={handleChange} style={inputStyle} />
                        <label style={labelStyle}>Role</label>
                        <input name="founderRole" value={config.founderRole || ''} onChange={handleChange} style={inputStyle} />
                        <label style={labelStyle}>Image URL</label>
                        <input name="founderImage" value={config.founderImage || ''} onChange={handleChange} style={inputStyle} />
                        <label style={labelStyle}>Description</label>
                        <textarea name="founderDesc" value={config.founderDesc || ''} onChange={handleChange} style={{ ...inputStyle, height: '80px' }} />

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                            <div>
                                <label style={labelStyle}>Social 1 Icon (e.g. fab fa-youtube)</label>
                                <input name="founderSocial1Icon" value={config.founderSocial1Icon || ''} onChange={handleChange} style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Social 1 URL</label>
                                <input name="founderSocial1Url" value={config.founderSocial1Url || ''} onChange={handleChange} style={inputStyle} />
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                            <div>
                                <label style={labelStyle}>Social 2 Icon (e.g. fab fa-instagram)</label>
                                <input name="founderSocial2Icon" value={config.founderSocial2Icon || ''} onChange={handleChange} style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Social 2 URL</label>
                                <input name="founderSocial2Url" value={config.founderSocial2Url || ''} onChange={handleChange} style={inputStyle} />
                            </div>
                        </div>
                    </div>
                    <div style={cardStyle}>
                        <h4>Co-Founder</h4>
                        <label style={labelStyle}>Name</label>
                        <input name="coFounderName" value={config.coFounderName || ''} onChange={handleChange} style={inputStyle} />
                        <label style={labelStyle}>Role</label>
                        <input name="coFounderRole" value={config.coFounderRole || ''} onChange={handleChange} style={inputStyle} />
                        <label style={labelStyle}>Image URL</label>
                        <input name="coFounderImage" value={config.coFounderImage || ''} onChange={handleChange} style={inputStyle} />
                        <label style={labelStyle}>Description</label>
                        <textarea name="coFounderDesc" value={config.coFounderDesc || ''} onChange={handleChange} style={{ ...inputStyle, height: '80px' }} />

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                            <div>
                                <label style={labelStyle}>Social 1 Icon (e.g. fab fa-linkedin)</label>
                                <input name="coFounderSocial1Icon" value={config.coFounderSocial1Icon || ''} onChange={handleChange} style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Social 1 URL</label>
                                <input name="coFounderSocial1Url" value={config.coFounderSocial1Url || ''} onChange={handleChange} style={inputStyle} />
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                            <div>
                                <label style={labelStyle}>Social 2 Icon (e.g. fab fa-github)</label>
                                <input name="coFounderSocial2Icon" value={config.coFounderSocial2Icon || ''} onChange={handleChange} style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Social 2 URL</label>
                                <input name="coFounderSocial2Url" value={config.coFounderSocial2Url || ''} onChange={handleChange} style={inputStyle} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section">
                <h3>About Us Page - Stats</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    <div style={cardStyle}>
                        <label style={labelStyle}>Stat 1 Number</label>
                        <input name="aboutStat1Number" value={config.aboutStat1Number || ''} onChange={handleChange} style={inputStyle} />
                        <label style={labelStyle}>Stat 1 Label</label>
                        <input name="aboutStat1Label" value={config.aboutStat1Label || ''} onChange={handleChange} style={inputStyle} />
                    </div>
                    <div style={cardStyle}>
                        <label style={labelStyle}>Stat 2 Number</label>
                        <input name="aboutStat2Number" value={config.aboutStat2Number || ''} onChange={handleChange} style={inputStyle} />
                        <label style={labelStyle}>Stat 2 Label</label>
                        <input name="aboutStat2Label" value={config.aboutStat2Label || ''} onChange={handleChange} style={inputStyle} />
                    </div>
                    <div style={cardStyle}>
                        <label style={labelStyle}>Stat 3 Number</label>
                        <input name="aboutStat3Number" value={config.aboutStat3Number || ''} onChange={handleChange} style={inputStyle} />
                        <label style={labelStyle}>Stat 3 Label</label>
                        <input name="aboutStat3Label" value={config.aboutStat3Label || ''} onChange={handleChange} style={inputStyle} />
                    </div>
                </div>
            </div>

            <div className="section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3>Features</h3>
                    <button type="button" onClick={addFeature} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>+ Add Feature</button>
                </div>
                {features.map((item, index) => (
                    <div key={index} style={cardStyle}>
                        <button type="button" onClick={() => removeFeature(index)} style={removeBtnStyle}>×</button>
                        <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1rem' }}>
                            <div>
                                <label style={labelStyle}>Icon</label>
                                <input value={item.icon || ''} onChange={(e) => updateFeature(index, 'icon', e.target.value)} style={{ ...inputStyle, textAlign: 'center' }} placeholder="🚀" />
                            </div>
                            <div>
                                <label style={labelStyle}>Title</label>
                                <input value={item.title || ''} onChange={(e) => updateFeature(index, 'title', e.target.value)} style={inputStyle} placeholder="Feature Title" />
                            </div>
                        </div>
                        <label style={labelStyle}>Description</label>
                        <textarea value={item.text || ''} onChange={(e) => updateFeature(index, 'text', e.target.value)} style={{ ...inputStyle, height: '60px', marginBottom: 0 }} placeholder="Feature description..." />
                    </div>
                ))}
            </div>

            {/* Dynamic FAQs Editor */}
            <div className="section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3>Global FAQs</h3>
                    <button type="button" onClick={addFaq} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>+ Add FAQ</button>
                </div>
                {faqs.map((item, index) => (
                    <div key={index} style={cardStyle}>
                        <button type="button" onClick={() => removeFaq(index)} style={removeBtnStyle}>×</button>
                        <label style={labelStyle}>Question</label>
                        <input value={item.question || ''} onChange={(e) => updateFaq(index, 'question', e.target.value)} style={inputStyle} placeholder="Ask me anything..." />

                        <label style={labelStyle}>Answer</label>
                        <textarea value={item.answer || ''} onChange={(e) => updateFaq(index, 'answer', e.target.value)} style={{ ...inputStyle, height: '60px', marginBottom: 0 }} placeholder="Here is the answer..." />
                    </div>
                ))}
            </div>

            <div className="section">
                <h3>Payments</h3>
                <label style={labelStyle}>UPI QR Code Image URL</label>
                <input name="paymentQRCodeUrl" value={config.paymentQRCodeUrl || ''} onChange={handleChange} style={inputStyle} placeholder="https://..." />
            </div>

            <div className="section">
                <h3>Footer</h3>
                <label style={labelStyle}>Copyright Text</label>
                <input name="footerText" value={config.footerText || ''} onChange={handleChange} style={inputStyle} />
            </div>

            <button className="btn-primary" style={{ padding: '1rem', fontSize: '1.1rem' }}>Save All Changes</button>
            <div style={{ height: '4rem' }}></div>
        </form>
    );
};

export default ConfigEditor;

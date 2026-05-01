import React, { useState } from 'react';

const PackageForm = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState(initialData || {
        title: '', description: '', price: '', originalPrice: '',
        duration: '', level: 'Gold', badge: '', imageUrl: '',
        studentCount: 0, rating: 5.0, isHighlighted: false,
        modules: [], faqs: [], testimonials: [], promoCodes: [],
        slotLimit: 50, enrolledCount: 0,
        hasCertificate: true,
        certificateType: 'Verified Included',
        offerText: ''
    });

    const [activeTab, setActiveTab] = useState('basic');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Generic list handler
    const handleListChange = (field, index, key, value) => {
        const list = [...formData[field]];
        list[index] = { ...list[index], [key]: value };
        setFormData({ ...formData, [field]: list });
    };

    const addListItem = (field, template) => {
        setFormData({ ...formData, [field]: [...formData[field], template] });
    };

    const removeListItem = (field, index) => {
        const list = [...formData[field]];
        list.splice(index, 1);
        setFormData({ ...formData, [field]: list });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const tabStyle = (tab) => ({
        padding: '0.75rem 1.5rem',
        cursor: 'pointer',
        borderBottom: activeTab === tab ? '2px solid var(--color-primary)' : '2px solid transparent',
        color: activeTab === tab ? 'white' : 'rgba(255,255,255,0.6)',
        fontWeight: activeTab === tab ? 'bold' : 'normal'
    });

    return (
        <form onSubmit={handleSubmit} style={{ background: 'var(--color-surface)', padding: '2rem', borderRadius: '1rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{initialData ? 'Edit Package' : 'Create New Package'}</h2>

            <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #333', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div onClick={() => setActiveTab('basic')} style={tabStyle('basic')}>Basic Info</div>
                <div onClick={() => setActiveTab('modules')} style={tabStyle('modules')}>Modules</div>
                <div onClick={() => setActiveTab('faqs')} style={tabStyle('faqs')}>FAQs</div>
                <div onClick={() => setActiveTab('testimonials')} style={tabStyle('testimonials')}>Testimonials</div>
                <div onClick={() => setActiveTab('promo')} style={tabStyle('promo')}>Promo Codes</div>
            </div>

            {activeTab === 'basic' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <label>
                        Title <input name="title" value={formData.title} onChange={handleChange} required style={inputStyle} />
                    </label>
                    <label>
                        Description <input name="description" value={formData.description} onChange={handleChange} required style={inputStyle} />
                    </label>
                    <label>
                        Price <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required style={inputStyle} />
                    </label>
                    <label>
                        Original Price <input name="originalPrice" type="number" step="0.01" value={formData.originalPrice} onChange={handleChange} style={inputStyle} />
                    </label>
                    <label>
                        Duration <input name="duration" value={formData.duration} onChange={handleChange} style={inputStyle} />
                    </label>
                    <label>
                        Level
                        <select name="level" value={formData.level} onChange={handleChange} style={inputStyle}>
                            <option value="Gold">Gold</option>
                            <option value="Diamond">Diamond</option>
                            <option value="Platinum">Platinum</option>
                        </select>
                    </label>
                    <label>
                        Badge <input name="badge" value={formData.badge} onChange={handleChange} style={inputStyle} />
                    </label>
                    <label>
                        Image URL <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} required style={inputStyle} />
                    </label>
                    <label>
                        Slot Limit <input name="slotLimit" type="number" value={formData.slotLimit} onChange={handleChange} style={inputStyle} />
                    </label>
                    <label>
                        Enrolled Count <input name="enrolledCount" type="number" value={formData.enrolledCount} onChange={handleChange} style={inputStyle} />
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input name="hasCertificate" type="checkbox" checked={formData.hasCertificate} onChange={handleChange} /> Provide Certificate?
                    </label>
                    {formData.hasCertificate && (
                        <label>
                            Certificate Type <input name="certificateType" value={formData.certificateType} onChange={handleChange} placeholder="e.g. Verified Included" style={inputStyle} />
                        </label>
                    )}
                    <label className="full-width">
                        Limited Time Offer Text <input name="offerText" value={formData.offerText} onChange={handleChange} placeholder="🔥 Limited Time Offer: Only 7 seats left" style={inputStyle} />
                    </label>
                    <label>
                        Students (Display) <input name="studentCount" type="number" value={formData.studentCount} onChange={handleChange} style={inputStyle} />
                    </label>
                    <label>
                        Rating <input name="rating" type="number" step="0.1" value={formData.rating} onChange={handleChange} style={inputStyle} />
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input type="checkbox" name="isHighlighted" checked={formData.isHighlighted} onChange={handleChange} /> Highlight as Popular
                    </label>
                </div>
            )}

            {activeTab === 'modules' && (
                <div>
                    {formData.modules.map((module, i) => (
                        <div key={i} style={{ background: '#1e293b', padding: '1rem', marginBottom: '1rem', borderRadius: '0.5rem', border: '1px solid #333' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <h4>Module {i + 1}</h4>
                                <button type="button" onClick={() => removeListItem('modules', i)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                            </div>
                            <input placeholder="Module Title" value={module.title} onChange={e => handleListChange('modules', i, 'title', e.target.value)} style={{ ...inputStyle, marginBottom: '0.5rem' }} />
                            <textarea placeholder="Module Content" value={module.content} onChange={e => handleListChange('modules', i, 'content', e.target.value)} style={{ ...inputStyle, height: '80px' }} />
                        </div>
                    ))}
                    <button type="button" onClick={() => addListItem('modules', { title: '', content: '' })} className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>+ Add Module</button>
                </div>
            )}

            {activeTab === 'faqs' && (
                <div>
                    {formData.faqs.map((faq, i) => (
                        <div key={i} style={{ background: '#1e293b', padding: '1rem', marginBottom: '1rem', borderRadius: '0.5rem', border: '1px solid #333' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <h4>Question {i + 1}</h4>
                                <button type="button" onClick={() => removeListItem('faqs', i)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                            </div>
                            <input placeholder="Question" value={faq.question} onChange={e => handleListChange('faqs', i, 'question', e.target.value)} style={{ ...inputStyle, marginBottom: '0.5rem' }} />
                            <textarea placeholder="Answer" value={faq.answer} onChange={e => handleListChange('faqs', i, 'answer', e.target.value)} style={{ ...inputStyle, height: '60px' }} />
                        </div>
                    ))}
                    <button type="button" onClick={() => addListItem('faqs', { question: '', answer: '' })} className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>+ Add FAQ</button>
                </div>
            )}

            {activeTab === 'testimonials' && (
                <div>
                    {formData.testimonials.map((t, i) => (
                        <div key={i} style={{ background: '#1e293b', padding: '1rem', marginBottom: '1rem', borderRadius: '0.5rem', border: '1px solid #333' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <h4>Testimonial {i + 1}</h4>
                                <button type="button" onClick={() => removeListItem('testimonials', i)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <select value={t.type || 'text'} onChange={e => handleListChange('testimonials', i, 'type', e.target.value)} style={inputStyle}>
                                    <option value="text">Just Text Review</option>
                                    <option value="image">Screenshot (Image)</option>
                                    <option value="video">Video (YouTube/Link)</option>
                                </select>
                                {(t.type === 'image' || t.type === 'text') && (
                                    <input placeholder={t.type === 'image' ? "Screenshot URL" : "Profile Photo (Optional)"} value={t.imageUrl} onChange={e => handleListChange('testimonials', i, 'imageUrl', e.target.value)} style={inputStyle} />
                                )}
                                {(t.type === 'image' || t.type === 'video') && (
                                    <select value={t.aspectRatio || '16:9'} onChange={e => handleListChange('testimonials', i, 'aspectRatio', e.target.value)} style={inputStyle}>
                                        <option value="16:9">Horizontal (16:9)</option>
                                        <option value="9:16">Vertical / Shorts (9:16)</option>
                                        <option value="1:1">Square (1:1)</option>
                                    </select>
                                )}
                            </div>
                            {t.type === 'video' && (
                                <input placeholder="Video URL (YouTube/Direct)" value={t.videoUrl} onChange={e => handleListChange('testimonials', i, 'videoUrl', e.target.value)} style={{ ...inputStyle, marginBottom: '0.5rem' }} />
                            )}
                            <textarea placeholder={t.type === 'image' ? "Caption (Optional)" : "Testimonial Content"} value={t.content} onChange={e => handleListChange('testimonials', i, 'content', e.target.value)} style={{ ...inputStyle, height: '60px' }} />
                        </div>
                    ))}
                    <button type="button" onClick={() => addListItem('testimonials', { studentName: 'Student', role: 'Learner', imageUrl: '', content: '', type: 'text', videoUrl: '' })} className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>+ Add Testimonial</button>
                </div>
            )}

            {activeTab === 'promo' && (
                <div>
                    {formData.promoCodes?.map((p, i) => (
                        <div key={i} style={{ background: '#1e293b', padding: '1rem', marginBottom: '1rem', borderRadius: '0.5rem', border: '1px solid #333' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <h4>Promo Code {i + 1}</h4>
                                <button type="button" onClick={() => removeListItem('promoCodes', i)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <input placeholder="CODE (e.g. SAVE20)" value={p.code} onChange={e => handleListChange('promoCodes', i, 'code', e.target.value)} style={inputStyle} />
                                <input placeholder="Discount Amount (e.g. 500)" type="number" value={p.discountAmount} onChange={e => handleListChange('promoCodes', i, 'discountAmount', parseFloat(e.target.value))} style={inputStyle} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <label style={{ fontSize: '0.8rem', opacity: 0.7 }}>Limit (0=unlimited) <input type="number" value={p.useLimit || 0} onChange={e => handleListChange('promoCodes', i, 'useLimit', parseInt(e.target.value))} style={inputStyle} /></label>
                                <label style={{ fontSize: '0.8rem', opacity: 0.7 }}>Used <input type="number" value={p.usedCount || 0} onChange={e => handleListChange('promoCodes', i, 'usedCount', parseInt(e.target.value))} style={inputStyle} /></label>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => addListItem('promoCodes', { code: '', discountAmount: 0, useLimit: 0, usedCount: 0 })} className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>+ Add Promo Code</button>
                </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', borderTop: '1px solid #333', paddingTop: '1.5rem' }}>
                <button type="submit" className="btn-primary">Save Package</button>
                <button type="button" onClick={onCancel} style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid white', color: 'white', cursor: 'pointer', borderRadius: '50px' }}>Cancel</button>
            </div>
        </form>
    );
};

const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    background: '#0f172a',
    border: '1px solid #333',
    color: 'white',
    borderRadius: '0.5rem',
    marginTop: '0.25rem'
};

export default PackageForm;

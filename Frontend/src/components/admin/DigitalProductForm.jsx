import React, { useState } from 'react';

const DigitalProductForm = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState(initialData || {
        title: '', description: '', price: '', originalPrice: '',
        imageUrl: '', category: 'eBook', rating: 5.0, reviewCount: 0,
        fileType: 'PDF', fileSize: '', features: [], buyUrl: '',
        promoCodes: [],
        hasCertificate: false,
        certificateType: ''
    });

    const [activeTab, setActiveTab] = useState('basic');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const addFeature = () => {
        setFormData({ ...formData, features: [...formData.features, ''] });
    };

    const removeFeature = (index) => {
        const newFeatures = [...formData.features];
        newFeatures.splice(index, 1);
        setFormData({ ...formData, features: newFeatures });
    };

    const handlePromoChange = (index, key, value) => {
        const newPromos = [...formData.promoCodes];
        newPromos[index] = { ...newPromos[index], [key]: value };
        setFormData({ ...formData, promoCodes: newPromos });
    };

    const addPromo = () => {
        setFormData({ ...formData, promoCodes: [...formData.promoCodes, { code: '', discountAmount: 0, useLimit: 0, usedCount: 0 }] });
    };

    const removePromo = (index) => {
        const newPromos = [...formData.promoCodes];
        newPromos.splice(index, 1);
        setFormData({ ...formData, promoCodes: newPromos });
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
            <h2 style={{ marginBottom: '1.5rem' }}>{initialData ? 'Edit Digital Product' : 'Create New Digital Product'}</h2>

            <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #333', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div onClick={() => setActiveTab('basic')} style={tabStyle('basic')}>Basic Info</div>
                <div onClick={() => setActiveTab('features')} style={tabStyle('features')}>Features</div>
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
                        Category <input name="category" value={formData.category} onChange={handleChange} placeholder="eBook, Toolkit, etc." style={inputStyle} />
                    </label>
                    <label>
                        Image URL <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} required style={inputStyle} />
                    </label>
                    <label>
                        File Type <input name="fileType" value={formData.fileType} onChange={handleChange} placeholder="PDF, ZIP, MP4" style={inputStyle} />
                    </label>
                    <label>
                        File Size <input name="fileSize" value={formData.fileSize} onChange={handleChange} placeholder="e.g. 15MB" style={inputStyle} />
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input name="hasCertificate" type="checkbox" checked={formData.hasCertificate} onChange={handleChange} /> Provide Certificate?
                    </label>
                    {formData.hasCertificate && (
                        <label>
                            Certificate Type <input name="certificateType" value={formData.certificateType} onChange={handleChange} placeholder="e.g. Verified Included" style={inputStyle} />
                        </label>
                    )}
                    <label>
                        Rating <input name="rating" type="number" step="0.1" value={formData.rating} onChange={handleChange} style={inputStyle} />
                    </label>
                    <label>
                        Reviews <input name="reviewCount" type="number" value={formData.reviewCount} onChange={handleChange} style={inputStyle} />
                    </label>
                    <label className="full-width">
                        Custom Buy URL (Optional) <input name="buyUrl" value={formData.buyUrl} onChange={handleChange} placeholder="Leave empty for default flow" style={inputStyle} />
                    </label>
                </div>
            )}

            {activeTab === 'features' && (
                <div>
                    {formData.features.map((feature, i) => (
                        <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <input value={feature} onChange={e => handleFeatureChange(i, e.target.value)} style={inputStyle} placeholder="Enterprise access, Lifetime updates, etc." />
                            <button type="button" onClick={() => removeFeature(i)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addFeature} className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>+ Add Feature</button>
                </div>
            )}

            {activeTab === 'promo' && (
                <div>
                    {formData.promoCodes?.map((p, i) => (
                        <div key={i} style={{ background: '#1e293b', padding: '1rem', marginBottom: '1rem', borderRadius: '0.5rem', border: '1px solid #333' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h4>Promo Code {i + 1}</h4>
                                <button type="button" onClick={() => removePromo(i)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <label>Code <input placeholder="e.g. SAVE50" value={p.code} onChange={e => handlePromoChange(i, 'code', e.target.value)} style={inputStyle} /></label>
                                <label>Discount (₹) <input type="number" placeholder="500" value={p.discountAmount} onChange={e => handlePromoChange(i, 'discountAmount', parseFloat(e.target.value))} style={inputStyle} /></label>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <label>Use Limit (0 = Unlimited) <input type="number" value={p.useLimit} onChange={e => handlePromoChange(i, 'useLimit', parseInt(e.target.value))} style={inputStyle} /></label>
                                <label>Already Used <input type="number" value={p.usedCount} onChange={e => handlePromoChange(i, 'usedCount', parseInt(e.target.value))} style={inputStyle} /></label>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={addPromo} className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>+ Add Promo Code</button>
                </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', borderTop: '1px solid #333', paddingTop: '1.5rem' }}>
                <button type="submit" className="btn-primary">Save Product</button>
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

export default DigitalProductForm;

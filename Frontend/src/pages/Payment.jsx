import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

function Payment() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [status, setStatus] = React.useState('idle');
    const [pkg, setPkg] = React.useState(null);
    const [config, setConfig] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [promoCode, setPromoCode] = React.useState('');
    const [appliedPromo, setAppliedPromo] = React.useState(null);
    const [promoError, setPromoError] = React.useState('');
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        transactionId: ''
    });

    useEffect(() => {
        const isDigitalProduct = id.startsWith('dp-');
        const numericId = isDigitalProduct ? id.replace('dp-', '') : id;
        const apiPath = isDigitalProduct ? 'digital-products' : 'packages';

        Promise.all([
            fetch(`${API_BASE_URL}/api/${apiPath}`).then(res => res.json()),
            fetch(`${API_BASE_URL}/api/config`).then(res => res.json())
        ])
            .then(([itemsData, configData]) => {
                const found = (itemsData || []).find(p => p.id === parseInt(numericId));
                setPkg(found);
                setConfig(configData);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handleApplyPromo = () => {
        setPromoError('');
        if (!promoCode || !pkg) return;

        const found = pkg.promoCodes?.find(p => p.code.toUpperCase() === promoCode.toUpperCase());
        if (found) {
            // Check use limit
            if (found.useLimit > 0 && found.usedCount >= found.useLimit) {
                setPromoError('This promo code has reached its maximum usage limit');
                setAppliedPromo(null);
                return;
            }
            setAppliedPromo(found);
            setPromoCode('');
        } else {
            setPromoError('Invalid promo code');
            setAppliedPromo(null);
        }
    };

    // REPLACE THIS WITH YOUR GOOGLE APPS SCRIPT URL
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzVwwYYacfn5IaP5PSiGQQhNYBO6OQ59ZPxOkQbmEGBXKMhlJXvScRyC7HuPMUqyTiZ/exec";

    const handleSubmit = (e) => {
        e.preventDefault();

        const isDigitalProduct = id.startsWith('dp-');
        // 1. Open WhatsApp IMMEDIATELY (prevents popup blocker)
        const message = `*New ${isDigitalProduct ? 'Product Purchase' : 'Enrollment Request'}* 🚀\n\n` +
            `*${isDigitalProduct ? 'Product' : 'Package'}:* ${pkg.title}\n` +
            `*Student:* ${formData.name}\n` +
            `*Email:* ${formData.email}\n` +
            `*Phone:* ${formData.phone}\n` +
            `*Transaction ID:* ${formData.transactionId}\n` +
            `*Amount Paid:* ₹${finalPrice}\n` +
            (appliedPromo ? `*Promo Code Used:* ${appliedPromo.code}\n` : '') +
            `\nPlease verify my payment and grant access.`;

        const whatsappUrl = `https://wa.me/919014091291?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        setStatus('submitting');

        // 2. Prepare Data for Sheet
        const submissionData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            transactionId: formData.transactionId,
            item: pkg.title,
            type: id.startsWith('dp-') ? 'Digital Product' : 'Package',
            amount: finalPrice,
            promoCode: appliedPromo ? appliedPromo.code : '',
            date: new Date().toLocaleString()
        };

        // 3. Send to Google Sheet (Fire and Forget - Don't Await)
        fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain"
            },
            body: JSON.stringify(submissionData)
        }).then(() => {
            console.log("Data sent to sheet");
        }).catch(error => {
            console.error("Error saving to sheet", error);
        });

        // 4. Show success
        setStatus('success');
    };

    if (loading) return <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
    if (!pkg) return <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Item not found</div>;

    const finalPrice = appliedPromo ? Math.max(0, pkg.price - appliedPromo.discountAmount) : pkg.price;

    // Check if Sold Out
    const isSoldOut = !id.startsWith('dp-') && pkg.enrolledCount >= (pkg.slotLimit || 50);

    if (status === 'success') {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <div style={{ background: 'var(--color-surface)', padding: '3rem', borderRadius: '24px', textAlign: 'center', maxWidth: '500px', border: '1px solid #10b981' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Order Submitted!</h2>
                    <p style={{ opacity: 0.8, marginBottom: '2rem' }}>Thank you for your purchase. Our team will verify the transaction ID and send you the download link/access details within 2-4 hours via email/WhatsApp.</p>
                    <button className="btn-primary" onClick={() => navigate('/')}>Back to Home</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', padding: '6rem 2rem', background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.15), transparent), radial-gradient(circle at bottom left, rgba(168, 85, 247, 0.15), transparent)' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Complete Your <span className="highlight">Purchase</span></h1>
                    <p style={{ opacity: 0.7 }}>You are one step away from getting {pkg.title}</p>
                    {isSoldOut && <div style={{ color: '#ef4444', fontWeight: 'bold', marginTop: '1rem', fontSize: '1.2rem' }}>⚠️ This batch is currently SOLD OUT</div>}
                </div>

                <div className="payment-grid" style={{ display: isSoldOut ? 'none' : undefined }}>
                    {/* Left: QR & Instructions */}
                    <div style={{ background: 'var(--color-surface)', padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Scan & Pay</h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '2rem' }}>Scan the QR code below using any UPI app (GPay, PhonePe, Paytm) to pay the package fee.</p>

                        <div style={{ background: 'white', padding: '1rem', borderRadius: '20px', width: '100%', maxWidth: '350px', margin: '0 auto 2.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                            {config.paymentQRCodeUrl ? (
                                <img src={config.paymentQRCodeUrl} alt="UPI QR" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }} />
                            ) : (
                                <div style={{ width: '100%', aspectRatio: '1/1', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1f2937', borderRadius: '12px' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📱</div>
                                        <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>UPI QR CODE</div>
                                        <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Admin has not set QR</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                <span style={{ opacity: 0.7 }}>Package Fee</span>
                                <span style={{ fontWeight: 'bold', textDecoration: appliedPromo ? 'line-through' : 'none', opacity: appliedPromo ? 0.5 : 1 }}>₹{pkg.price}</span>
                            </div>

                            {appliedPromo && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', border: '1px dashed #10b981' }}>
                                    <span style={{ color: '#10b981' }}>Promo: {appliedPromo.code}</span>
                                    <span style={{ color: '#10b981' }}>-₹{appliedPromo.discountAmount}</span>
                                </div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--color-primary)' }}>
                                <span style={{ opacity: 0.7 }}>Total Amount</span>
                                <span style={{ fontWeight: 'bold', color: 'var(--color-accent)', fontSize: '1.2rem' }}>₹{finalPrice}</span>
                            </div>
                        </div>

                        {/* Promo Code Input */}
                        <div style={{ marginTop: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>Have a Promo Code?</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="text"
                                    placeholder="Enter Code"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    style={{ ...inputStyle, marginBottom: 0 }}
                                />
                                <button type="button" onClick={handleApplyPromo} className="btn-secondary" style={{ whiteSpace: 'nowrap', borderRadius: '12px' }}>Apply</button>
                            </div>
                            {promoError && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.5rem' }}>{promoError}</p>}
                        </div>
                    </div>

                    {/* Right: Submission Form */}
                    <div style={{ background: 'var(--color-surface)', padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Enter Details</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>Full Name</label>
                                <input
                                    required
                                    type="text"
                                    style={inputStyle}
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>Email Address</label>
                                <input
                                    required
                                    type="email"
                                    style={inputStyle}
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    style={inputStyle}
                                    placeholder="+91 XXXXX XXXXX"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>Transaction ID / UTR</label>
                                <input
                                    required
                                    type="text"
                                    style={inputStyle}
                                    placeholder="Enter UPI Reference Number"
                                    value={formData.transactionId}
                                    onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn-primary"
                                style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}
                                disabled={status === 'submitting'}
                            >
                                {status === 'submitting' ? 'Processing...' : 'Submit Payment Details'}
                            </button>
                        </form>
                    </div>
                </div>

                {isSoldOut && (
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <button className="btn-secondary" onClick={() => navigate('/packages')}>Browse Other Packages</button>
                    </div>
                )}
            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '0.8rem 1rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '1rem',
    outline: 'none'
};

export default Payment;

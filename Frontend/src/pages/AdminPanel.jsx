import React, { useState, useEffect } from 'react';
import Login from '../components/admin/Login';
import ConfigEditor from '../components/admin/ConfigEditor';
import PackageForm from '../components/admin/PackageForm';
import DigitalProductForm from '../components/admin/DigitalProductForm';
import API_BASE_URL from '../config';

const AdminPanel = () => {
    const [token, setToken] = useState(localStorage.getItem('adminToken'));
    const [view, setView] = useState('packages'); // packages | digital | config
    const [packages, setPackages] = useState([]);
    const [digitalProducts, setDigitalProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPackage, setCurrentPackage] = useState(null);
    const [currentDigitalProduct, setCurrentDigitalProduct] = useState(null);

    useEffect(() => {
        if (token) {
            fetchPackages();
            fetchDigitalProducts();
        }
    }, [token]);

    const fetchPackages = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/packages`);
            const data = await res.json();
            setPackages(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchDigitalProducts = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/digital-products`);
            const data = await res.json();
            setDigitalProducts(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogin = (newToken) => {
        setToken(newToken);
        localStorage.setItem('adminToken', newToken);
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('adminToken');
    };

    const handleSavePackage = async (packageData) => {
        const method = packageData.id ? 'PUT' : 'POST';
        const url = packageData.id
            ? `${API_BASE_URL}/api/packages/${packageData.id}`
            : `${API_BASE_URL}/api/packages`;

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(packageData)
        });

        setIsEditing(false);
        fetchPackages();
    };

    const handleSaveDigitalProduct = async (productData) => {
        const method = productData.id ? 'PUT' : 'POST';
        const url = productData.id
            ? `${API_BASE_URL}/api/digital-products/${productData.id}`
            : `${API_BASE_URL}/api/digital-products`;

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });

        setIsEditing(false);
        fetchDigitalProducts();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this package?")) {
            await fetch(`${API_BASE_URL}/api/packages/${id}`, { method: 'DELETE' });
            fetchPackages();
        }
    };

    const handleDeleteDigital = async (id) => {
        if (window.confirm("Delete this digital product?")) {
            await fetch(`${API_BASE_URL}/api/digital-products/${id}`, { method: 'DELETE' });
            fetchDigitalProducts();
        }
    };

    if (!token) return <Login onLogin={handleLogin} />;

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem' }}>Admin Dashboard</h1>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ background: '#1e293b', padding: '0.25rem', borderRadius: '0.5rem', display: 'flex' }}>
                        <button onClick={() => setView('packages')} style={navBtnStyle(view === 'packages')}>Packages</button>
                        <button onClick={() => setView('digital')} style={navBtnStyle(view === 'digital')}>Digital Products</button>
                        <button onClick={() => setView('config')} style={navBtnStyle(view === 'config')}>Site Config</button>
                    </div>
                    <button onClick={handleLogout} style={{ border: '1px solid white', background: 'transparent', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>Logout</button>
                </div>
            </div>

            {view === 'packages' ? (
                isEditing ? (
                    <PackageForm
                        initialData={currentPackage}
                        onSave={handleSavePackage}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                            <button className="btn-primary" onClick={() => { setCurrentPackage(null); setIsEditing(true); }}>+ Create New Package</button>
                        </div>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {packages.map(pkg => (
                                <div key={pkg.id} style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <img src={pkg.imageUrl} alt={pkg.title} style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '0.5rem' }} />
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ marginBottom: '0.5rem' }}>{pkg.title}</h3>
                                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', opacity: 0.7 }}>
                                            <span>Price: ₹{pkg.price}</span>
                                            <span>Students: {pkg.studentCount}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => { setCurrentPackage(pkg); setIsEditing(true); }} style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>Edit</button>
                                        <button onClick={() => handleDelete(pkg.id)} style={{ padding: '0.5rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            ) : view === 'digital' ? (
                isEditing ? (
                    <DigitalProductForm
                        initialData={currentDigitalProduct}
                        onSave={handleSaveDigitalProduct}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                            <button className="btn-primary" onClick={() => { setCurrentDigitalProduct(null); setIsEditing(true); }}>+ Create New Digital Product</button>
                        </div>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {digitalProducts.map(product => (
                                <div key={product.id} style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <img src={product.imageUrl} alt={product.title} style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '0.5rem' }} />
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ marginBottom: '0.5rem' }}>{product.title}</h3>
                                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', opacity: 0.7 }}>
                                            <span>Price: ₹{product.price}</span>
                                            <span>Category: {product.category}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => { setCurrentDigitalProduct(product); setIsEditing(true); }} style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>Edit</button>
                                        <button onClick={() => handleDeleteDigital(product.id)} style={{ padding: '0.5rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            ) : (
                <ConfigEditor />
            )}
        </div>
    );
};

const navBtnStyle = (isActive) => ({
    padding: '0.5rem 1.5rem',
    background: isActive ? 'var(--color-primary)' : 'transparent',
    color: 'white',
    border: 'none',
    borderRadius: '0.4rem',
    cursor: 'pointer',
    fontWeight: isActive ? 'bold' : 'normal'
});

export default AdminPanel;

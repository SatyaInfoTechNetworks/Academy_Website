import React, { useState } from 'react';
import API_BASE_URL from '../../config';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!res.ok) throw new Error("Invalid credentials");

            const data = await res.json();
            onLogin(data.token);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <form onSubmit={handleSubmit} style={{ background: 'var(--color-surface)', padding: '3rem', borderRadius: '1rem', width: '400px', display: 'grid', gap: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h2 style={{ textAlign: 'center' }}>Admin Login</h2>
                {error && <p style={{ color: '#ef4444', textAlign: 'center' }}>{error}</p>}

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
                    <input autoFocus value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', padding: '0.8rem', background: '#333', border: 'none', color: 'white', borderRadius: '0.5rem' }} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '0.8rem', background: '#333', border: 'none', color: 'white', borderRadius: '0.5rem' }} />
                </div>

                <button className="btn-primary" style={{ marginTop: '1rem' }}>Login</button>
            </form>
        </div>
    );
};

export default Login;

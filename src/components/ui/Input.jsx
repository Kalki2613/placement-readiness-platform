import React from 'react';

const Input = ({ label, helperText, error, ...props }) => {
    return (
        <div style={{ marginBottom: '24px' }}>
            {label && <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '8px' }}>{label}</label>}
            <input className="input-field" {...props} />
            {helperText && <p style={{ marginTop: '8px', fontSize: '0.75rem', color: 'rgba(0,0,0,0.5)' }}>{helperText}</p>}
            {error && <p style={{ marginTop: '4px', fontSize: '0.75rem', color: 'var(--accent-color)' }}>{error}</p>}
        </div>
    );
};

export default Input;

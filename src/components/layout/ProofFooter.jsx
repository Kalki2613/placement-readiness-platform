import React from 'react';

const ProofFooter = ({ items = [
    { id: 'ui', label: 'UI Built', completed: false },
    { id: 'logic', label: 'Logic Working', completed: false },
    { id: 'tests', label: 'Test Passed', completed: false },
    { id: 'deployed', label: 'Deployed', completed: false }
] }) => {
    return (
        <div className="proof-footer">
            <div style={{ display: 'flex', gap: 'var(--space-4)', width: '100%', alignItems: 'center' }}>
                {items.map(item => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                            type="checkbox"
                            checked={item.completed}
                            readOnly
                            style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--accent-color)' }}
                        />
                        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{item.label}</span>
                    </div>
                ))}
                <div style={{ marginLeft: 'auto' }}>
                    <button className="btn-primary" style={{ padding: '8px 24px' }}>Verify & Continue</button>
                </div>
            </div>
        </div>
    );
};

export default ProofFooter;

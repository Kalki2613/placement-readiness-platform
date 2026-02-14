import React from 'react';

const ContextHeader = ({ title = "Step Title", subtitle = "Description of the current step goes here." }) => {
    return (
        <div className="context-header">
            <h1 style={{ marginBottom: '8px' }}>{title}</h1>
            <p style={{ color: 'rgba(0,0,0,0.6)', maxWidth: '720px' }}>{subtitle}</p>
        </div>
    );
};

export default ContextHeader;

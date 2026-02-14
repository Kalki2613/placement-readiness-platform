import React from 'react';

const TopBar = ({ projectName = "KodNest Premium Build System", currentStep = 1, totalSteps = 4, status = "In Progress" }) => {
    return (
        <div className="top-bar">
            <div className="project-name" style={{ fontWeight: 600, fontSize: '1.25rem' }}>
                {projectName}
            </div>
            <div className="progress-indicator" style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                Step {currentStep} / {totalSteps}
            </div>
            <div className="status-badge">
                <span style={{
                    padding: '4px 12px',
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    {status}
                </span>
            </div>
        </div>
    );
};

export default TopBar;

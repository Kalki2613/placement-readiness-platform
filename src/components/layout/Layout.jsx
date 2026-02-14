import React from 'react';
import TopBar from './TopBar';
import ContextHeader from './ContextHeader';
import ProofFooter from './ProofFooter';

const Layout = ({ children, title, subtitle, sidebar }) => {
    return (
        <div className="layout-wrapper">
            <TopBar />
            <ContextHeader title={title} subtitle={subtitle} />
            <main className="main-container">
                <section className="primary-workspace">
                    {children}
                </section>
                <aside className="secondary-panel">
                    {sidebar}
                </aside>
            </main>
            <ProofFooter />
        </div>
    );
};

export default Layout;

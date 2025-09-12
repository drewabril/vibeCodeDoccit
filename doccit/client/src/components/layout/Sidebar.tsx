import React from 'react';

const Sidebar: React.FC<{ sidebarContent: string }> = ({ sidebarContent }) => {
    return (
        <div className="sidebar">
            <div className="sidebar-content" dangerouslySetInnerHTML={{ __html: sidebarContent }} />
        </div>
    );
};

export default Sidebar;
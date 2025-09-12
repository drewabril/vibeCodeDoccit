import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="header">
            <h1 className="logo">Doccit</h1>
            <nav className="navigation">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/subreddits">Subreddits</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
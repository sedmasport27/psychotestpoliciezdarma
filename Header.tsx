
import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('home');

    const handleScroll = () => {
        const sections = document.querySelectorAll<HTMLElement>('main > section');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id') || '';
            }
        });
        setActiveLink(current);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#home', label: 'Úvod' },
        { href: '#test-overview', label: 'Přehled Testů' },
        { href: '#interactive-training', label: 'Interaktivní Trénink' },
        { href: '#interview-prep', label: 'Příprava na Rozhovor' },
        { href: '#results-history', label: 'Historie Výsledků' },
    ];
    
    const NavLink: React.FC<{ href: string, label: string }> = ({ href, label }) => (
        <a 
            href={href} 
            className={`transition-colors border-b-2 pb-1 ${activeLink === href.substring(1) ? 'text-[#0056b3] border-[#0056b3]' : 'text-gray-700 border-transparent hover:text-[#0056b3]'}`}
            onClick={() => setMobileMenuOpen(false)}
        >
            {label}
        </a>
    );

    return (
        <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-40">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">Psychotesty Nanečisto</h1>
                <div className="hidden md:flex space-x-8">
                    {navLinks.map(link => <NavLink key={link.href} {...link} />)}
                </div>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-700 focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                    </svg>
                </button>
            </nav>
            {mobileMenuOpen && (
                <div className="md:hidden px-6 pb-4">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">{link.label}</a>
                    ))}
                </div>
            )}
        </header>
    );
};

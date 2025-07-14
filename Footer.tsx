
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white mt-16">
            <div className="container mx-auto px-6 py-8">
                <div className="text-center text-sm text-gray-400 border border-gray-700 rounded-lg p-4">
                    <h4 className="font-bold text-base text-gray-200 mb-2">Důležité upozornění</h4>
                    <p>Tato aplikace slouží výhradně k informačním a tréninkovým účelům. Simulace testů jsou vytvořeny na základě veřejně dostupných informací a nemusí přesně odpovídat aktuální podobě testů používaných Policií ČR. Aplikace nenahrazuje skutečné psychodiagnostické vyšetření a její výsledky jsou pouze orientační. Úspěch v této aplikaci nezaručuje úspěch u skutečného výběrového řízení. Použité názvy testů (d2-R, Amthauerův test, MMPI, FIRO) jsou ochrannými známkami příslušných vlastníků a tato aplikace není s nimi oficiálně spojena.</p>
                </div>
                <div className="text-center text-gray-500 text-sm pt-6">
                    &copy; {new Date().getFullYear()} Psychotesty Nanečisto. Všechna práva vyhrazena.
                </div>
            </div>
        </footer>
    );
};

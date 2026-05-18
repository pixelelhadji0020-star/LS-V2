import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-ls-black border-t border-gray-900 py-6 px-4 text-center mt-auto">
            <p className="text-xs text-gray-500 tracking-widest">
                &copy; {new Date().getFullYear()} LA_SOLUTION (LS). TOUS DROITS RÉSERVÉS.
            </p>
        </footer>
    );
};
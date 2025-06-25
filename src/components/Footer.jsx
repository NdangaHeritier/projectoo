import React from 'react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-white py-4 mt-8">
      <div className="sm:max-w-7xl max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center">
          <img src="/favicon.svg" alt="Projectoo Logo" className="h-8 w-8 mr-2" />
          <span className="text-lg font-semibold">Projectoo</span>         
        </div>
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-indigo-600 transition"
          >
            {/* Facebook SVG */}
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path d="M17 2.5h-2.5A4.5 4.5 0 0 0 10 7v2H7v3h3v7h3v-7h2.5l.5-3H13V7a1.5 1.5 0 0 1 1.5-1.5H17V2.5z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-blue-300 transition"
          >
            {/* Twitter SVG */}
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path d="M22 5.92a8.38 8.38 0 0 1-2.36.65A4.13 4.13 0 0 0 21.4 4.1a8.19 8.19 0 0 1-2.6 1A4.11 4.11 0 0 0 12 8.09c0 .32.04.64.1.94A11.65 11.65 0 0 1 3 4.89a4.11 4.11 0 0 0 1.27 5.48A4.07 4.07 0 0 1 2.8 9.5v.05a4.11 4.11 0 0 0 3.3 4.03 4.09 4.09 0 0 1-1.85.07 4.12 4.12 0 0 0 3.83 2.85A8.24 8.24 0 0 1 2 19.54a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22 5.92z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-pink-400 transition"
          >
            {/* Instagram SVG */}
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="17.5" cy="6.5" r="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
      <div className="sm:max-w-7xl max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between max-sm:flex-col gap-5 text-sm text-white">
        <span className="flex items-center bg-indigo-400/20 border border-indigo-400 rounded-md py-1 px-2">
          <GlobeAltIcon className="h-5 w-5 mr-2 text-white" />
          <span className=''>www.ndanga.dev</span>
        </span>
         <span className="text-sm">
            &copy; {new Date().getFullYear()} Ndanga. All rights reserved.
          </span>
      </div>
    </footer>
  );
};

export default Footer;
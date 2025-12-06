import React from 'react';

export const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export const CrossIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const TimerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.445l-7.416 4.02L6.064 15.134 0 9.306l8.332-1.151z" />
  </svg>
);


export const LeafIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0 1.172 1.953 1.172 5.119 0 7.072z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25V12" />
    </svg>
);

export const RulerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
    </svg>
);

export const GlobeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m-9 9a9 9 0 019-9" />
    </svg>
);

export const DinoHeadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.13 4.22a1.86 1.86 0 0 0-2.43-.59l-5.43 2.91-4.22-2.12a1.88 1.88 0 0 0-2.09.43L2.24 8.41a1.88 1.88 0 0 0 .58 2.74l3.16 1.76-2.6 4.9a1.88 1.88 0 0 0 .7 2.65l3.22 1.86a1.88 1.88 0 0 0 2.54-.42l3.4-4.83 5.3 2.11a1.88 1.88 0 0 0 2.27-1.11l1.24-3.32a1.88 1.88 0 0 0-1.12-2.27L17.4 12.8l2.32-3.13a1.88 1.88 0 0 0-.59-2.45zM8.1 11.53a1.13 1.13 0 1 1 0-2.26 1.13 1.13 0 0 1 0 2.26z"></path>
  </svg>
);

export const MascotDinoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <g fill="#4ade80">
      <path d="M 76.5 166 C 54.5 162 49 152 49 130 C 49 111 55 103 66 95 C 77 87 91 85 100 89 C 121 97 121 103 105 106 C 89 109 85 113 89 120 C 93 127 101 129 110 126 C 119 123 125 125 130 132 C 137 142 135 151 126 158 C 117 165 103 169 88 168" />
      <path d="M 103 89 C 103 77 107 60 112 50 C 120 34 133 26 148 29 C 158 31 164 38 165 47 C 166 56 161 68 153 74 C 145 80 134 81 125 78 C 115 75 109 77 109 84" />
      <circle cx="140" cy="55" r="5" fill="#1e293b" />
    </g>
  </svg>
);

export const SpeakerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
    </svg>
);

export const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-6h4v2h-4zm0-4h4v2h-4zm0-4h4v2h-4z"></path>
        <path d="M19.4 6.3c-1-1.5-2.6-2.5-4.4-2.8V2h-2v1.5c-1.8.3-3.4 1.3-4.4 2.8L7 8.5l1.6 1.2 1.2-2.1c.6-.4 1.3-.7 2.2-.8v8.2c-.9-.1-1.6-.4-2.2-.8l-1.2-2.1L7 15.5l1.6 2.2c1 1.5 2.6 2.5 4.4 2.8V22h2v-1.5c1.8-.3 3.4-1.3 4.4-2.8l1.4-2.2-1.6-1.2-1.2 2.1c-.6.4-1.3.7-2.2.8V8.8c.9.1 1.6.4 2.2.8l1.2 2.1 1.6-1.2-1.4-2.4z"></path>
        <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"></path>
        <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
    </svg>
);
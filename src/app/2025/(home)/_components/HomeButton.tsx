'use client';

import Link from 'next/link';
import { use } from 'react';

export default function BackHomeButton() {
  return (
    <Link href="/">
      <button style={{
        padding: '0.6rem 1.2rem',
        fontSize: '1rem',
        cursor: 'pointer',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#0070f3',
        color: 'white',
        transition: 'background-color 0.3s ease',
      }}
      onMouseOver={e => (e.currentTarget.style.backgroundColor = '#005bb5')}
      onMouseOut={e => (e.currentTarget.style.backgroundColor = '#0070f3')}
      >
        Home
      </button>
    </Link>
  );
}

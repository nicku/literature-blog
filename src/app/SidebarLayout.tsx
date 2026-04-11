'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import type { Lang } from '@/lib/i18n'

interface SidebarLayoutProps {
  lang: Lang
  children: React.ReactNode
}

export default function SidebarLayout({ lang, children }: SidebarLayoutProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Menu toggle - minimal, elegant */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed top-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          background: 'var(--paper)',
          boxShadow: '0 1px 3px var(--paper-shadow), 0 4px 12px -4px var(--paper-shadow)',
          border: '1px solid var(--border)',
          color: 'var(--accent)',
        }}
        aria-label="Open menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/15 backdrop-blur-sm transition-opacity duration-200"
          aria-label="Close menu"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-64 shrink-0 rounded-l-2xl transition-all duration-300 ease-out ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
        style={{
          borderLeft: '1px solid var(--border)',
          background: 'var(--paper)',
          boxShadow: '-4px 0 24px -4px var(--paper-shadow), -8px 0 48px -12px var(--paper-shadow)',
        }}
      >
        <div className="flex h-16 shrink-0 items-center justify-end px-5 pt-5">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: 'var(--background-accent)',
              border: '1px solid var(--border)',
              color: 'var(--foreground-muted)',
            }}
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="px-5 pb-8">
          <Sidebar lang={lang} onNavigate={() => setIsOpen(false)} />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 py-8 pr-[4.5rem] pl-4 sm:pr-20 sm:px-8">
        {children}
      </div>
    </div>
  )
}

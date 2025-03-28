'use client'

import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import CustomButton from "./CustomButton";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed w-full z-10 bg-white/80 backdrop-blur-md shadow-sm">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex justify-center items-center group">
          <Image
            src="/logo.svg"
            alt="logo"
            width={118}
            height={18}
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="flex items-center gap-6">
          <div className="relative" ref={dropdownRef}>
            <div 
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-200 hover:ring-primary-blue transition-all duration-300">
                <Image
                  src={session?.user?.image || '/default-avatar.png'}
                  alt="User Avatar"
                  width={50}
                  height={50}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-700">{session?.user?.name}</p>
                <p className="text-xs text-gray-500">{session?.user?.email}</p>
              </div>
            </div>

            {/* Dropdown Menu */}
            <div 
              className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 transition-all duration-300 ease-in-out transform ${
                isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-700">{session?.user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{session?.user?.email}</p>
              </div>
              <button
                onClick={() => signOut()}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors duration-200 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

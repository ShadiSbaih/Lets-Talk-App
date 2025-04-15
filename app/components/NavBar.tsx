'use client';
import { SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { navLinks } from '@/constants';
import { neobrutalism } from '@clerk/themes'
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className="flex justify-between items-center fixed z-50 w-full h-16 md:h-20 lg:h-28 bg-gray-200 px-4 md:px-6 lg:px-10 gap-2 md:gap-4 shadow-2xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 hover:scale-125 duration-500">
          <Image
            src="/DesignAssets/logo.svg"
            width={40}
            height={40}
            alt="Let's talk"
            className="w-8 h-8 md:w-10 md:h-10 lg:w-[60px] lg:h-[60px]"
          />
        </Link>

        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden p-2 rounded-lg hover:bg-blue-100"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Nav Links */}
        <section className="hidden md:flex justify-between text-black">
          <div className="flex flex-1 gap-2 lg:gap-6">
            {navLinks.map((item) => {
              const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
              
              return (
                <Link
                  href={item.route}
                  key={item.label}
                  className={cn(
                    'flex gap-2 md:gap-3 lg:gap-4 items-center p-2 md:p-3 lg:p-4 rounded-lg justify-start hover:scale-110 lg:hover:scale-125 duration-300',
                    isActive && 'bg-blue-100 rounded-3xl'
                  )}
                >
                  <Image
                    src={item.imgURL}
                    alt={item.label}
                    width={24}
                    height={24}
                    className="w-5 h-5 md:w-6 md:h-6 lg:w-[24px] lg:h-[24px]"
                  />
                  
                  <p className={cn(
                    "text-sm md:text-base lg:text-lg font-semibold hidden lg:block"
                  )}>
                    {item.label}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* User button for desktop */}
        <div className='hover:scale-125 duration-500 hidden md:block'>
          <SignedIn>
            <UserButton
              appearance={{
                baseTheme: neobrutalism,
                elements: {
                  userButtonAvatarBox: "h-10 w-10",
                  userButtonPopoverCard: "shadow-xl"
                }
              }}
            />
          </SignedIn>
        </div>
        
        {/* User button for mobile */}
        <div className='hover:scale-110 duration-500 md:hidden'>
          <SignedIn>
            <UserButton
              appearance={{
                baseTheme: neobrutalism,
                elements: {
                  userButtonAvatarBox: "h-8 w-8",
                  userButtonPopoverCard: "!absolute !top-16 !right-0 !left-0 !w-full !max-w-full !transform-none !rounded-t-none shadow-xl",
                  userButtonPopoverFooter: "!w-full",
                  userButtonPopoverActions: "!w-full"
                }
              }}
            />
          </SignedIn>
        </div>
      </nav>

      {/* Mobile Nav Menu */}
      {isMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-gray-100 z-40 shadow-lg md:hidden">
          <div className="flex flex-col p-4">
            {navLinks.map((item) => {
              const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
              
              return (
                <Link
                  href={item.route}
                  key={item.label}
                  onClick={toggleMenu}
                  className={cn(
                    'flex gap-3 items-center p-3 rounded-lg justify-start my-1 hover:bg-blue-50',
                    isActive && 'bg-blue-100'
                  )}
                >
                  <Image
                    src={item.imgURL}
                    alt={item.label}
                    width={20}
                    height={20}
                  />
                  <p className="text-base font-medium">{item.label}</p>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default NavBar
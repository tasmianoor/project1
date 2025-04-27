"use client";

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  disableStates?: boolean;
}

export default function Link({ href, children, className = '', disableStates = false }: LinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const baseStyles = "text-[16px] font-['Hepta_Slab'] transition-colors";
  const stateStyles = disableStates 
    ? { default: "text-gray-900", hover: "", active: "" }
    : {
        default: "text-gray-900",
        hover: "hover:text-gray-600",
        active: isActive ? "text-black font-medium underline" : ""
      };

  return (
    <NextLink 
      href={href} 
      className={`${baseStyles} ${stateStyles.default} ${stateStyles.hover} ${stateStyles.active} ${className}`}
    >
      {children}
    </NextLink>
  );
} 
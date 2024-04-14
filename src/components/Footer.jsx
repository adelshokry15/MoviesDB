import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[var(--black3)] py-10 relative z-0">
      <div className="flex flex-col items-center">
        <ul className="list-none flex items-center justify-center gap-5 mb-10 md:mb-20">
          <li className="transition-all ease-in duration-200 cursor-pointer text-xs md:text-base hover:text-[var(--pink)]">
            Terms Of Use
          </li>
          <li className="transition-all ease-in duration-200 cursor-pointer text-xs md:text-base hover:text-[var(--pink)]">
            Privacy-Policy
          </li>
          <li className="transition-all ease-in duration-200 cursor-pointer text-xs md:text-base hover:text-[var(--pink)]">
            About
          </li>
          <li className="transition-all ease-in duration-200 cursor-pointer text-xs md:text-base hover:text-[var(--pink)]">
            Blog
          </li>
          <li className="transition-all ease-in duration-200 cursor-pointer text-xs md:text-base hover:text-[var(--pink)]">
            FAQ
          </li>
        </ul>
        <div className="text-xs opacity-50 text-center max-w-full w-[800px] mb-10 md:text-base md:mb-16">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </div>
        <div className="flex items-center justify-center gap-4">
          <span className="w-12 h-12 rounded-full bg-black flex items-center justify-center cursor-pointer transition-all ease-in duration-300 hover:shadow-[var(--pink)] hover:text-[var(--pink)] hover:shadow-inner">
            <FaFacebookF />
          </span>
          <span className="w-12 h-12 rounded-full bg-black flex items-center justify-center cursor-pointer transition-all ease-in duration-300 hover:shadow-[var(--pink)] hover:text-[var(--pink)] hover:shadow-md">
            <FaInstagram />
          </span>
          <span className="w-12 h-12 rounded-full bg-black flex items-center justify-center cursor-pointer transition-all ease-in duration-300 hover:shadow-[var(--pink)] hover:text-[var(--pink)] hover:shadow-inner">
            <FaTwitter />
          </span>
          <span className="w-12 h-12 rounded-full bg-black flex items-center justify-center cursor-pointer transition-all ease-in duration-300 hover:shadow-[var(--pink)] hover:text-[var(--pink)] hover:shadow-md">
            <FaLinkedin />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

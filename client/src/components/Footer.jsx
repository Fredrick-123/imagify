import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from '../assets/assets'

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 mt-20 bg-gray-100">
      
      <img
        onClick={() => navigate("/")}
        src= {assets.logo}
        width={150}
        alt="logo"
        className="cursor-pointer"
      />

      <p className="text-sm text-gray-600 text-center sm:text-left flex-1 border-t sm:border-t-0 sm:border-l border-gray-400 pt-2 sm:pt-0 sm:pl-4">
        © {new Date().getFullYear()} imagify.dev | All Rights Reserved.
      </p>

      <div className="flex gap-4">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
            width={30}
            alt="GitHub"
            className="hover:opacity-75 transition"
          />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
            width={30}
            alt="LinkedIn"
            className="hover:opacity-75 transition"
          />
        </a>

        <a href="#">
          <img
            src="https://www.svgrepo.com/show/223047/gmail.svg"
            width={30}
            alt="Gmail"
            className="hover:opacity-75 transition"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;

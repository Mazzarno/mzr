"use client";

import ThemeSwitcher from "@/components/ThemeSwitch";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  Menu,
  X,
  Palette,
  Laptop,
  Mail,
  PanelsTopLeft,
  Box,
  FileUser,
} from "lucide-react";

export default function Navbar() {
  return (
    <>
      <div className="drawer drawer-end">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="navbar fixed top-0 z-10 w-full">
            <ul className="menu menu-horizontal w-full grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-11 gap-x-2 justify-items-center">
              <li className="flex justify-center items-center lg:col-start-2 xl:col-start-3 2xl:col-start-4 menu-title">
                <a className="menu-title text-base-content">
                  <Logo />
                </a>
              </li>
              <li className="hidden md:flex justify-center items-center ">
                <details className="dropdown link">
                  <summary>Websites</summary>
                  <ul className="bg-base rounded-t-none p-2">
                    <li>
                      <a>Portfolio</a>
                    </li>
                    <li>
                      <a>Vitrine</a>
                    </li>
                    <li>
                      <a>3D</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li className="hidden md:flex justify-center items-center ">
                <a>Contact</a>
              </li>
              <li className="flex justify-center items-center ">
                <LanguageSwitcher />
              </li>
              <li className="hidden md:flex justify-center items-center">
                <a className="menu-title text-base-content">
                  <ThemeSwitcher />
                </a>
              </li>
              <li className="flex justify-center items-center md:hidden">
                <label
                  htmlFor="my-drawer"
                  className="btn btn-circle btn-ghost swap swap-rotate drawer-button"
                >
                  <input
                    id="my-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <Menu className="swap-off" />
                  <X className="swap-on" />
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className="drawer-side z-10">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu bg-base-200 min-h-full w-80 p-8 grid grid-rows-[auto_1fr_auto]">
            <div className="flex items-center justify-between">
              <div>
                <a className="menu-title text-base-content">
                  <Logo />
                </a>
              </div>
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              >
                <div className="btn btn-circle">
                  <X size={20} />
                </div>
              </label>
            </div>
            <div className="flex items-center justify-center">
              <ul className="">
                <li>
                  <a className="flex items-center justify-center gap-2">
                    <Laptop size={20} /> Websites
                  </a>
                  <ul className="grid gap-2 mt-2">
                    <li>
                      <a className="flex items-center justify-center gap-2">
                        <Palette size={20} /> Portfolio
                      </a>
                    </li>
                    <li>
                      <a className="flex items-center justify-center gap-2">
                        <PanelsTopLeft size={20} /> Vitrine
                      </a>
                    </li>
                    <li>
                      <a className="flex items-center justify-center gap-2">
                        <Box size={20} /> WebGL / 3D
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="flex items-center justify-center gap-2">
                    <FileUser size={20} /> Resume
                  </a>
                  <a className="flex items-center justify-center gap-2">
                    <Mail size={20} /> Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex justify-center items-center">
              <a className="menu-title text-base-content">
                <ThemeSwitcher />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

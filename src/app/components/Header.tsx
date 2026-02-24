"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";

export default function Header() {
  const [navActive, setNavActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const toggleNav = () => setNavActive((prev) => !prev);
  const closeNav = () => setNavActive(false);

  const toggleSearch = () => setSearchActive((prev) => !prev);
  const closeSearch = () => setSearchActive(false);

  useEffect(() => {
    if (searchActive) {
      document.body.classList.add("active");
    } else {
      document.body.classList.remove("active");
    }
  }, [searchActive]);

  return (
    <>
      <header className="header section" data-header>
        <div className="container">
          <Link href="/" className="logo">
            <Image
              src="/images/logo.svg"
              width={129}
              height={40}
              alt="Blogy logo"
            />
          </Link>

          <nav className={`navbar ${navActive ? "active" : ""}`} data-navbar>
            <ul className="navbar-list">
              <li className="navbar-item">
                <Link
                  href="/"
                  className="navbar-link hover:underline"
                  onClick={closeNav}
                >
                  Home
                </Link>
              </li>

              <li className="navbar-item">
                <Link
                  href="#recent-posts"
                  className="navbar-link hover:underline"
                  onClick={closeNav}
                >
                  Recent Post
                </Link>
              </li>

              <li className="navbar-item">
                <Link
                  href="/create"
                  className="navbar-link hover:underline"
                  onClick={closeNav}
                >
                  Create Post
                </Link>
              </li>

              <li className="navbar-item">
                <Link
                  href="/login"
                  className="navbar-link hover:underline"
                  onClick={closeNav}
                >
                  Login
                </Link>
              </li>

              <li className="navbar-item">
                <Link
                  href="/register"
                  className="navbar-link hover:underline"
                  onClick={closeNav}
                >
                  Register
                </Link>
              </li>
            </ul>
          </nav>

          <div className="wrapper">
            <button
              className="search-btn"
              aria-label="search"
              onClick={toggleSearch}
            >
              <IoSearchOutline className="ion-icon" strokeWidth="50" aria-hidden="true" />
              <span className="span">Search</span>
            </button>

            <button
              className={`nav-toggle-btn ${navActive ? "active" : ""}`}
              aria-label="toggle menu"
              onClick={toggleNav}
            >
              <span className="span one"></span>
              <span className="span two"></span>
              <span className="span three"></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`search-bar ${searchActive ? "active" : ""}`} data-search-bar>
        <div className="input-wrapper">
          <input
            type="search"
            name="search"
            placeholder="Search"
            className="input-field"
          />

          <button
            className="search-close-btn"
            aria-label="close search bar"
            onClick={closeSearch}
          >
            <IoCloseOutline className="ion-icon" strokeWidth="20" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        className={`overlay ${searchActive ? "active" : ""}`}
        data-overlay
        onClick={closeSearch}
      ></div>
    </>
  );
}

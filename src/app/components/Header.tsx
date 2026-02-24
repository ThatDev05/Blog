"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";

export default function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const [navActive, setNavActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleNav = () => setNavActive((prev) => !prev);
  const closeNav = () => setNavActive(false);
  const toggleSearch = () => setSearchActive((prev) => !prev);
  const closeSearch = () => {
    setSearchActive(false);
    setSearchQuery("");
  };

  useEffect(() => {
    if (searchActive) {
      document.body.classList.add("active");
    } else {
      document.body.classList.remove("active");
    }
  }, [searchActive]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    closeSearch();
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };



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
                <Link href="/" className="navbar-link hover:underline" onClick={closeNav}>
                  Home
                </Link>
              </li>

              <li className="navbar-item">
                <Link href="/#recent-posts" className="navbar-link hover:underline" onClick={closeNav}>
                  Recent Posts
                </Link>
              </li>

              {/* Show Create Post only when logged in */}
              {isLoggedIn && (
                <li className="navbar-item">
                  <Link href="/create" className="navbar-link hover:underline" onClick={closeNav}>
                    Create Post
                  </Link>
                </li>
              )}

              {/* Show Login/Register only when logged OUT */}
              {!isLoggedIn && (
                <>
                  <li className="navbar-item">
                    <Link href="/login" className="navbar-link hover:underline" onClick={closeNav}>
                      Login
                    </Link>
                  </li>
                  <li className="navbar-item">
                    <Link href="/register" className="navbar-link hover:underline" onClick={closeNav}>
                      Register
                    </Link>
                  </li>
                </>
              )}

              {/* Show user name + Logout when logged IN */}
              {isLoggedIn && session?.user?.name && (
                <li className="navbar-item">
                  <Link
                    href={`/author/${encodeURIComponent(session.user.name)}`}
                    className="navbar-link hover:underline"
                    onClick={closeNav}
                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    {session.user.image && (
                      <Image
                        src={session.user.image}
                        width={28}
                        height={28}
                        alt={session.user.name}
                        style={{ borderRadius: "50%" }}
                      />
                    )}
                    {session.user.name}
                  </Link>
                </li>
              )}


            </ul>
          </nav>

          <div className="wrapper">
            <button className="search-btn" aria-label="search" onClick={toggleSearch}>
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

      {/* Search bar */}
      <div className={`search-bar ${searchActive ? "active" : ""}`} data-search-bar>
        <form className="input-wrapper" onSubmit={handleSearch}>
          <input
            type="search"
            name="search"
            placeholder="Search posts..."
            className="input-field"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus={searchActive}
          />
          <button
            className="search-close-btn"
            type="button"
            aria-label="close search bar"
            onClick={closeSearch}
          >
            <IoCloseOutline className="ion-icon" strokeWidth="20" aria-hidden="true" />
          </button>
        </form>
      </div>

      <div
        className={`overlay ${searchActive ? "active" : ""}`}
        data-overlay
        onClick={closeSearch}
      />
    </>
  );
}

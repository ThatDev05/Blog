import Image from "next/image";
import Link from "next/link";
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoPinterest,
  IoLogoVimeo,
} from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="section footer-top">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <Image
                src="/images/logo.svg"
                width={129}
                height={40}
                alt="Blogy logo"
              />
            </Link>

            <p className="footer-text">
              A minimal, functional and powerful blog theme for creators.
            </p>
          </div>

          <ul className="footer-list">
            <li>
              <h5 className="h5">Social</h5>
            </li>

            <li className="footer-list-item">
              <IoLogoFacebook className="ion-icon" aria-hidden="true" />
              <Link href="#" className="footer-link hover:underline">
                Facebook
              </Link>
            </li>

            <li className="footer-list-item">
              <IoLogoTwitter className="ion-icon" aria-hidden="true" />
              <Link href="#" className="footer-link hover:underline">
                Twitter
              </Link>
            </li>

            <li className="footer-list-item">
              <IoLogoPinterest className="ion-icon" aria-hidden="true" />
              <Link href="#" className="footer-link hover:underline">
                Pinterest
              </Link>
            </li>

            <li className="footer-list-item">
              <IoLogoVimeo className="ion-icon" aria-hidden="true" />
              <Link href="#" className="footer-link hover:underline">
                Vimeo
              </Link>
            </li>
          </ul>

          <ul className="footer-list">
            <li>
              <h5 className="h5">About</h5>
            </li>

            <li>
              <Link href="#" className="footer-link hover:underline">
                Style Guide
              </Link>
            </li>

            <li>
              <Link href="#" className="footer-link hover:underline">
                Features
              </Link>
            </li>

            <li>
              <Link href="#" className="footer-link hover:underline">
                Contact
              </Link>
            </li>

            <li>
              <Link href="#" className="footer-link hover:underline">
                404
              </Link>
            </li>

            <li>
              <Link href="#" className="footer-link hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>

          <ul className="footer-list">
            <li>
              <h5 className="h5">Features</h5>
            </li>

            <li>
              <Link href="#" className="footer-link hover:underline">
                Upcoming Events
              </Link>
            </li>

            <li>
              <Link href="#" className="footer-link hover:underline">
                Blog & News
              </Link>
            </li>

            <li>
              <Link href="#" className="footer-link hover:underline">
                Features
              </Link>
            </li>

            <li>
              <Link href="#" className="footer-link hover:underline">
                FAQ Question
              </Link>
            </li>

            <li>
              <Link href="#" className="footer-link hover:underline">
                Testimonial
              </Link>
            </li>
          </ul>

          <ul className="footer-list">
            <li>
              <h5 className="h5">Membership</h5>
            </li>

            <li>
              <Link href="#" className="footer-link hover:underline">
                Account
              </Link>
            </li>

            <li>
              <Link href="#" className="footer-link hover:underline">
                Membership
              </Link>
            </li>

            <li>
              <Link href="#" className="footer-link hover:underline">
                Subscribe
              </Link>
            </li>

            <li>
              <Link href="#" className="footer-link hover:underline">
                Tags
              </Link>
            </li>

            <li>
              <Link href="#" className="footer-link hover:underline">
                Authors
              </Link>
            </li>
          </ul>
        </div>

        <div className="section footer-bottom">
          <p className="copyright">
            &copy; Blogy 2024. Published by{" "}
            <Link href="#" className="copyright-link hover:underline">
              my18story
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

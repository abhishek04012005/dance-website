import { useState } from 'react';
import styles from './Nav.module.css';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={styles.nav}>
      <a href="#hero" className={styles.logo}>Rhythmi<span>que</span></a>
      <div className={styles.links}>
        <a href="#about">About</a>
        <a href="#classes">Classes</a>
        <a href="#gallery">Gallery</a>
        <a href="#team">Team</a>
        <a href="#schedule">Schedule</a>
        <a href="#join" className={styles.cta}>Join Now</a>
      </div>

      {/* Mobile Menu Button */}
      <button
        className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#classes" onClick={closeMenu}>Classes</a>
          <a href="#gallery" onClick={closeMenu}>Gallery</a>
          <a href="#team" onClick={closeMenu}>Team</a>
          <a href="#schedule" onClick={closeMenu}>Schedule</a>
          <a href="#join" className={styles.mobileCtaBtn} onClick={closeMenu}>Join Now</a>
        </div>
      )}
    </nav>
  );
}

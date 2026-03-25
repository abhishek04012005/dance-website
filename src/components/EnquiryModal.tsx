'use client';

import { useState } from 'react';
import styles from './EnquiryModal.module.css';

type EnquiryData = {
  title: string;
  subtitle: string;
  fields: string[];
  submitBtn: string;
  successMsg: string;
};

type EnquiryModalProps = {
  enquiry: EnquiryData;
  isOpen: boolean;
  onClose: () => void;
};

export default function EnquiryModal({ enquiry, isOpen, onClose }: EnquiryModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enquiry submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>✕</button>
        
        {submitted ? (
          <div className={styles.success}>
            <div className={styles.checkmark}>✓</div>
            <p>{enquiry.successMsg}</p>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>{enquiry.title}</h2>
            <p className={styles.subtitle}>{enquiry.subtitle}</p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.input}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
              />
              <button type="submit" className={styles.submitBtn}>
                {enquiry.submitBtn}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

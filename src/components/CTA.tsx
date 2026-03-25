import styles from './CTA.module.css';

type CTAData = {
  headline: string;
  subheading: string;
  primaryBtn: string;
  secondaryBtn: string;
};

type CTAProps = {
  cta: CTAData;
  onEnquiry: () => void;
};

export default function CTA({ cta, onEnquiry }: CTAProps) {
  return (
    <section className={styles.ctaSection} id="join">
      <div className={styles.inner}>
        <div className={styles.label}>Start Today</div>
        <h2 className={styles.title}>{cta.headline}</h2>
        <p className={styles.subtitle}>{cta.subheading}</p>
        <div className={styles.actions}>
          <button onClick={onEnquiry} className={styles.primary}>
            {cta.primaryBtn}
          </button>
          <a href="#" className={styles.ghost}>{cta.secondaryBtn}</a>
        </div>
      </div>
    </section>
  );
}

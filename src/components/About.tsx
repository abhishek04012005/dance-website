import styles from './About.module.css';

type AboutProps = {
  about: {
    sectionLabel: string;
    headline: string;
    text: string[];
    badge: { value: string; label: string };
    images: { main: string; accent: string };
    stats: { label: string; value: string }[];
  };
};

export default function About({ about }: AboutProps) {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        {/* Images Column */}
        <div className={styles.visualCol}>
          <div className={styles.imageContainer}>
            <img src={about.images.main} alt="Dance performance" className={styles.mainImg} />
            <img src={about.images.accent} alt="Ballet dancer" className={styles.accentImg} />
            <div className={styles.badge}>
              <div className={styles.badgeValue}>{about.badge.value}</div>
              <div className={styles.badgeLabel}>{about.badge.label}</div>
            </div>
          </div>
        </div>

        {/* Text Column */}
        <div className={styles.textCol}>
          <p className={styles.label}>{about.sectionLabel}</p>
          <h2 className={styles.title}>{about.headline}</h2>
          {about.text.map((line, idx) => <p key={idx}>{line}</p>)}
          <div className={styles.stats}>
            {about.stats.map(s => (
              <div key={s.label} className={styles.stat}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

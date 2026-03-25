import styles from './Hero.module.css';

type HeroProps = {
  studio: string;
  tagline: string;
};

export default function Hero({ studio, tagline }: HeroProps) {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.eyebrow}>Est. 2010 · Premium Dance Studio</p>
        <h1 className={styles.title}>{studio}</h1>
        <p className={styles.subtitle}>{tagline}</p>
        <div className={styles.actions}>
          <a href="#classes" className={styles.primary}>Explore Classes</a>
          <a href="#gallery" className={styles.ghost}>Watch Performances</a>
        </div>
      </div>
    </section>
  );
}

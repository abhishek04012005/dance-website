import styles from './Classes.module.css';

type ClassItem = {
  title: string;
  level: string;
  description: string;
  image: string;
  pill?: string;
  instructor: string;
  duration: string;
  students: string;
};

type ClassesProps = {
  classes: ClassItem[];
  classesSection?: {
    label: string;
    headline: string;
    description: string;
    subtitle: string;
    featured: string;
    stats: { value: string; label: string }[];
  };
};

export default function Classes({ classes, classesSection }: ClassesProps) {
  const section = classesSection || {
    label: "What We Offer",
    headline: "Our dance classes",
    description: "",
    subtitle: "From beginner to professional, find your perfect style and level.",
    featured: "",
    stats: []
  };

  const featuredClass = classes.find(c => c.title === section.featured);

  return (
    <section id="classes" className={styles.section}>
      <div className={styles.head}>
        <div className={styles.decorTop}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
        
        <p className={styles.label}>{section.label}</p>
        <h2 className={styles.title}>
          <span className={styles.titleWord}>{section.headline}</span>
        </h2>
        
        {section.description && (
          <p className={styles.description}>{section.description}</p>
        )}
        
        <p className={styles.subtitle}>{section.subtitle}</p>

        {section.stats && section.stats.length > 0 && (
          <div className={styles.statsRow}>
            {section.stats.map((stat, idx) => (
              <div key={idx} className={styles.statItem}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className={styles.separator}></div>

        {featuredClass && (
          <div className={styles.featured}>
            <p className={styles.featuredLabel}>✨ Featured Class</p>
            <div className={styles.featuredCard}>
              <div className={styles.featuredImage}>
                <img src={featuredClass.image} alt={featuredClass.title} />
              </div>
              <div className={styles.featuredInfo}>
                <h3>{featuredClass.title}</h3>
                <p>{featuredClass.description}</p>
                <a href="#classes" className={styles.learnMore}>Learn More →</a>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.grid}>
        {classes.map(cls => (
          <article key={cls.title} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={cls.image} alt={cls.title} />
              <div className={styles.overlay}>
                <div className={styles.overlayContent}>
                  <p className={styles.instructor}>👤 {cls.instructor}</p>
                  <p className={styles.duration}>⏱ {cls.duration}</p>
                  <p className={styles.students}>👥 {cls.students} students</p>
                  <a href="#join" className={styles.enrollBtn}>Enroll Now</a>
                </div>
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.header}>
                <h3 className={styles.cardH3}>{cls.title}</h3>
                <span className={styles.levelBadge}>{cls.level}</span>
              </div>
              <p className={styles.tag}>{cls.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

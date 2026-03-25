import styles from './Footer.module.css';

type FooterData = {
  motto: string;
  contact: Record<string, string>;
  links: {
    classes: string[];
    studio: string[];
    social: { name: string; icon: string }[];
  };
  copyright: string;
  credit: string;
};

type FooterProps = {
  footer: FooterData;
  studio: string;
};

export default function Footer({ footer, studio }: FooterProps) {
  const [namePart, ...rest] = studio.split(/(?=[A-Z])/);
  const highlighted = rest[0] ? rest[0] : '';

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logo}>Rhythmi<span>que</span></div>
          <p className={styles.motto}>{footer.motto}</p>
          <div className={styles.social}>
            {footer.links.social.map(s => (
              <a key={s.name} href="#" className={styles.socialIcon} title={s.name}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.col}>
          <h4>Classes</h4>
          <ul>
            {footer.links.classes.map(cls => (
              <li key={cls}><a href="#">{cls}</a></li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Studio</h4>
          <ul>
            {footer.links.studio.map(link => (
              <li key={link}><a href="#">{link}</a></li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Contact</h4>
          <ul>
            <li><a href="#">{footer.contact.address}</a></li>
            <li><a href="#">{footer.contact.phone}</a></li>
            <li><a href="#">{footer.contact.email}</a></li>
            <li><a href="#">{footer.contact.hours}</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>{footer.copyright}</p>
        <p>{footer.credit}</p>
      </div>
    </footer>
  );
}

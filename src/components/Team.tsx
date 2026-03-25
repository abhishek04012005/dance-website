import styles from './Team.module.css';

type TeamMember = {
  name: string;
  role: string;
  image: string;
};

type TeamProps = {
  team: TeamMember[];
};

export default function Team({ team }: TeamProps) {
  return (
    <section id="team" className={styles.section}>
      <div className={styles.head}>
        <p className={styles.label}>Our Artists</p>
        <h2 className={styles.title}>Meet the <em>team</em></h2>
      </div>
      <div className={styles.grid}>
        {team.map(person => (
          <article key={person.name} className={styles.card}>
            <div className={styles.imageWrap}><img src={person.image} alt={person.name} /></div>
            <h3 className={styles.cardH3}>{person.name}</h3>
            <p className={styles.cardP}>{person.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

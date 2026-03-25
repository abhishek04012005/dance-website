import styles from './Testimonials.module.css';
import { useState, useEffect } from 'react';

type Testimonial = {
  text: string;
  name: string;
  info: string;
  image: string;
};

const testimonials: Testimonial[] = [
  { text: 'Rhythmique transformed my relationship with movement. Sofia’s classes gave me confidence.', name: 'Ananya Patel', info: 'Ballet student, 2 years', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { text: 'I joined as beginner and now perform on stage. Instructors are patient and passionate.', name: 'Rohit Mehta', info: 'Hip-Hop & Jazz, 1.5 years', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { text: 'Kathak classes connect me to culture. Priya’s teaching is both rigorous and soulful.', name: 'Deepika Rao', info: 'Kathak student, 3 years', image: 'https://randomuser.me/api/portraits/women/68.jpg' }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((prev) => (prev + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  const active = testimonials[index];

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <p className={styles.label}>What They Say</p>
        <h2 className={styles.title}>Student <em>stories</em></h2>
        <p className={styles.text}>"{active.text}"</p>
        <div className={styles.author}>
          <img src={active.image} alt={active.name} />
          <div>
            <div className={styles.name}>{active.name}</div>
            <div className={styles.info}>{active.info}</div>
          </div>
        </div>
        <div className={styles.dots}>
          {testimonials.map((_, idx) => (
            <button key={idx} className={idx === index ? styles.activeDot : styles.dot} onClick={() => setIndex(idx)} />
          ))}
        </div>
      </div>
    </section>
  );
}

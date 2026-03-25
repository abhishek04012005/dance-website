import { useState, useMemo } from 'react';
import styles from './Schedule.module.css';

type ScheduleRow = {
  time: string;
  class: string;
  instructor: string;
  level: string;
  color?: string;
};

type ScheduleSectionData = {
  label: string;
  headline: string;
  description: string;
  tagline: string;
  stats: { value: string; label: string }[];
};

type ScheduleProps = {
  schedule?: Record<string, ScheduleRow[]>;
  scheduleSection?: ScheduleSectionData;
};

export default function Schedule({ schedule = {}, scheduleSection }: ScheduleProps) {
  const [day, setDay] = useState<'mon'|'tue'|'wed'|'thu'|'fri'|'sat'>('mon');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const dayLabels = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday' };

  const section = scheduleSection || {
    label: 'Plan Your Week',
    headline: 'Class schedule',
    description: '',
    tagline: 'Available 6 days a week',
    stats: []
  };

  // Get all unique classes for filtering
  const allClasses = useMemo(() => {
    const classes = new Set<string>();
    Object.values(schedule).forEach(dayClasses => {
      dayClasses?.forEach(cls => classes.add(cls.class));
    });
    return Array.from(classes).sort();
  }, [schedule]);

  // Get classes for current day
  const dayClasses = schedule[day] || [];

  // Filter classes
  const filteredClasses = activeFilter === 'All'
    ? dayClasses
    : dayClasses.filter(cls => cls.class === activeFilter);

  // Calculate total classes
  const totalClasses = useMemo(() => {
    return Object.values(schedule).reduce((sum, day) => sum + (day?.length || 0), 0);
  }, [schedule]);

  return (
    <section id="schedule" className={styles.section}>
      {/* Header */}
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
        
        {section.tagline && (
          <p className={styles.tagline}>{section.tagline}</p>
        )}

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
      </div>

      {/* Day Tabs */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          {days.map(d => (
            <button
              key={d}
              className={`${styles.tabBtn} ${day === d ? styles.active : ''}`}
              onClick={() => {
                setDay(d as any);
                setActiveFilter('All');
              }}
            >
              <span className={styles.dayShort}>{d.toUpperCase()}</span>
              <span className={styles.dayFull}>{dayLabels[d as keyof typeof dayLabels]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Buttons */}
      {allClasses.length > 1 && (
        <div className={styles.filterContainer}>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'All' ? styles.active : ''}`}
            onClick={() => setActiveFilter('All')}
          >
            All Classes
          </button>
          {allClasses.map(cls => (
            <button
              key={cls}
              className={`${styles.filterBtn} ${activeFilter === cls ? styles.active : ''}`}
              onClick={() => setActiveFilter(cls)}
            >
              {cls}
            </button>
          ))}
        </div>
      )}

      {/* Classes Grid */}
      <div className={styles.cardsGrid}>
        {filteredClasses.length > 0 ? (
          filteredClasses.map((cls, idx) => (
            <div
              key={idx}
              className={styles.classCard}
              style={{ 
                '--card-color': cls.color || '#d4af6a',
                animationDelay: `${idx * 0.1}s`
              } as React.CSSProperties & { '--card-color': string }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.timeBlock}>
                  <span className={styles.time}>{cls.time}</span>
                </div>
                <div className={styles.levelBadge}>{cls.level}</div>
              </div>
              
              <h3 className={styles.className}>{cls.class}</h3>
              
              <div className={styles.instructorInfo}>
                <span className={styles.instructorLabel}>👤 Instructor</span>
                <p className={styles.instructorName}>{cls.instructor}</p>
              </div>

              <button className={styles.enrollLink}>
                Book Class →
              </button>
            </div>
          ))
        ) : (
          <div className={styles.noClasses}>
            <p>No classes scheduled for {dayLabels[day as keyof typeof dayLabels]}</p>
          </div>
        )}
      </div>
    </section>
  );
}

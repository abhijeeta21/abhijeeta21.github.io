import Link from 'next/link';
import styles from './page.module.css';

export default function ExtracurricularsPage() {
  // Match activities with those defined in [activityId]/page.js
  const activities = [
    { id: 'core-team-member', name: 'Core Team Member - Institute Counselling Service' },
    { id: 'electronics-club', name: 'Secretary - Electronics Club' },
    { id: 'placement-office', name: 'Company Coordinator - Students\' Placement Office' },
    { id: 'outreach-cell', name: 'Secretary - Outreach Cell' },
    { id: 'academic-mentor', name: 'Academic Mentor (Mathematics)' },
    { id: 'student-guide', name: 'Student Guide' },
  ];

  return (
    <main className={styles.extracurricularsPage}>
      <h1 className={styles.title}>Extracurricular Activities</h1>
      <ul className={styles.activitiesList}>
        {activities.map((activity) => (
          <li key={activity.id} className={styles.activityItem}>
            <Link href={`/extracurriculars/${activity.id}`} className={styles.activityLink}>
              {activity.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.backLink}>
        <Link href="/#resume">← Back to resume</Link>
      </div>
    </main>
  );
}
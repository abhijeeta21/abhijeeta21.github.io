import styles from './page.module.css';
import Link from 'next/link';

export default function ActivityPage({ params }) {
  const { activityId } = params;
  
  // Activity content mapping
  const activityContent = {
    'core-team-member': {
      title: 'Core Team Member - Institute Counselling Service',
      description: 'As a Core Team Member of the Institute Counselling Service at IIT Kanpur, I worked closely with counselors and professors in a 3-tier team structure to envision, plan, and execute activities for supporting students both academically and emotionally. This role involved coordinating with various stakeholders to create a supportive environment for students facing challenges.',
      responsibilities: [
        'Organizing mental health awareness workshops',
        'Coordinating with Student Guides and Academic Mentors',
        'Planning and executing outreach programs',
        'Creating resources for student well-being',
      ],
      period: '2023 - 2024'
    },
    'electronics-club': {
      title: 'Secretary - Electronics Club',
      description: 'As the Secretary of the Electronics Club at IIT Kanpur, I led a team of enthusiasts in organizing workshops, competitions, and projects related to electronics and embedded systems. The club serves as a platform for students to explore their interest in electronics beyond classroom learning.',
      responsibilities: [
        'Managing club resources and budget',
        'Organizing technical workshops and training sessions',
        'Planning and executing electronics-based competitions',
        'Mentoring junior members on electronics projects',
      ],
      period: '2022 - 2023'
    },
    'placement-office': {
      title: 'Company Coordinator - Students\' Placement Office',
      description: 'As a Company Coordinator at the Students\' Placement Office, I served as a liaison between recruiting companies and students. This role involved managing the entire recruitment process for assigned companies, from initial contact to final selection.',
      responsibilities: [
        'Coordinating with company representatives',
        'Managing logistics for placement drives',
        'Assisting students with placement preparation',
        'Analyzing placement statistics and trends',
      ],
      period: '2022 - 2023'
    },
    'outreach-cell': {
      title: 'Secretary - Outreach Cell',
      description: 'In my role as Secretary of the Outreach Cell, I worked on initiatives to connect the institute with external communities. The cell focuses on social impact projects, educational outreach, and community engagement activities.',
      responsibilities: [
        'Planning and executing community service projects',
        'Organizing educational outreach programs',
        'Managing partnerships with NGOs and schools',
        'Coordinating volunteer activities',
      ],
      period: '2022 - 2023'
    },
    'academic-mentor': {
      title: 'Academic Mentor (Mathematics) - Institute Counselling Service',
      description: 'As an Academic Mentor for Mathematics courses, I provided guidance and support to students struggling with mathematical concepts. This role involved regular tutoring sessions, developing study materials, and working closely with faculty to improve learning outcomes.',
      responsibilities: [
        'Conducting regular tutoring sessions',
        'Developing simplified study materials',
        'Identifying common challenges in mathematics courses',
        'Providing exam preparation guidance',
      ],
      period: '2022 - 2023'
    },
    'student-guide': {
      title: 'Student Guide - Institute Counselling Service',
      description: 'As a Student Guide in the Institute Counselling Service, I mentored incoming freshmen to help them adjust to college life. This role focused on providing emotional support, practical advice, and guidance to help new students navigate the academic and social challenges of university life.',
      responsibilities: [
        'Mentoring assigned freshmen students',
        'Organizing orientation and adjustment activities',
        'Providing guidance on college resources',
        'Offering emotional support during transition',
      ],
      period: '2022 - 2023'
    }
  };

  // Default content for activities not in our mapping
  const defaultContent = {
    title: `${activityId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`,
    description: 'Details about this activity will be added soon. Check back later for more information!',
    responsibilities: [],
    period: ''
  };

  // Get content for the current activity
  const content = activityContent[activityId] || defaultContent;

  return (
    <main className={styles.activityPage}>
      <h1 className={styles.title}>{content.title}</h1>
      <div className={styles.period}>{content.period}</div>
      <div className={styles.content}>
        <p className={styles.description}>{content.description}</p>
        
        {content.responsibilities.length > 0 && (
          <div className={styles.responsibilities}>
            <h2>Key Responsibilities</h2>
            <ul>
              {content.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className={styles.photos}>
          {/* Add your photos here in the future */}
          <p>Photos coming soon. Stay tuned to see highlights from this activity!</p>
        </div>
        
        <div className={styles.backLink}>
          <Link href="/extracurriculars">← Back to all activities</Link>
        </div>
      </div>
    </main>
  );
}
'use client';
import styles from './page.module.css'
import MainComp from '@/components/MainComp/MainComp';

export function Home() {
  return (
    <main className={styles.main}>
      <MainComp />
    </main>
  );
}

export default Home;

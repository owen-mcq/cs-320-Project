import Image from "next/image";
import styles from "./page.module.css";
import ExerciseList from "./exerciseList";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Werk</h1>
        <ExerciseList/>
      </main>
      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
}

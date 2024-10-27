import Image from "next/image";
import styles from "./page.module.css";
import Form from "./components/exerciseForm";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Werk</h1>
        <Form />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}

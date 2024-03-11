import styles from "./page.module.css";
import Link from 'next/link';


export default function Home() {
  return (
    <>
        <Link href="/item_detail">detail/home.html</Link>
        <h1 className={styles.heading}>hello world</h1>
    </>
  );
}

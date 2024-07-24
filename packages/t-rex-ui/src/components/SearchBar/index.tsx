import SearchBar from './SearchBar';
import styles from './styles.module.css';

export default function SearchBarWrapper() {
  return (
    <div className={styles.fix}>
      <SearchBar />
    </div>
  );
}

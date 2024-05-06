import SearchBar from './SearchBar'
import styles from './styles.module.css'

export default function SearchBarWrapper(props: any) {
  return (
    <div className={styles.fix}>
      <SearchBar {...props} />
    </div>
  )
}

import styles from './styles.module.css';

import NavbarSearch from '../Navbar/Search';
import SearchBar from '../SearchBar';

const AlgoliaSearchBar = () => {
  return (
    <div className={styles.navbarSearchWrapper}>
      <NavbarSearch className={styles.navbarSearch}>
        <SearchBar />
      </NavbarSearch>
    </div>
  );
};

export default AlgoliaSearchBar;

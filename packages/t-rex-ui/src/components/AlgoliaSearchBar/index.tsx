import styles from './styles.module.css';

import NavbarSearch from '../Navbar/Search';
import SearchBar from '../SearchBar/SearchBar';
import '@docsearch/css';

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

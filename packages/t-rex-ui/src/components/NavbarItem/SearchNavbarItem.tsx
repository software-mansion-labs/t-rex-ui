import SearchBar from '../SearchBar'
import NavbarSearch from '../Navbar/Search'

export default function SearchNavbarItem({
  mobile,
  className,
}: {
  mobile: boolean
  className: string
}) {
  if (mobile) {
    return null
  }
  return (
    <NavbarSearch className={className}>
      <SearchBar />
    </NavbarSearch>
  )
}

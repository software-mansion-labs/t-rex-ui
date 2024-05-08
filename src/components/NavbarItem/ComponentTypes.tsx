import DefaultNavbarItem from './DefaultNavbarItem'
import DropdownNavbarItem from './DropdownNavbarItem'
import LocaleDropdownNavbarItem from './LocaleDropdownNavbarItem'
import SearchNavbarItem from './SearchNavbarItem'
import HtmlNavbarItem from './HtmlNavbarItem'
import DocNavbarItem from './DocNavbarItem'
import DocSidebarNavbarItem from './DocSidebarNavbarItem'
import DocsVersionNavbarItem from './DocsVersionNavbarItem'
import DocsVersionDropdownNavbarItem from './DocsVersionDropdownNavbarItem'

interface ComponentTypes {
  [key: string]: any
}

const ComponentTypes: ComponentTypes = {
  default: DefaultNavbarItem,
  localeDropdown: LocaleDropdownNavbarItem,
  search: SearchNavbarItem,
  dropdown: DropdownNavbarItem,
  html: HtmlNavbarItem,
  doc: DocNavbarItem,
  docSidebar: DocSidebarNavbarItem,
  docsVersion: DocsVersionNavbarItem,
  docsVersionDropdown: DocsVersionDropdownNavbarItem,
}
export default ComponentTypes

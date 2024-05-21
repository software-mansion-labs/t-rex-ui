import { useWindowSize } from '@docusaurus/theme-common';
import DocSidebarDesktop from './Desktop';
import DocSidebarMobile from './Mobile';
import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';

export interface DocSidebarProps {
  path: string;
  sidebar: PropSidebarItem[];
  onCollapse: () => void;
  isHidden: boolean;
  heroImages?: { logo: string; title: string };
  titleImages?: { light: string; dark: string };
}

export function DocSidebar(props: DocSidebarProps) {
  const windowSize = useWindowSize();
  // Desktop sidebar visible on hydration: need SSR rendering
  const shouldRenderSidebarDesktop =
    windowSize === 'desktop' || windowSize === 'ssr';
  // Mobile sidebar not visible on hydration: can avoid SSR rendering
  const shouldRenderSidebarMobile = windowSize === 'mobile';
  return (
    <>
      {shouldRenderSidebarDesktop && (
        <DocSidebarDesktop
          heroImages={props.heroImages}
          titleImages={props.titleImages}
          {...props}
        />
      )}
      {shouldRenderSidebarMobile && <DocSidebarMobile {...props} />}
    </>
  );
}

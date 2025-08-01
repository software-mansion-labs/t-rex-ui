import { composeProviders } from '@docusaurus/theme-common';
import {
  ColorModeProvider,
  AnnouncementBarProvider,
  ScrollControllerProvider,
  NavbarProvider,
  PluginHtmlClassNameProvider,
} from '@docusaurus/theme-common/internal';
import { DocsPreferredVersionContextProvider } from '@docusaurus/plugin-content-docs/client';

const Provider = composeProviders([
  ColorModeProvider,
  AnnouncementBarProvider,
  ScrollControllerProvider,
  DocsPreferredVersionContextProvider,
  PluginHtmlClassNameProvider,
  NavbarProvider,
]);
export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider>{children}</Provider>;
}

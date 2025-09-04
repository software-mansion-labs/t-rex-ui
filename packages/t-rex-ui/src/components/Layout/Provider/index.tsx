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
  DocsPreferredVersionContextProvider as any,
  PluginHtmlClassNameProvider,
  NavbarProvider,
]);
export default function LayoutProvider({ children }: { children: any }) {
  return <Provider>{children}</Provider>;
}

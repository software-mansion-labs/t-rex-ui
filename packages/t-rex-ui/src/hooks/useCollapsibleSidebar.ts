import { usePluginData } from '@docusaurus/useGlobalData';

const THEME_PLUGIN_NAME = 'docusaurus-plugin-t-rex-ui-theme';

interface TRexUIThemeGlobalData {
  collapsibleSidebar?: boolean;
}

const useCollapsibleSidebar = (): boolean => {
  const data = usePluginData(THEME_PLUGIN_NAME) as
    | TRexUIThemeGlobalData
    | undefined;

  return data?.collapsibleSidebar ?? false;
};

export default useCollapsibleSidebar;

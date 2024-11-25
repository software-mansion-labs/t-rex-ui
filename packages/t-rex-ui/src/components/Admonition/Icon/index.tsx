import { ThemedImage } from '../../ThemedImage';
import Danger from '../../../assets/danger.svg';
import DangerDark from '../../../assets/danger-dark.svg';

export default function AdmonitionIcon() {
  const icon = {
    light: Danger as unknown as string,
    dark: DangerDark as unknown as string,
  };
  return <ThemedImage sources={icon} />;
}

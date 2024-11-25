import clsx from 'clsx';
import { ThemedComponent } from '@docusaurus/theme-common';
import styles from './styles.module.css';

export interface ThemedImageProps {
  sources?: {
    light?: string;
    dark?: string;
  };
  className?: string;
  height?: string | number;
  width?: string | number;
  style?: object;
  alt?: string;
}

export function ThemedImage(props: ThemedImageProps) {
  const { sources, className: parentClassName, alt, ...propsRest } = props;
  return (
    <ThemedComponent className={parentClassName}>
      {({ theme, className }) =>
        sources ? (
          <img
            src={sources[theme]}
            alt={alt}
            className={clsx(styles.themedImage, className)}
            {...propsRest}
          />
        ) : null
      }
    </ThemedComponent>
  );
}

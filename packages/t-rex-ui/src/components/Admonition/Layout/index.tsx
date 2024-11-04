import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import styles from '../styles.module.css';
import { AdmonitionType } from '../Types';

function AdmonitionContainer({
  type,
  className,
  children,
}: {
  type: AdmonitionType;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType(type),
        styles.admonition,
        className
      )}>
      {children}
    </div>
  );
}
function AdmonitionHeading({ icon, title }: { icon: any; title: string }) {
  return (
    <div className={styles.admonitionHeading}>
      <span className={styles.admonitionIcon}>{icon}</span>
      {title}
    </div>
  );
}
function AdmonitionContent({ children }: { children: React.ReactNode }) {
  return children ? (
    <div className={styles.admonitionContent}>{children}</div>
  ) : null;
}

interface AdmonitionLayoutProps {
  type: AdmonitionType;
  icon: any;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function AdmonitionLayout(props: AdmonitionLayoutProps) {
  const { type, icon, title, children, className = '' } = props;
  return (
    <AdmonitionContainer type={type} className={className}>
      <AdmonitionHeading title={title} icon={icon} />
      <AdmonitionContent>{children}</AdmonitionContent>
    </AdmonitionContainer>
  );
}

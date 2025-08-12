import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { isRegexpStringMatch } from '@docusaurus/theme-common';
import { ReactNode, KeyboardEvent, MouseEvent } from 'react';

export interface NavbarNavLinkProps {
  activeBasePath?: string;
  activeBaseRegex?: string;
  to?: string;
  href?: string;
  label?: string;
  html?: HTMLElement;
  isDropdownLink?: boolean;
  prependBaseUrlToHref?: boolean;
  className?: string;
  children?: ReactNode;
  role?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
}

export default function NavbarNavLink({
  activeBasePath,
  activeBaseRegex,
  to,
  href,
  label,
  html,
  isDropdownLink,
  prependBaseUrlToHref,
  ...props
}: NavbarNavLinkProps) {
  // TODO all this seems hacky
  // {to: 'version'} should probably be forbidden, in favor of {to: '/version'}
  const toUrl = useBaseUrl(to);
  const activeBaseUrl = useBaseUrl(activeBasePath);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });
  // Link content is set through html XOR label
  const linkContentProps = html
    ? { dangerouslySetInnerHTML: { __html: html } }
    : {
        children: (
          <>
            {label}
          </>
        ),
      };
  if (href) {
    return (
      <Link
        href={prependBaseUrlToHref ? normalizedHref : href}
        {...props}
        {...linkContentProps}
      />
    );
  }
  return (
    <Link
      to={toUrl}
      isNavLink
      {...((activeBasePath || activeBaseRegex) && {
        isActive: (_match, location) =>
          activeBaseRegex
            ? isRegexpStringMatch(activeBaseRegex, location.pathname)
            : location.pathname.startsWith(activeBaseUrl),
      })}
      {...props}
      {...linkContentProps}
    />
  );
}

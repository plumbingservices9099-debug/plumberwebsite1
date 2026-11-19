import { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';

export function navigateWithHistory(href: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('fixit:navigate', { detail: { href } }));
}

interface AppLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  children: ReactNode;
}

export function AppLink({ href, onClick, children, ...rest }: AppLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    // Allow browser defaults for modifier clicks, external links, tel/mailto, or new tabs
    if (
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      rest.target === '_blank' ||
      href.startsWith('http') ||
      href.startsWith('tel:') ||
      href.startsWith('mailto:')
    ) {
      return;
    }

    e.preventDefault();
    navigateWithHistory(href);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

import { useState, useRef, useEffect } from 'react';
import { useDoc, useDocsVersion } from '@docusaurus/plugin-content-docs/client';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './styles.module.css';
import IconCopy from '../Icon/Copy';
import IconMarkdown from '../Icon/Markdown';
import IconChatGPT from '../Icon/ChatGPT';
import IconClaude from '../Icon/Claude';
import IconChevron from '../Icon/Chevron';


function LLMButtonContent({ className }: { className?: string }) {
  const version = useDocsVersion();
  const { metadata } = useDoc();
  const { permalink } = metadata;

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const mdUrl = `${permalink}.md`;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!version) return null;

  const copyMarkdown = async () => {
    try {
      const res = await fetch(mdUrl);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setOpen(false);
    } catch (err) {
      console.error('failed to copy', err);
    }
  };

  const prompt = `Read from ${window.location.origin + permalink} so I can ask questions about it.`;
  const actions = [
    {
      label: 'Copy Markdown',
      icon: <IconCopy size={16} />,
      onClick: copyMarkdown,
    },
    {
      label: 'View Markdown',
      icon: <IconMarkdown size={16} />,
      onClick: () => window.open(mdUrl, '_blank'),
    },
    {
      label: 'Open in ChatGPT',
      icon: <IconChatGPT size={16} />,
      onClick: () =>
        window.open(
          `https://chat.openai.com/?prompt=${encodeURIComponent(prompt)}`,
          '_blank'
        ),
    },
    {
      label: 'Open in Claude',
      icon: <IconClaude size={16} />,
      onClick: () =>
        window.open(
          `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
          '_blank'
        ),
    },
  ];

  return (
      <div className={styles.llmButtonBar}>
    <div
      className={`${styles.llmButtonContainer} ${className ?? ''}`}
      ref={dropdownRef}>
      <button
        className={`${styles.llmButton} ${open ? styles.active : ''}`}
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open}>
        <IconCopy size={16} />
        <span>Copy page</span>
        <IconChevron size={12} className={styles.chevron} />
      </button>

      <div className={`${styles.llmDropdown} ${open ? styles.open : ''}`}>
        {actions.map((item, idx) => (
          <div
            key={idx}
            className={styles.llmDropdownItem}
            onClick={() => {
              item.onClick();
              setOpen(false);
            }}>
            <span className={styles.iconContainer}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export interface LLMButtonProps {
  className?: string;
}

export function LLMButton({ className }: LLMButtonProps) {
  return (
    <BrowserOnly>{() => <LLMButtonContent className={className} />}</BrowserOnly>
  );
}

// Lightweight markdown renderer for blog body content.
//
// react-markdown 10.x has an "Invalid hook call" incompatibility with
// React 19's renderer in this project's dev setup, so we ship our own
// purpose-built renderer for the subset of markdown the migrated blog
// content actually uses: paragraphs, ##/### headings, **bold**, *em*,
// inline `code`, ordered + unordered lists, [links](url), and ---.
// No HTML passthrough, no embedded raw HTML — safer and predictable.
import { type ReactNode } from 'react'

/** Inline markdown → ReactNode[] (bold, italic, code, links). */
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let key = 0

  // Tokenise on the inline patterns in priority order. The regex
  // captures any of: link, bold, italic, inline code. Whatever falls
  // between matches is emitted as plain text.
  const re =
    /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*\n]+)\*|_([^_\n]+)_|`([^`]+)`/g

  let lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIndex) {
      nodes.push(text.slice(lastIndex, m.index))
    }
    if (m[1] !== undefined) {
      // [text](url)
      nodes.push(
        <a key={key++} href={m[2]}>
          {renderInline(m[1])}
        </a>
      )
    } else if (m[3] !== undefined || m[4] !== undefined) {
      // **bold** or __bold__
      nodes.push(<strong key={key++}>{renderInline(m[3] || m[4]!)}</strong>)
    } else if (m[5] !== undefined || m[6] !== undefined) {
      // *italic* or _italic_
      nodes.push(<em key={key++}>{renderInline(m[5] || m[6]!)}</em>)
    } else if (m[7] !== undefined) {
      // `code`
      nodes.push(<code key={key++}>{m[7]}</code>)
    }
    lastIndex = m.index + m[0].length
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }
  return nodes
}

/**
 * Renders a markdown string as React elements. Supports the block-level
 * features used by the migrated blog content: ##/### headings, paragraphs,
 * - / * / 1. lists, --- horizontal rules.
 */
export function Markdown({ source }: { source: string }) {
  // Normalise line endings, strip BOM, then split into blocks on blank lines.
  const text = source.replace(/\r\n/g, '\n').replace(/^﻿/, '').trim()
  const blocks = text.split(/\n{2,}/)

  return (
    <>
      {blocks.map((block, i) => {
        const trimmed = block.trim()

        // Horizontal rule
        if (/^---+$/.test(trimmed)) {
          return <hr key={i} />
        }

        // Headings
        const h2 = /^##\s+(.+)$/.exec(trimmed)
        if (h2) return <h2 key={i}>{renderInline(h2[1])}</h2>
        const h3 = /^###\s+(.+)$/.exec(trimmed)
        if (h3) return <h3 key={i}>{renderInline(h3[1])}</h3>
        const h4 = /^####\s+(.+)$/.exec(trimmed)
        if (h4) return <h4 key={i}>{renderInline(h4[1])}</h4>
        const h1 = /^#\s+(.+)$/.exec(trimmed)
        if (h1) return <h2 key={i}>{renderInline(h1[1])}</h2>

        // Blockquote
        if (/^>\s/.test(trimmed)) {
          const cleaned = trimmed
            .split('\n')
            .map((l) => l.replace(/^>\s?/, ''))
            .join(' ')
          return <blockquote key={i}>{renderInline(cleaned)}</blockquote>
        }

        // Ordered list
        if (/^(\d+)\.\s/.test(trimmed)) {
          const items = trimmed.split('\n').filter((l) => /^\d+\.\s/.test(l))
          return (
            <ol key={i}>
              {items.map((item, j) => (
                <li key={j}>{renderInline(item.replace(/^\d+\.\s+/, ''))}</li>
              ))}
            </ol>
          )
        }

        // Unordered list
        if (/^[-*]\s/.test(trimmed)) {
          const items = trimmed.split('\n').filter((l) => /^[-*]\s/.test(l))
          return (
            <ul key={i}>
              {items.map((item, j) => (
                <li key={j}>{renderInline(item.replace(/^[-*]\s+/, ''))}</li>
              ))}
            </ul>
          )
        }

        // Default — paragraph. Preserve internal single-newline as <br>
        // so the rare in-paragraph line break still renders correctly.
        const lines = trimmed.split('\n')
        return (
          <p key={i}>
            {lines.map((line, j) => (
              <span key={j}>
                {j > 0 && <br />}
                {renderInline(line)}
              </span>
            ))}
          </p>
        )
      })}
    </>
  )
}

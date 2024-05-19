import TagCloud, { type TagCloudOptions } from '@frank-mayer/react-tag-cloud';
import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';

export function HomeTags({ children }: { children: React.ReactNode }) {
  const [tags, setTags] = useState<string[]>([]);
  const [el, setEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!el) return;
    const tags = el?.textContent?.split(',') || [];
    setTags(tags.map((tag) => tag.trim()));
  }, [el]);

  return (
    <>
      <div ref={setEl} className="hidden">
        {children}
      </div>
      {tags.length && (
        <TagCloud
          options={(w: Window & typeof globalThis): TagCloudOptions => ({
            containerClass: 'relative left-1/2 -translate-x-1/2',
            radius: Math.min(500, w.innerWidth, w.innerHeight) / 2,
            maxSpeed: 'slow',
          })}
          onClick={(tag: string, ev: MouseEvent) => alert(tag)}
          onClickOptions={{ passive: true }}
        >
          {tags}
        </TagCloud>
      )}
    </>
  );
}

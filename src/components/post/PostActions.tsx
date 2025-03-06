import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Toaster } from '@/components/ui/sonner';
import { copyTextToClipboard, getHref } from '@/lib/helper';
import { usePostDetail } from '@/store/postDetail';
import type { MarkdownHeading } from 'astro';
import { useEffect } from 'react';
import { toast } from 'sonner';

type Props = {
  headings: MarkdownHeading[];
};

export function PostActions({ headings }: Props) {
  return (
    <>
      <Toaster />
      <div className="sticky flex justify-center bottom-4 mb-8 print:hidden">
        <Menubar>
          <MenuLike />

          {headings.length > 0 && <MenuOutline headings={headings} />}

          <MenuShare />
        </Menubar>
      </div>
    </>
  );
}

function MenuLike() {
  const { like } = usePostDetail();
  const handleClick = (description?: string) => {
    like(getHref()).then(() => toast('谢谢', { description }));
  };
  return (
    <MenubarMenu>
      <MenubarTrigger className="cursor-pointer" onClick={() => like(getHref())}>
        <span className="iconify icon-[tabler--hearts] text-lg"></span>
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem onClick={() => handleClick('感谢老铁的点赞')}>
          <span className="mr-2 iconify icon-[tabler--thumb-up]"></span>
          点赞
        </MenubarItem>
        <MenubarItem onClick={() => handleClick('你很喜欢，我很开心')}>
          <span className="mr-2 iconify icon-[tabler--heart]"></span>
          喜欢
        </MenubarItem>
        <MenubarItem onClick={() => handleClick('就写、就写')}>
          <span className="mr-2 iconify icon-[tabler--user-question]"></span>
          写的很好，不许再写了
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}

function MenuOutline({ headings }: Props) {
  const displayHeadings = headings.filter((heading) => heading.depth <= 3);
  return (
    <MenubarMenu>
      <MenubarTrigger className="cursor-pointer">
        <span className="iconify icon-[tabler--heading] text-lg"></span>
      </MenubarTrigger>
      <MenubarContent>
        {displayHeadings.map((heading) => {
          return (
            <MenubarItem key={heading.slug} onClick={() => (window.location.hash = `#${heading.slug}`)}>
              {heading.depth === 2 && (
                <>
                  <span className="mr-2 iconify icon-[tabler--h-2]" />
                  {heading.text}
                </>
              )}
              {heading.depth === 3 && (
                <>
                  <span className="pl-4 flex items-center">
                    <span className="mr-2 iconify icon-[tabler--h-3]" />
                    {heading.text}
                  </span>
                </>
              )}
            </MenubarItem>
          );
        })}
      </MenubarContent>
    </MenubarMenu>
  );
}

function MenuShare() {
  const href = getHref();
  const handleShareTwitter = () =>
    window.open(`https://twitter.com/intent/tweet?url=${href}`, '_blank', 'noopener,noreferrer');
  const handleCopyLink = () => {
    copyTextToClipboard(href).then(() => {
      toast('Copied', {
        description: href,
      });
    });
  };
  const handlePrint = () => window.print();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'P') {
        e.preventDefault();
        handlePrint();
      }
    };
    const copy = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        handleCopyLink();
      }
    };
    document.addEventListener('keydown', copy);
    document.addEventListener('keydown', down);
    return () => {
      document.removeEventListener('keydown', down);
      document.removeEventListener('keydown', copy);
    };
  }, []);
  return (
    <MenubarMenu>
      <MenubarTrigger className="cursor-pointer">
        <span className="iconify icon-[tabler--share] text-lg"></span>
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem onClick={handleShareTwitter}>
          <span className="mr-2 iconify icon-[tabler--brand-twitter]" />
          Twitter
        </MenubarItem>
        <MenubarItem onClick={handleCopyLink}>
          <span className="mr-2 iconify icon-[tabler--copy]" />
          复制链接
          <MenubarShortcut>⌘+⇧+C</MenubarShortcut>
        </MenubarItem>
        <MenubarItem onClick={handlePrint}>
          <span className="mr-2 iconify icon-[tabler--printer]" />
          打印
          <MenubarShortcut>⌘+P</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}

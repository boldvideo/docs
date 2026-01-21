import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Bold Video"
            width={80}
            height={22}
            className="dark:brightness-0 dark:invert"
          />
          <span className="text-sm font-medium text-fd-muted-foreground">Docs</span>
        </div>
      ),
    },
    links: [
      {
        text: 'boldvideo.com',
        url: 'https://boldvideo.com',
        external: true,
      },
    ],
  };
}

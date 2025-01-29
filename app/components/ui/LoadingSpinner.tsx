import { IconMusic } from '@tabler/icons-react';

export function LoadingSpinner({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-white/70">
      <IconMusic className="animate-pulse" size={20} />
      <span>{text}</span>
    </div>
  );
}

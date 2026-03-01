/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from '@/lib/utils';
import { IconLayoutNavbarCollapse } from '@tabler/icons-react';
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import Link from 'next/link';
import { useRef, useState, useEffect, memo } from 'react';

interface DockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  action?: () => void;
}

export const FloatingDock = memo(function FloatingDock({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
});

const FloatingDockMobile = memo(function FloatingDockMobile({ items, className }: { items: DockItem[]; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn('relative block md:hidden', className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 right-0 flex flex-col gap-2 min-w-max"
          >
            {items.map((item, idx) => {
              const isExternal = item.href && item.href.startsWith('http');
              const isLink = isExternal || (item.href && item.href !== '#');
              const Content = <div className="h-4 w-4">{item.icon}</div>;
              const containerClass =
                'h-6 w-6 cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-full';

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    scale: 0.8,
                    transition: {
                      delay: idx * 0.05,
                    },
                  }}
                  transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                  className="flex items-center gap-2 bg-gray-50 dark:bg-neutral-900 rounded-full px-3 py-2"
                >
                  {isLink ? (
                    <Link
                      href={item.href}
                      className={containerClass}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      aria-label={item.title}
                      onClick={() => setOpen(false)}
                    >
                      {Content}
                    </Link>
                  ) : (
                    <button
                      className={cn('bg-transparent border-none p-0', containerClass)}
                      onClick={() => {
                        item.action?.();
                        setOpen(false);
                      }}
                      aria-label={item.title}
                      type="button"
                    >
                      {Content}
                    </button>
                  )}
                  <span className="text-xs text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
                    {item.title}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.95 }}
        className="h-12 w-12 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
        aria-label="Toggle menu"
      >
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
          <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
        </motion.div>
      </motion.button>
    </div>
  );
});

const FloatingDockDesktop = memo(function FloatingDockDesktop({ items, className }: { items: DockItem[]; className?: string }) {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={e => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'hidden md:flex h-16 gap-2 lg:gap-4 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900 px-3 lg:px-4 pb-3 shadow-lg backdrop-blur-sm',
        className
      )}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        delay: 0.2,
      }}
    >
      {items.map(item => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
});

// Memoize IconContainer to prevent re-initializing expensive framer-motion hooks unnecessarily
const IconContainer = memo(function IconContainer({
  mouseX,
  title,
  icon,
  href,
  action,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  action?: () => void;
}) {
  let ref = useRef<HTMLDivElement>(null);
  let boundsRef = useRef({ x: 0, width: 0 });

  useEffect(() => {
    const updateBounds = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        boundsRef.current = { x: rect.x, width: rect.width };
      }
    };
    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  let distance = useTransform(mouseX, val => {
    let bounds = boundsRef.current;
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const isExternal = href && href.startsWith('http');
  const isLink = isExternal || (href && href !== '#');

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative"
    >
      <AnimatePresence>
        {(hovered || focused) && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 2, x: '-50%' }}
            className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center"
      >
        {icon}
      </motion.div>
    </motion.div>
  );

  const containerClass =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-full';

  if (isLink) {
    return (
      <Link
        href={href}
        className={containerClass}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        aria-label={title}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={action}
      className={cn('bg-transparent border-none p-0 cursor-pointer', containerClass)}
      type="button"
      aria-label={title}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {content}
    </button>
  );
});

'use client';

import { useState, type FC } from 'react';

import NextImage from 'next/image';
import NextLink from 'next/link';

import { Accordion, AccordionItem, Tooltip } from '@nextui-org/react';

import { cn } from '@utils/cn';

import { accordionItems, linkItems } from './utils';

const AsideNavigation: FC = () => {
  const [isOpenAsideNavigation, setIsOpenAsideNavigation] = useState(true);

  return (
    <nav className={
      cn('bg-zinc-900 rounded-r-3xl h-auto md:h-screen p-4 transition-width sticky top-0', isOpenAsideNavigation ? 'w-60' : 'w-24')
    }>
      <figure className='flex items-end gap-2 mb-5'>
        <NextImage
          src='/medias/logo-white.svg'
          alt='Sync'
          width='0'
          height='0'
          className='w-14'
          draggable='false'
          onClick={() => setIsOpenAsideNavigation((prevState) => !prevState)}
        />
        {isOpenAsideNavigation && (
          <span className='text-white font-semibold text-4xl select-none overflow-hidden'>
            Sync
          </span>
        )}
      </figure>
      {accordionItems.map(({ icon, title, items }, index) => (
        <div key={`${index}-accordion-items`}>
          <Accordion isCompact>
            <AccordionItem
              key={index + 1}
              aria-label={title}
              title={
                <span className='flex items-center gap-4'>
                  <Tooltip
                    showArrow
                    content={title}
                    placement='right'
                    className='text-zinc-900'
                  >
                    {icon}
                  </Tooltip>
                  {isOpenAsideNavigation && title}
                </span>
              }
            >
              {items.map(({ icon, label, path }, index) => (
                <NextLink
                  key={`${index}-accordion-items`}
                  href={path}
                  className='text-white text-sm flex items-center gap-4 ml-4 mb-2 overflow-hidden'
                >
                  <Tooltip
                    showArrow
                    content={label}
                    placement='right'
                    className='text-zinc-900'
                  >
                    {icon}
                  </Tooltip>
                  {isOpenAsideNavigation && label}
                </NextLink>
              ))}
            </AccordionItem>
          </Accordion>
        </div>
      ))}
      {linkItems.map(({ icon, label, path }, index) => (
        <NextLink
          key={`${index}-link-items`}
          href={path}
          className='text-white flex items-center gap-4 px-2 mt-2 overflow-hidden'
        >
          <Tooltip
            showArrow
            content={label}
            placement='right'
            className='text-zinc-900'
          >
            {icon}
          </Tooltip>
          {isOpenAsideNavigation && label}
        </NextLink>
      ))}
    </nav>
  );
};

export default AsideNavigation;
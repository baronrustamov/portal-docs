import {
  CloseIcon,
  GIT_LOGO,
  GIT_LOGO_WHITE,
  ILLA_LOGO,
  ILLA_LOGO_WHITE,
  MenuIcon,
} from '@/img/home/svg'
import { LanguageSelect } from '@/components/home/language-select'
import { ProductSelect } from '@/components/home/product-select'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Menu } from '@/components/home/menu'
import clsx from 'clsx'

export const Nav = ({
  navColorChange = false,
  cloudButtonColorChange,
  onSubscribe,
}) => {
  const { t } = useTranslation('home')

  const [menuExpand, setMenuExpand] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuExpand ? 'hidden' : 'auto'
  }, [menuExpand])

  return (
    <>
      <div className="justify-between  px-[20px] w-full h-[64px] flex items-end lg:hidden">
        <Link legacyBehavior href="/">
          <a>
            <ILLA_LOGO />
          </a>
        </Link>
        <span
          onClick={() => {
            setMenuExpand(() => !menuExpand)
          }}
        >
          {menuExpand ? <CloseIcon /> : <MenuIcon />}
        </span>
      </div>
      <Menu menuExpand={menuExpand} closeMenu={() => setMenuExpand(false)} />
      <div className="h-[88px]  w-full flex justify-between items-end fixed z-40  hidden lg:inline-flex">
        <div
          className={clsx(
            'w-1/3 h-[48px] items-center flex  h-full items-end flex-row z-50 pl-[40px]',
            navColorChange ? 'text-white' : 'text-garyBlue-02',
          )}
        >
          <Link legacyBehavior href="/">
            <a>{navColorChange ? <ILLA_LOGO_WHITE /> : <ILLA_LOGO />}</a>
          </Link>
          <Link legacyBehavior href="https://github.com/illacloud/illa-builder">
            <a>
              <span className="cursor-pointer">
                {navColorChange ? <GIT_LOGO_WHITE /> : <GIT_LOGO />}
              </span>
            </a>
          </Link>
          <LanguageSelect buttonColorChange={navColorChange} />
        </div>
        <div className="w-1/3 flex justify-center font-medium text-garyBlue-02 text-[16px]">
          <div
            className={clsx(
              'flex justify-center rounded-full px-[24px] shadow-[0px_2px_16px_0px_rgba(0,0,0,0.02)] transition-background',
              navColorChange
                ? 'bg-white[.12] text-white supports-backdrop-blur:bg-white/[.12] backdrop-blur '
                : 'bg-white text-garyBlue-02',
            )}
          >
            <ProductSelect buttonColorChange={navColorChange} />
            <Link legacyBehavior href="/docs/about-illa">
              <a className="px-[16px] text-center leading-[48px]">
                {t('nav.doc')}
              </a>
            </Link>
            <Link legacyBehavior href="/hire">
              <a className="px-[16px] text-center leading-[48px]">
                {t('nav.career')}
              </a>
            </Link>
          </div>
        </div>
        <div
          className={clsx(
            'w-1/3 text-[16px] font-normal gap-[16px] flex justify-end  pr-[40px]',
          )}
        >
          <Link legacyBehavior href="/docs/illa-cli">
            <a
              className={clsx(
                'w-[160px] text-center bg-white/[.12] text-white supports-backdrop-blur:bg-white/[.12] backdrop-blur  leading-[48px] box-border rounded-full ',
                navColorChange ? 'visible' : 'hidden',
              )}
            >
              {t('self-Hosted')}
            </a>
          </Link>
          <Link legacyBehavior href="https://cloud.illacloud.com">
            <a
              className={clsx(
                'w-[160px] text-center leading-[48px] box-border rounded-full',
                navColorChange ? 'visible' : 'hidden',
                cloudButtonColorChange
                  ? 'bg-tech-purple-01 text-white'
                  : 'bg-white text-tech-purple-01',
              )}
            >
              {t('illa-Cloud')}
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

import React, { useState, useMemo, useEffect } from 'react'
import style from './index.module.css'
import { sendTagEvent } from '@/utils/gtag'
import clsx from 'clsx'

const Publicize = () => {
  const [publicizeList, setPublicizeList] = useState([])
  const [showOpacity, setShowOpacity] = useState(0)
  const host = 'https://strapi.illasoft.com'

  const publicizeItem = useMemo(() => {
    const now = Date.now()
    if (!publicizeList.length) return undefined
    for (let item of publicizeList) {
      const { startTime, endTime } = item
      const isMoreStarTime = now >= new Date(startTime).getTime()
      const isLessEndTime = now <= new Date(endTime).getTime()
      if (isMoreStarTime && isLessEndTime) {
        return item
      }
    }
    return undefined
  }, [publicizeList])

  useEffect(() => {
    const request = async () => {
      try {
        const res = await fetch(
          'https://strapi.illasoft.com/Official-website-messages',
        )
        const data = await res.json()
        setPublicizeList(data)
      } catch {
        setPublicizeList([])
      }
    }
    request()
  }, [])
  return (
    <a
      className={clsx(style.publicize, {
        "pointer-events-none": !publicizeItem
      },
      )}
      style={{ borderColor: publicizeItem?.borderColor, opacity: showOpacity}}
      href={publicizeItem?.href ?? ""}
      onClick={() => {
        if (publicizeItem) {
          sendTagEvent({
            action: 'click',
            category: 'homepage_body_announcement_click',
            label: 'announcement',
            value: `${publicizeItem.href}`,
          })
        }

      }}
    >
      <span className={style.publicizeStyle}>
        <img
          className='w-full'
          src={host + publicizeItem?.bgImg?.url}
          alt="publicize background"
          onLoad={() => setShowOpacity(1)}
        />
      </span>
      <span className='flex flex-row justify-between items-center'>
        <span className="flex flex-row justify-between">
          <span className={style.publicIntru}>
            <img
              className="h-[24px] w-[24px]"
              src={publicizeItem?.logo ?? ""}
              alt="publicize logo"
            />
            {publicizeItem?.intruduction ?? ""}
          </span>
        </span>
        <span className={style.publicSlogan}>{publicizeItem?.slogan ?? ""}</span>
      </span>
    </a>
  )
}

export default Publicize

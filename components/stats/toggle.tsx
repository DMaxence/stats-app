import { IconMenu } from '@/components/icon-menu'
import { Popover } from '@/components/popover'

import { INTERVALS } from '@/lib/stats'
import { cn } from '@/lib/utils'
import { Calendar, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useContext, useMemo, useState } from 'react'
import { StatsContext } from '.'
import { Tick } from '@/app/icons'

export default function Toggle() {
  const { interval } = useContext(StatsContext)

  const [openDatePopover, setOpenDatePopover] = useState(false)

  const selectedInterval = useMemo(() => {
    return INTERVALS.find((s) => s.value === interval) || INTERVALS[1]
  }, [interval])

  return (
    <div
      className={cn(
        'sticky top-0 z-10 mb-5 bg-transparent py-3 backdrop-blur dark:bg-black/10 md:py-5'
      )}
    >
      <div className="flex flex-col justify-between space-y-3 sm:px-2.5 md:h-10 md:flex-row md:space-y-0 lg:px-0">
        <div className="flex items-center gap-5">
          <Popover
            content={
              <div className="grid w-full p-2 md:w-48">
                {INTERVALS.map(({ display, value }) => (
                  <Link
                    key={value}
                    href={`?${`${new URLSearchParams({
                      interval: value,
                    }).toString()}`}`}
                    scroll={false}
                    onClick={() => setOpenDatePopover(false)}
                    className="flex w-full items-center justify-between space-x-2 rounded-md p-2 hover:bg-gray-100 active:bg-gray-200"
                  >
                    <p className="text-sm">{display}</p>
                    {selectedInterval.value === value && (
                      <Tick className="h-4 w-4" aria-hidden="true" />
                    )}
                  </Link>
                ))}
              </div>
            }
            openPopover={openDatePopover}
            setOpenPopover={setOpenDatePopover}
          >
            <button
              onClick={() => setOpenDatePopover(!openDatePopover)}
              className="flex items-center justify-between space-x-2 rounded-md bg-white px-3 py-2.5 shadow transition-all duration-75 hover:shadow-md active:scale-95"
            >
              <IconMenu
                text={selectedInterval.display}
                icon={<Calendar className="h-4 w-4" />}
              />
              <ChevronDown
                className={`h-5 w-5 text-gray-400 ${
                  openDatePopover ? 'rotate-180 transform' : ''
                } transition-all duration-75`}
              />
            </button>
          </Popover>
        </div>
      </div>
    </div>
  )
}

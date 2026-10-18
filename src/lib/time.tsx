import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { londonNow, statusAt, type Moment, type Status } from './clock'

export type Lights = 'auto' | 'day' | 'candle'

type TimeState = {
  real: Moment
  moment: Moment
  previewing: boolean
  setPreview: (m: Moment | null) => void
  status: Status
  lights: Lights
  setLights: (l: Lights) => void
  candle: boolean
}

const TimeContext = createContext<TimeState | null>(null)

function readLights(): Lights {
  try {
    const v = localStorage.getItem('baring-lights')
    if (v === 'day' || v === 'candle' || v === 'auto') return v
  } catch {
    /* storage unavailable */
  }
  return 'auto'
}

export function TimeProvider({ children }: { children: ReactNode }) {
  const [real, setReal] = useState<Moment>(() => londonNow())
  const [preview, setPreview] = useState<Moment | null>(null)
  const [lights, setLightsState] = useState<Lights>(readLights)

  useEffect(() => {
    const id = window.setInterval(() => setReal(londonNow()), 20_000)
    return () => window.clearInterval(id)
  }, [])

  const moment = preview ?? real
  const status = useMemo(() => statusAt(moment), [moment])
  const candle = lights === 'auto' ? status.candle : lights === 'candle'

  useEffect(() => {
    document.documentElement.dataset.light = candle ? 'candle' : 'day'
    const meta = document.querySelector('meta[name="theme-color"]')
    meta?.setAttribute('content', candle ? '#16120e' : '#f1ece2')
  }, [candle])

  const setLights = (l: Lights) => {
    setLightsState(l)
    try {
      localStorage.setItem('baring-lights', l)
    } catch {
      /* storage unavailable */
    }
  }

  const value: TimeState = {
    real,
    moment,
    previewing: preview !== null,
    setPreview,
    status,
    lights,
    setLights,
    candle,
  }
  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>
}

export function useTime() {
  const ctx = useContext(TimeContext)
  if (!ctx) throw new Error('useTime outside TimeProvider')
  return ctx
}

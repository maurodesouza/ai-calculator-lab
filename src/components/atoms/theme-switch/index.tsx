'use client'

import * as React from 'react'

import { Moon, Sun } from 'lucide-react'

import { events } from '@events'
import { Clickable } from '@/components/atoms/clickable'
import { useThemeStore } from '@/hooks/use-theme-store'

type ThemeSwitchToggleProps = React.ComponentProps<'button'>

function ThemeSwitchToggle(props: ThemeSwitchToggleProps) {
  const theme = useThemeStore((state) => state.theme)

  function onClick() {
    events.theme.toggle()
  }

  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <Clickable.Button
      aria-label={label}
      tone="neutral"
      variant="ghost"
      onClick={onClick}
      {...props}
    >
      {theme === 'dark' ? <Sun aria-hidden /> : <Moon aria-hidden />}
    </Clickable.Button>
  )
}

export const ThemeSwitch = {
  Toggle: ThemeSwitchToggle,
}

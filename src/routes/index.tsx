import { createFileRoute } from '@tanstack/react-router'

import { Display } from '@/components/atoms/display'
import { ThemeSwitch } from '@/components/atoms/theme-switch'
import { Keypad } from '@/components/organisms/keypad'

export const Route = createFileRoute('/')({
  component: CalculatorPage,
})

function CalculatorPage() {
  return (
    <main className="base-1 grid min-h-screen place-items-center bg-background-base p-sm text-foreground sm:p-md">
      <div className="base-2 w-full max-w-xs rounded-2xl border border-ring-inner bg-background-base p-sm shadow-lg min-[320px]:max-w-sm min-[320px]:p-md">
        <div className="mb-sm flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground-min">AI Calculator</span>
          <ThemeSwitch.Toggle />
        </div>

        <Display.Container className="mb-md">
          <Display.Expression />
          <Display.Result />
        </Display.Container>

        <Keypad.Container>
          <Keypad.Key action="clear" tone="danger" variant="subtle">
            C
          </Keypad.Key>
          <Keypad.Key action="delete" tone="danger" variant="subtle">
            DEL
          </Keypad.Key>
          <Keypad.Key action="operator" value="/" tone="brand" variant="subtle">
            ÷
          </Keypad.Key>
          <Keypad.Key action="operator" value="*" tone="brand" variant="subtle">
            ×
          </Keypad.Key>

          <Keypad.Key action="digit" value="7">
            7
          </Keypad.Key>
          <Keypad.Key action="digit" value="8">
            8
          </Keypad.Key>
          <Keypad.Key action="digit" value="9">
            9
          </Keypad.Key>
          <Keypad.Key action="operator" value="-" tone="brand" variant="subtle">
            -
          </Keypad.Key>

          <Keypad.Key action="digit" value="4">
            4
          </Keypad.Key>
          <Keypad.Key action="digit" value="5">
            5
          </Keypad.Key>
          <Keypad.Key action="digit" value="6">
            6
          </Keypad.Key>
          <Keypad.Key action="operator" value="+" tone="brand" variant="subtle">
            +
          </Keypad.Key>

          <Keypad.Key action="digit" value="1">
            1
          </Keypad.Key>
          <Keypad.Key action="digit" value="2">
            2
          </Keypad.Key>
          <Keypad.Key action="digit" value="3">
            3
          </Keypad.Key>
          <Keypad.Key action="equals" tone="success" variant="solid">
            =
          </Keypad.Key>

          <Keypad.Key action="digit" value="0" className="col-span-2">
            0
          </Keypad.Key>
          <Keypad.Key action="decimal">.</Keypad.Key>
          <Keypad.Key action="equals" tone="success" variant="solid">
            =
          </Keypad.Key>
        </Keypad.Container>
      </div>
    </main>
  )
}

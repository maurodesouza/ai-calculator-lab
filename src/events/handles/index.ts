import { CalculatorHandleEvents } from './calculator'
import { ThemeHandleEvents } from './theme'

class Handles {
  calculator = new CalculatorHandleEvents()
  theme = new ThemeHandleEvents()
}

export { Handles }

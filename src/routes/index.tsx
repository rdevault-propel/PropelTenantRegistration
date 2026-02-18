import { createFileRoute } from '@tanstack/react-router'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Registration } from '@/pages/registration'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <TooltipProvider>
      <Registration />
    </TooltipProvider>
  )
}

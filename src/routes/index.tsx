import { createFileRoute } from '@tanstack/react-router'
import { Registration } from '@/components/registration/registration'
import { TooltipProvider } from '@/components/ui/tooltip'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <TooltipProvider>
      <Registration />
    </TooltipProvider>
  )
}

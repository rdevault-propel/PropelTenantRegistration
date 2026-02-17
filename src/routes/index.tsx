import { createFileRoute } from '@tanstack/react-router'
import { Registration } from '@/components/registration/registration'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <Registration />
  )
}

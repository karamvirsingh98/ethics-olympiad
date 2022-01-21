import { useAppState } from "../../state/hooks"
import { User } from "../../state/types"

export default function PageManager({ user }: { user: User }) {
  const { events, cases } = useAppState(user)
  
  return (
    <div>

    </div>
  )
}
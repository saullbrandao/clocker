import { Button } from "@chakra-ui/button"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuth } from "../components/Auth"

export default function Agenda() {
  const [auth, { logout }] = useAuth()
  const router = useRouter()

  useEffect(() => {
    !auth.user && router.push('/')
  }, [auth.user])

  return (
    <div>
      <Button onClick={logout}>Sair</Button>
    </div>
  )
}
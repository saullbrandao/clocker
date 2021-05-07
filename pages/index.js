import { Container } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../components/Auth";

export default function Home() {
  const [auth] = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!auth.loading) {
      auth.user ? router.push('/agenda') : router.push('/login')
    }
  }, [auth.user])

  return (
    <Container p={4} centerContent>
      <Spinner />
    </Container>
  )
}
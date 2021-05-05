import { Container } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useEffect, useState } from "react";
import { Agenda } from "../components/Agenda";
import { Login } from "../components/Login";
import { firebaseClient } from './../config/firebase/client'

export default function Home() {
  const [auth, setAuth] = useState({
    loading: true,
    user: false
  })

  useEffect(() => {
    firebaseClient.auth().onAuthStateChanged(user => {
      setAuth({
        loading: false,
        user
      })
    })
  }, [])

  if (auth.loading) {
    return (
      <Container p={4} centerContent>
        <Spinner />
      </Container>
    )
  }

  return auth.user ? <Agenda /> : <Login />
}
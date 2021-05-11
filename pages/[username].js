import { useEffect, useState } from "react"
import { useFetch } from "@refetty/react"
import { addDays, subDays, format } from "date-fns"
import { useRouter } from 'next/router'
import axios from "axios"


import { Container, Box, IconButton, SimpleGrid, Spinner, Button } from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"

import { Logo } from '../components/Logo'
import { formatDate } from "../components/Date"
import { TimeBlock } from '../components/TimeBlock'
import { useAuth } from "../components/Auth"

const getSchedule = async ({ when, username }) => {
  return axios({
    method: 'get',
    url: '/api/schedule',
    params: {
      date: format(when, 'yyyy-MM-dd'),
      username,
    }
  })
}

const Header = ({ children }) => {
  return (
    <Box
      p={4}
      display='flex'
      justifyContent='space-between'
      alignItems='center'
    >
      {children}
    </Box>
  )
}

export default function Schedule() {
  const router = useRouter()
  const [auth, { logout }] = useAuth()
  const [when, setWhen] = useState(() => new Date())
  const [data, { loading }, fetch] = useFetch(getSchedule, { lazy: true })

  const addDay = () => setWhen(prevState => addDays(prevState, 1))
  const subDay = () => setWhen(prevState => subDays(prevState, 1))

  const refresh = () => fetch({ when, username: router.query.username })

  useEffect(() => {
    !auth.user && router.push('/')
  }, [auth.user])

  useEffect(() => {
    refresh()
  }, [when, router.query.username])


  return (
    <Container>
      <Header>
        <Logo size={150} />
        <Box>
          <Button onClick={() => router.push('/agenda')} mr={4}>Agenda</Button>
          <Button onClick={logout}>Sair</Button>
        </Box>
      </Header>

      <Box mt={8} display='flex' alignItems='center'>
        <IconButton icon={<ChevronLeftIcon />} bg='transparent' onClick={subDay} />
        <Box flex={1} textAlign='center'>{formatDate(when, 'PPPP')}</Box>
        <IconButton icon={<ChevronRightIcon />} bg='transparent' onClick={addDay} />
      </Box>

      <SimpleGrid p={4} columns={2} spacing={4} >
        {loading && <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />}

        {data?.map(({ time, isBlocked }) => <TimeBlock key={time} time={time} date={when} disabled={isBlocked} onSuccess={refresh} />)}
      </SimpleGrid>

    </Container>
  )
}
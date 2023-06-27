import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../navbar'
import UserWidget from '../widgets/UserWidget'

function HomePage() {
  return (
    <Box>
      <Navbar></Navbar>

      <UserWidget></UserWidget>

    </Box>
  )
}

export default HomePage

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark'
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <ChakraProvider theme={theme}>
     <App />
   </ChakraProvider>
  </React.StrictMode>,
)

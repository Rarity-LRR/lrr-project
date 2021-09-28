import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getLibrary = (provider) => {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}


const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{marginTop:"10px"}}
        toastStyle={{wordBreak:"break-word",maxHeight:"500px"}}
      />
      {children}
    </Web3ReactProvider>
  )
}

export default Providers

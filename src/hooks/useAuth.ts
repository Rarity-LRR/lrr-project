import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import { toast } from "react-toastify"

const chain = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
const injected = new InjectedConnector({ supportedChainIds: [chain] })

const setupNetwork = async () => {
  const provider = window.ethereum;
  if (provider) {
    const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`
          },
        ],
      })
      return true
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error)
      return false
    }
  } else {
    console.error("Can't setup the Polygon Mumbai-Testnet network on metamask because window.ethereum is undefined")
    return false
  }
}

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()

  const login = useCallback(
    () => {
      const connector = injected
      if (connector) {
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork()
            if (hasSetup) {
              activate(connector)
            } else {
              toast.error('Metamask not Network config')
            }
          }
          else {
            if (error instanceof NoEthereumProviderError) {
              // Provider Error: No provider was found
              toast.error('Provider Error: No provider was found')
            }
            else if (
              error instanceof UserRejectedRequestErrorInjected
            ) {
              // Authorization Error: Please authorize to access your account
              toast.error('Authorization Error: Please authorize to access your account')
            }
            else {
              toast.error(`${error.name}, ${error.message}`)
            }
          }
        })
      }
    }, [activate]
  )

  const logout = useCallback(() => {
    deactivate()
  }, [deactivate])

  return { login, logout }
}

export default useAuth

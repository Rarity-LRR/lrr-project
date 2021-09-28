import { useMemo,useRef,useState,useEffect } from 'react'
import {ethers} from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'
import sample from 'lodash/sample'
// Imports below migrated from Exchange useContract.ts
import ERC20_ABI from 'config/abi/erc20.json'
import { getContract } from 'utils'
import { toast } from "react-toastify"

const chain = [process.env.REACT_APP_CHAIN_ID]
const nodes = [process.env.REACT_APP_NODE_1]
const RPC_URL = sample(nodes)
const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL)

const useActiveWeb3React = () => {
  const { library, chainId, ...web3React } = useWeb3React();
  const refEth = useRef(library);
  const [provider, setprovider] = useState(library || simpleRpcProvider);

  useEffect(() => {
    if (library !== refEth.current) {
      setprovider(library || simpleRpcProvider);
      refEth.current = library
    }
  }, [library]);

  return { library: provider, chainId: chainId ?? chain, ...web3React }
}

export default useActiveWeb3React


// returns null on errors
function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()
  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      toast.error(JSON.stringify(error))
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export const useERC20 = (address: string, withSignerIfPossible?: boolean) => {
  return useContract(address, ERC20_ABI, withSignerIfPossible)
}
import React, { useState } from "react";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { useERC20 } from 'hooks/useContract'
import { toast } from "react-toastify"
import {RarityRingRewards} from 'config/constants/contracts'
import {spiritLP} from 'config/constants/tokens'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 80px 20%;

    button {
        font-size: 36px;
        padding: 8px 12px;
    }
`

const Home: React.FC = () => {
    const contract = useERC20(spiritLP)

    const handleApprove = async (e) => {
        try{
            const tx = await contract.approve(RarityRingRewards,'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff').catch((error) => {
                throw error
            })
            const receipt = await tx.wait()
                if (receipt.status) {
                    toast.success('approve success')
                }else{
                    toast.error('approve fail')
            }
        }catch(error){
            const errStr = JSON.stringify(error)
            toast.error(errStr)
        }
    }

    return (
        <Wrapper>
            <button onClick={handleApprove}>Approve</button>
        </Wrapper>
    )
}

export default Home
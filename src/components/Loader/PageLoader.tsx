import React from 'react'
import styled, { keyframes } from 'styled-components'
import imgLoading from 'assets/images/loading.png'

const SpinnerAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: white;
`

const Spinner = styled.div`
  animation: ${SpinnerAnimation} 3s infinite linear;

  img {
    width: 72px;
    height: 72px;
    background-size: cover;
    background-position: center;
  }
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      <Spinner>
        <img src={imgLoading} alt="" />
      </Spinner>
    </Wrapper>
  )
}

export default PageLoader

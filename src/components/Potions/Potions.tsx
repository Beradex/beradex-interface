import React from 'react'
import styled, { keyframes } from 'styled-components'
import Icon1 from '../../assets/images/icon_01.png'
import Icon2 from '../../assets/images/icon_02.png'
import Icon3 from '../../assets/images/icon_03.png'
import Icon4 from '../../assets/images/icon_04.png'
import Icon5 from '../../assets/images/icon_05.png'

const Image = styled.img<{ width: number; height: number }>`
  display: inline-block;
  max-width: ${(props) => (props.width ? props.width : 50)}px;
  max-height: ${(props) => (props.height ? props.height : 50)}px;
  width: 100%;
  height: auto;
  object-fit: contain;
  //object-position: 100% 10%;
  //flex-shrink: 0;
  vertical-align: sub;
  margin-left: -10px;
  margin-right: +10px;
`

export const BeraIcon = (props: any) => <Image width={props.width} height={props.width} src={Icon1} />
export const BeraIcon2 = (props: any) => <Image width={props.width} height={props.width} src={Icon2} />
export const BeraIcon3 = (props: any) => <Image width={props.width} height={props.width} src={Icon3} />
export const BeraIcon4 = (props: any) => <Image width={props.width} height={props.width} src={Icon4} />
export const BeraIcon5 = (props: any) => <Image width={props.width} height={props.width} src={Icon5} />

const bunnyFall = keyframes`
  0% {
    opacity: 1;
    transform: translate(0, -100%) rotateZ(0deg);
  }
  75% {
    opacity: 1;
    transform: translate(100px, 75vh) rotateZ(270deg);
  }
  100% {
    opacity: 0;
    transform: translate(150px, 100vh) rotateZ(360deg);
  }
`

const Potion = styled.div<{ position: any; duration: any; iterations: any }>`
  display: inline-flex;
  position: fixed;
  top: 0;
  left: ${({ position }) => `${position}vw`};
  transform: translate3d(0, -100%, 0);
  user-select: none;
  pointer-events: none;
  z-index: 99999;
  animation-name: ${bunnyFall};
  animation-duration: ${({ duration }) => `${duration}s`};
  animation-timing-function: linear;
  animation-iteration-count: ${({ iterations }) => (Number.isFinite(iterations) ? String(iterations) : 'infinite')};
  animation-play-state: running;
  &:nth-child(5n + 5) {
    animation-delay: ${({ duration }) => `${(duration / 10) * 1.3}s`};
  }
  &:nth-child(3n + 2) {
    animation-delay: ${({ duration }) => `${(duration / 10) * 1.5}s`};
  }
  &:nth-child(2n + 5) {
    animation-delay: ${({ duration }) => `${(duration / 10) * 1.7}s`};
  }
  &:nth-child(3n + 10) {
    animation-delay: ${({ duration }) => `${(duration / 10) * 2.7}s`};
  }
  &:nth-child(7n + 2) {
    animation-delay: ${({ duration }) => `${(duration / 10) * 3.5}s`};
  }
  &:nth-child(4n + 5) {
    animation-delay: ${({ duration }) => `${(duration / 10) * 5.5}s`};
  }
  &:nth-child(3n + 7) {
    animation-delay: ${({ duration }) => `${(duration / 10) * 8}s`};
  }
`

// eslint-disable-next-line react/prop-types
export const ThrowPotions = ({ count = 30, size = 32, iterations = Infinity, duration = 10 }) => {
  const potions = [...Array(count)].map((_, index) => (
    <div key={String(index)}>
      <Potion key={String(index)} position={Math.random() * 100} iterations={iterations} duration={duration}>
        <BeraIcon width={size} height={size} />
      </Potion>
      <Potion key={String(index)} position={Math.random() * 100} iterations={iterations} duration={duration}>
        <BeraIcon2 width={size} height={size} />
      </Potion>
      <Potion key={String(index)} position={Math.random() * 100} iterations={iterations} duration={duration}>
        <BeraIcon3 width={size} height={size} />
      </Potion>
      <Potion key={String(index)} position={Math.random() * 100} iterations={iterations} duration={duration}>
        <BeraIcon4 width={size} height={size} />
      </Potion>
    </div>
  ))

  return <div>{potions}</div>
}

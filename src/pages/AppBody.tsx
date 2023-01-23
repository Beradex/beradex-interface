import React from 'react'
import styled, { css } from 'styled-components/macro'

export const Glow = css`
  // animation: glow 10s ease-in-out infinite;
  // -webkit-animation: glow 10s ease-in-out infinite;

  //box-shadow: 0 0 20px rgba(201, 114, 0, 0), 0 0 30px rgba(201, 114, 0, 0), 0 0 40px rgba(201, 114, 0, 0),
  //  0 0 50px rgba(201, 114, 0, 0), 0 0 60px rgba(201, 114, 0, 0), 0 0 70px rgba(201, 114, 0, 0),
  //  0 0 80px rgba(201, 114, 0, 0);

  box-shadow: 0 0 10px rgba(201, 114, 0, 0), 0 0 15px rgba(201, 114, 0, 0), 0 0 20px rgba(201, 114, 0, 0),
    0 0 25px rgba(201, 114, 0, 0), 0 0 30px rgba(201, 114, 0, 0), 0 0 45px rgba(201, 114, 0, 0),
    0 0 40px rgba(201, 114, 0, 0);

  @keyframes glow {
    0% {
      box-shadow: 0 0 5px rgba(201, 114, 0, 0), 0 0 8px rgba(201, 114, 0, 0), 0 0 10px rgba(201, 114, 0, 0),
        0 0 17px rgba(201, 114, 0, 0), 0 0 15px rgba(201, 114, 0, 0), 0 0 18px rgba(201, 114, 0, 0),
        0 0 20px rgba(201, 114, 0, 0);
    }
    50% {
      //  box-shadow: 0 0 20px rgba(201, 114, 0, 0), 0 0 30px rgba(201, 114, 0, 0), 0 0 40px rgba(201, 114, 0, 0),
      //  0 0 50px rgba(201, 114, 0, 0), 0 0 60px rgba(201, 114, 0, 0), 0 0 70px rgba(201, 114, 0, 0),
      //  0 0 80px rgba(201, 114, 0, 0);
      //box-shadow: 0 0 20px rgba(205, 113, 0, 0.15), 0 0 30px rgba(205, 113, 0, 0.15),
      //  0 0 40px rgba(205, 113, 0, 0.15), 0 0 50px rrgba(205, 113, 0, 0.2), 0 0 60px rrgba(205, 113, 0, 0.2),
      //  0 0 70px rrgba(205, 113, 0, 0.3), 0 0 80px rrgba(205, 113, 0, 0.3);
      box-shadow: 0 0 20px rgba(201, 114, 0, 0), 0 0 30px rgba(201, 114, 0, 0), 0 0 40px rgba(201, 114, 0, 0),
        0 0 50px rgba(201, 114, 0, 0), 0 0 60px rgba(201, 114, 0, 0), 0 0 70px rgba(201, 114, 0, 0),
        0 0 80px rgba(201, 114, 0, 0);
    }
    100% {
      //box-shadow: 0 0 20px rgba(201, 114, 0, 0), 0 0 30px rgba(201, 114, 0, 0), 0 0 40px rgba(201, 114, 0, 0),
      //  0 0 50px rgba(201, 114, 0, 0), 0 0 60px rgba(201, 114, 0, 0), 0 0 70px rgba(201, 114, 0, 0),
      //  0 0 80px rgba(201, 114, 0, 0);
      //box-shadow: 0 0 10px rgba(201, 114, 0, 0), 0 0 15px rgba(201, 114, 0, 0), 0 0 20px rgba(201, 114, 0, 0),
      //  0 0 25px rgba(201, 114, 0, 0), 0 0 30px rgba(201, 114, 0, 0), 0 0 45px rgba(201, 114, 0, 0),
      //  0 0 40px rgba(201, 114, 0, 0);
      box-shadow: 0 0 5px rgba(201, 114, 0, 0), 0 0 8px rgba(201, 114, 0, 0), 0 0 10px rgba(201, 114, 0, 0),
        0 0 17px rgba(201, 114, 0, 0), 0 0 15px rgba(201, 114, 0, 0), 0 0 18px rgba(201, 114, 0, 0),
        0 0 20px rgba(201, 114, 0, 0);
      //box-shadow: 0 0 20px rrgba(205, 113, 0, 0.2), 0 0 30px rrgba(205, 113, 0, 0.2), 0 0 40px rrgba(205, 113, 0, 0.2),
      //  0 0 50px rrgba(205, 113, 0, 0.6), 0 0 60px rrgba(205, 113, 0, 0.6), 0 0 70px rrgba(205, 113, 0, 0.6),
      //  0 0 80px rrgba(205, 113, 0, 0.6);
    }
  }

  @-webkit-keyframes glow {
    0% {
      //box-shadow: 0 0 20px rgba(201, 114, 0, 0), 0 0 30px rgba(201, 114, 0, 0), 0 0 40px rgba(201, 114, 0, 0),
      //0 0 50px rgba(201, 114, 0, 0), 0 0 60px rgba(201, 114, 0, 0), 0 0 70px rgba(201, 114, 0, 0),
      //0 0 80px rgba(201, 114, 0, 0);
    }
    //50% {
    //  box-shadow: 0 0 20px 3px rgba(205, 113, 0, 0.4) inset;
    //}
    100% {
      //box-shadow: 0 0 20px rrgba(205, 113, 0, 0.2), 0 0 30px rrgba(205, 113, 0, 0.2), 0 0 40px rrgba(205, 113, 0, 0.2),
      //0 0 50px rrgba(205, 113, 0, 0.6), 0 0 60px rrgba(205, 113, 0, 0.6), 0 0 70px rrgba(205, 113, 0, 0.6),
      //0 0 80px rrgba(205, 113, 0, 0.6);
    }
  }
`

export const BodyWrapper = styled.div<{ margin?: string }>`
  position: relative;
  margin-top: ${({ margin }) => margin ?? '0px'};
  max-width: 480px;
  width: 100%;
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.darkTransparent3} 0%, ${theme.dark2} 50%, ${theme.darkTransparent3} 100%);`};
  border-radius: 10px;
  margin-top: 1rem;
  border: 1px solid rgba(163, 163, 163, 0.3);
  backdrop-filter: blur(4px) saturate(150%);
  ${Glow}
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children, ...rest }: { children: React.ReactNode }) {
  return <BodyWrapper {...rest}>{children}</BodyWrapper>
}

import * as React from "react";
import styled from "styled-components";

import { ThemeColors } from "../helpers";
import {
  PROVIDER_WRAPPER_CLASSNAME,
  PROVIDER_CONTAINER_CLASSNAME,
  PROVIDER_ICON_CLASSNAME,
  PROVIDER_NAME_CLASSNAME,
} from "../constants";

const SIcon = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  border-radius: 50%;
  overflow: visible;
  box-shadow: none;
  justify-content: center;
  align-items: center;
  & img {
    width: 100%;
    height: 100%;
  }

`;

interface IStyedThemeColorOptions {
  themeColors: ThemeColors;
}

const SName = styled.div<IStyedThemeColorOptions>`
  width: 100%;
  font-size: 18px;
  padding-right: 15px;
  color: ${({ themeColors }) => themeColors.main};
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const SProviderContainer = styled.div<IStyedThemeColorOptions>`
  transition: background-color 0.2s ease-in-out;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #F3F4F6;
  border-radius: 20px;
  padding: 22px 25px;

  @media screen and (max-width: 768px) {
    padding: 12px 32px;
  }

  @media (hover:hover) {
    &:hover {
      border: 2px solid black;
    }
  }
    
`;

const SProviderWrapper = styled.div<IStyedThemeColorOptions>`
  width: 90%;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  border-radius: 20px;
  @media screen and (max-width: 768px) {
    width:100%;
  }
  
`;

interface IProviderProps {
  name: string;
  logo: string;
  description: string;
  themeColors: ThemeColors;
  onClick: () => void;
}

export function Provider(props: IProviderProps) {
  const {
    name,
    logo,
    description,
    themeColors,
    onClick,
    ...otherProps
  } = props;
  return (
    <SProviderWrapper
      themeColors={themeColors}
      className={PROVIDER_WRAPPER_CLASSNAME}
      onClick={onClick}
      {...otherProps}
    >
      <SProviderContainer
        themeColors={themeColors}
        className={PROVIDER_CONTAINER_CLASSNAME}
      >
        <SIcon className={PROVIDER_ICON_CLASSNAME}>
          <img src={logo} alt={name} />
        </SIcon>
        <SName themeColors={themeColors} className={PROVIDER_NAME_CLASSNAME}>
          {name}
        </SName>
      </SProviderContainer>
    </SProviderWrapper>
  );
}

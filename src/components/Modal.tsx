import * as React from "react";

import { Provider } from "./Provider";
import {
  MODAL_LIGHTBOX_CLASSNAME,
  MODAL_CONTAINER_CLASSNAME,
  MODAL_HITBOX_CLASSNAME,
  MODAL_CARD_CLASSNAME,
  MODAL_PROVIDERS_INFO_MESSAGE_CLASSNAME,
  MODAL_PROVIDERS_CONTAINER_CLASSNAME
} from "../constants";
import {
  SimpleFunction,
  IProviderUserOptions,
  ThemeColors,
  styled
} from "../helpers";
import { X, ArrowLeft } from "react-feather";

declare global {
  // tslint:disable-next-line
  interface Window {
    ethereum: any;
    BinanceChain: any;
    web3: any;
    celo: any;
    updateWeb3Modal: any;
  }
}

interface ILightboxStyleProps {
  show: boolean;
  offset: number;
  opacity?: number;
}

const SLightbox = styled.div<ILightboxStyleProps>`
  transition: opacity 0.1s ease-in-out;
  text-align: center;
  position: fixed;
  width: 100%;
  height: 100%;
  margin-left: -50vw;
  top: ${({ offset }) => (offset ? `-${offset}px` : 0)};
  left: 50%;
  z-index: 2;
  will-change: opacity;
  background-color: ${({ opacity }) => {
    let alpha = 0.4;
    if (typeof opacity === "number") {
      alpha = opacity;
    }
    return `rgba(0, 0, 0, ${alpha})`;
  }};
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  pointer-events: ${({ show }) => (show ? "auto" : "none")};
  display: flex;
  justify-content: center;
  align-items: center;

  & * {
    box-sizing: border-box !important;
  }
`;

interface IModalContainerStyleProps {
  show: boolean;
}

const SModalContainer = styled.div<IModalContainerStyleProps>`
  position: relative;
  width: 500px;
  height: 100%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  pointer-events: ${({ show }) => (show ? "auto" : "none")};
  @media screen and (max-width: 768px) {
    width: 100vw;
    max-width: 450px;
  }
`;

const SHitbox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

interface IModalCardStyleProps {
  show: boolean;
  themeColors: ThemeColors;
  maxWidth?: number;
}

const SModalCard = styled.div<IModalCardStyleProps>`
  position: relative;
  width: 100%;
  background-color: ${({ themeColors }) => themeColors.background};
  border-radius: 12px;
  margin: 10px;
  padding-bottom: 10px;
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  pointer-events: ${({ show }) => (show ? "auto" : "none")};
  display: flex;
  flex-direction: column;
  max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : "800px")};
  min-width: fit-content;
  max-height: 100%;
  overflow: auto;
  font-size: 14px;

  & p {
    color: var(--chakra-colors-grey-900);
    opacity: 0.5;
  }
  @media screen and (max-width: 768px) {
    position: absolute;
    bottom: 0;
    max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : "500px")};
    grid-template-columns: 1fr;
    margin: 0;
  }
`;

const ModalHeader = styled.div`
  position: relative;
  text-align: center;
  padding: 1rem 0;
  fontsize: 1.125rem;
  fontweight: bold;
  border-bottom: 1px solid #e5e6eb;
  & > h1 {
    font-family: "Druk Wide Cy" !important;
    font-size: 14px;
  }
`;

const ModalClose = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding: 0.2rem;
  right: 0.8rem;
  top: 22%;
  width: fit-content;
  border-radius: 100px;
  background: transparent;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      background-color: rgba(44, 122, 123, 0.1);
    }
  }

  @media screen and (max-width: 768px) {
    top: 20%;
  }
`;

const Back = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding: 0.2rem;
  left: 0.8rem;
  top: 33%;
  width: fit-content;
  border-radius: 100px;
  background: transparent;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      background-color: rgba(44, 122, 123, 0.1);
    }
  }
`;

const Info = styled.p`
  font-size: 12px;
  margin: 1rem 0 2rem;
  color: #4a5568;
`;
const InfoWallet = styled.p`
  text-align: left;
  font-size: 14px;
  margin: 1rem 0 1rem;
  color: #4a5568;
  padding: 0.5rem 2rem;
`;
const ProviderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0.5rem;
`;

const Wallet = styled.button`
  width: fit-content;
  margin: 0.5rem auto ;
  padding: 1rem 2.5rem;
  color: rgba(74, 85, 104, 0.6);
  font-size: 16px;
  border-radius: 20px;
  background: transparent;
  cursor: pointer;
  @media (hover: hover) {
    &:hover  {
      background-color: #f3f4f6;
    }
`;

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

const SProviderContainer = styled.a<IStyedThemeColorOptions>`
  transition: background-color 0.2s ease-in-out;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #f3f4f6;
  border-radius: 20px;
  padding: 22px 25px;
  margin: 0;
  border: 2px solid transparent;

  @media screen and (max-width: 768px) {
    padding: 12px 32px;
  }

  @media (hover: hover) {
    &:hover {
      border-color: black;
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
    width: 100%;
  }
`;
interface IModalProps {
  themeColors: ThemeColors;
  userOptions: IProviderUserOptions[];
  onClose: SimpleFunction;
  resetState: SimpleFunction;
  lightboxOpacity: number;
  providersInfoMessage?: boolean | string;
}

interface IModalState {
  show: boolean;
  lightboxOffset: number;
  step2: boolean;
}

const INITIAL_STATE: IModalState = {
  show: false,
  step2: false,
  lightboxOffset: 0
};

const defaultProvidersInfoMessage = "Hardware wallets unsupported at this time";

const WalletProviders = ({
  userOptions,
  onClick,
  themeColors,
  providersInfoMessage = defaultProvidersInfoMessage
}: {
  userOptions: IProviderUserOptions[];
  onClick: () => void;
  themeColors: ThemeColors;
  providersInfoMessage?: boolean | string;
}) => (
  <ProviderContainer className={MODAL_PROVIDERS_CONTAINER_CLASSNAME}>
    {providersInfoMessage ? (
      <Info className={MODAL_PROVIDERS_INFO_MESSAGE_CLASSNAME}>
        {providersInfoMessage === true
          ? defaultProvidersInfoMessage
          : providersInfoMessage}
      </Info>
    ) : null}
    {userOptions.map(provider =>
      !!provider ? (
        <Provider
          themeColors={themeColors}
          name={provider.name}
          logo={provider.logo}
          description={provider.description}
          onClick={provider.onClick}
        />
      ) : null
    )}
    <Wallet onClick={onClick}>I don't have a wallet</Wallet>
  </ProviderContainer>
);

const SetUpWallet = ({ themeColors }: { themeColors: ThemeColors }) => (
  <ProviderContainer>
    <InfoWallet>
      Sound.xyz is compatible with any Ethereum wallet. We recommend Metamask on
      desktop and Android, and Rainbow on iOS.
    </InfoWallet>
    <SProviderWrapper themeColors={themeColors}>
      <SProviderContainer
        themeColors={themeColors}
        href="https://metamask.io/download/"
        target="_blank"
      >
        <SIcon>
          <img src="https://www.sound.xyz/icons/metamask.svg" alt="Metmask" />
        </SIcon>
        <SName themeColors={themeColors}>MetaMask</SName>
      </SProviderContainer>
    </SProviderWrapper>
    <SProviderWrapper themeColors={themeColors}>
      <SProviderContainer
        themeColors={themeColors}
        href="https://rainbow.me"
        target="_blank"
      >
        <SIcon>
          <img
            src="https://www.sound.xyz/icons/rainbowWallet.png"
            alt="Rainbow"
          />
        </SIcon>
        <SName themeColors={themeColors}>Rainbow</SName>
      </SProviderContainer>
    </SProviderWrapper>
  </ProviderContainer>
);

export class Modal extends React.Component<IModalProps, IModalState> {
  constructor(props: IModalProps) {
    super(props);
    window.updateWeb3Modal = async (state: IModalState) => {
      this.setState(state);
    };
  }

  public lightboxRef?: HTMLDivElement | null;
  public mainModalCard?: HTMLDivElement | null;

  public state: IModalState = {
    ...INITIAL_STATE
  };

  public componentDidUpdate(prevProps: IModalProps, prevState: IModalState) {
    if (prevState.show && !this.state.show) {
      this.props.resetState();
    }
    if (this.lightboxRef) {
      const lightboxRect = this.lightboxRef.getBoundingClientRect();
      const lightboxOffset = lightboxRect.top > 0 ? lightboxRect.top : 0;

      if (
        lightboxOffset !== INITIAL_STATE.lightboxOffset &&
        lightboxOffset !== this.state.lightboxOffset
      ) {
        this.setState({ lightboxOffset });
      }
    }
  }

  public render = () => {
    const { show, lightboxOffset, step2 } = this.state;

    const {
      onClose,
      lightboxOpacity,
      userOptions,
      themeColors,
      providersInfoMessage
    } = this.props;

    return (
      <SLightbox
        className={MODAL_LIGHTBOX_CLASSNAME}
        offset={lightboxOffset}
        opacity={lightboxOpacity}
        ref={c => (this.lightboxRef = c)}
        show={show}
      >
        <SModalContainer className={MODAL_CONTAINER_CLASSNAME} show={show}>
          <SHitbox className={MODAL_HITBOX_CLASSNAME} onClick={onClose} />
          <SModalCard
            className={MODAL_CARD_CLASSNAME}
            show={show}
            themeColors={themeColors}
            maxWidth={userOptions.length < 3 ? 500 : 800}
            ref={c => (this.mainModalCard = c)}
          >
            <ModalHeader>
              {step2 && (
                <Back
                  onClick={() => {
                    this.setState(state => ({
                      step2: !state.step2
                    }));
                  }}
                >
                  <ArrowLeft />
                </Back>
              )}
              <h1>{step2 ? "Recommended Wallets" : "Connect Wallet"}</h1>
              <ModalClose onClick={onClose}>
                <X />
              </ModalClose>
            </ModalHeader>
            {step2 ? (
              <SetUpWallet themeColors={themeColors} />
            ) : (
              <WalletProviders
                userOptions={userOptions}
                onClick={() => {
                  this.setState(state => ({
                    step2: !state.step2
                  }));
                }}
                themeColors={themeColors}
                providersInfoMessage={providersInfoMessage}
              />
            )}
          </SModalCard>
        </SModalContainer>
      </SLightbox>
    );
  };
}

import * as React from 'react'

import { Provider } from './Provider'
import {
  MODAL_LIGHTBOX_CLASSNAME,
  MODAL_CONTAINER_CLASSNAME,
  MODAL_HITBOX_CLASSNAME,
  MODAL_CARD_CLASSNAME,
  MODAL_PROVIDERS_INFO_MESSAGE_CLASSNAME,
  MODAL_PROVIDERS_CONTAINER_CLASSNAME,
} from '../constants'
import {
  SimpleFunction,
  IProviderUserOptions,
  ThemeColors,
  styled,
} from '../helpers'
import { X, ArrowLeft } from 'react-feather'

declare global {
  // tslint:disable-next-line
  interface Window {
    ethereum: any
    BinanceChain: any
    web3: any
    celo: any
    updateWeb3Modal: any
  }
}

interface ILightboxStyleProps {
  show: boolean
  offset: number
  opacity?: number
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
    let alpha = 0.4
    if (typeof opacity === 'number') {
      alpha = opacity
    }
    return `rgba(0, 0, 0, ${alpha})`
  }};
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
  display: flex;
  justify-content: center;
  align-items: center;

  & * {
    box-sizing: border-box !important;
  }
`

interface IModalContainerStyleProps {
  show: boolean
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
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
  @media screen and (max-width: 768px) {
    width: 100vw;
    max-width: 450px;
  }
`

const SHitbox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

interface IModalCardStyleProps {
  show: boolean
  themeColors: ThemeColors
  maxWidth?: number
}

const SModalCard = styled.div<IModalCardStyleProps>`
  position: relative;
  width: 100%;
  background-color: ${({ themeColors }) => themeColors.background};
  border-radius: 12px;
  margin: 10px;
  padding-bottom: 10px;
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
  display: flex;
  flex-direction: column;
  max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : '800px')};
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
    max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : '500px')};
    grid-template-columns: 1fr;
    margin: 0;
  }
`

const ModalHeader = styled.div`
  position: relative;
  text-align: center;
  padding: 1rem 0;
  fontsize: 1.125rem;
  fontweight: bold;
  border-bottom: 1px solid #e5e6eb;
  & > h1 {
    font-family: 'Druk Wide Cy' !important;
    font-size: 14px;
  }
`

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
`

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
`

const Info = styled.p`
  font-size: 12px;
  margin: 1rem 0 2rem;
  color: #4a5568;
`
const InfoWallet = styled.p`
  text-align: left;
  font-size: 14px;
  margin: 1rem 0 1rem;
  color: #4a5568;
  padding: 0.5rem 2rem;
`
const ProviderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0.5rem;
`

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
`

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
`

interface IStyedThemeColorOptions {
  themeColors: ThemeColors
}

const SName = styled.div<IStyedThemeColorOptions>`
  width: 100%;
  font-size: 18px;
  padding-right: 15px;
  color: ${({ themeColors }) => themeColors.main};
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`

const AProviderContainer = styled.a<IStyedThemeColorOptions>`
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
`

const SProviderContainer = styled.div<IStyedThemeColorOptions>`
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
`

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
`
interface IModalProps {
  themeColors: ThemeColors
  userOptions: IProviderUserOptions[]
  onClose: SimpleFunction
  resetState: SimpleFunction
  lightboxOpacity: number
  providersInfoMessage?: boolean | string
}

type StepState = 'main' | 'recommend' | 'no-metamask'

interface IModalState {
  show: boolean
  lightboxOffset: number
  step2: StepState
}

const INITIAL_STATE: IModalState = {
  show: false,
  step2: 'main',
  lightboxOffset: 0,
}

const defaultProvidersInfoMessage = 'Hardware wallets unsupported at this time'

const WalletProviders = ({
  userOptions,
  onClick,
  themeColors,
  providersInfoMessage = defaultProvidersInfoMessage,
}: {
  userOptions: IProviderUserOptions[]
  onClick: (state: StepState) => void
  themeColors: ThemeColors
  providersInfoMessage?: boolean | string
}) => {
  const hasMetamask = !!userOptions.find(({ name }) => name === 'MetaMask')
  const Metamask = {
    name: 'MetaMask',
    logo:
      "data:image/svg+xml,%3csvg height='355' viewBox='0 0 397 355' width='397' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd' transform='translate(-1 -1)'%3e%3cpath d='m114.622644 327.195472 52.004717 13.810198v-18.05949l4.245283-4.249292h29.716982v21.246459 14.872523h-31.839624l-39.268868-16.997169z' fill='%23cdbdb2'/%3e%3cpath d='m199.528305 327.195472 50.943397 13.810198v-18.05949l4.245283-4.249292h29.716981v21.246459 14.872523h-31.839623l-39.268868-16.997169z' fill='%23cdbdb2' transform='matrix(-1 0 0 1 483.96227 0)'/%3e%3cpath d='m170.872644 287.889523-4.245283 35.056657 5.306604-4.249292h55.18868l6.367925 4.249292-4.245284-35.056657-8.490565-5.311615-42.452832 1.062323z' fill='%23393939'/%3e%3cpath d='m142.216984 50.9915022 25.471698 59.4900858 11.674528 173.158643h41.391511l12.735849-173.158643 23.349056-59.4900858z' fill='%23f89c35'/%3e%3cpath d='m30.7783023 181.657226-29.71698153 86.048161 74.29245393-4.249293h47.7594343v-37.181303l-2.122641-76.487253-10.613208 8.498583z' fill='%23f89d35'/%3e%3cpath d='m87.0283032 191.218134 87.0283028 2.124646-9.551886 44.617563-41.391511-10.623229z' fill='%23d87c30'/%3e%3cpath d='m87.0283032 192.280457 36.0849058 33.994334v33.994334z' fill='%23ea8d3a'/%3e%3cpath d='m123.113209 227.337114 42.452831 10.623229 13.79717 45.679888-9.551886 5.311615-46.698115-27.620398z' fill='%23f89d35'/%3e%3cpath d='m123.113209 261.331448-8.490565 65.864024 56.25-39.305949z' fill='%23eb8f35'/%3e%3cpath d='m174.056606 193.34278 5.306604 90.297451-15.919812-46.211049z' fill='%23ea8e3a'/%3e%3cpath d='m74.2924539 262.393771 48.8207551-1.062323-8.490565 65.864024z' fill='%23d87c30'/%3e%3cpath d='m24.4103777 355.878193 90.2122663-28.682721-40.3301901-64.801701-73.23113313 5.311616z' fill='%23eb8f35'/%3e%3cpath d='m167.688682 110.481588-45.636793 38.243627-35.0235858 42.492919 87.0283028 3.186969z' fill='%23e8821e'/%3e%3cpath d='m114.622644 327.195472 56.25-39.305949-4.245283 33.994334v19.121813l-38.207548-7.43626z' fill='%23dfcec3'/%3e%3cpath d='m229.245286 327.195472 55.18868-39.305949-4.245283 33.994334v19.121813l-38.207548-7.43626z' fill='%23dfcec3' transform='matrix(-1 0 0 1 513.679252 0)'/%3e%3cpath d='m132.665096 212.464593-11.674528 24.433427 41.39151-10.623229z' fill='%23393939' transform='matrix(-1 0 0 1 283.372646 0)'/%3e%3cpath d='m23.349057 1.06232296 144.339625 109.41926504-24.410378-59.4900858z' fill='%23e88f35'/%3e%3cpath d='m23.349057 1.06232296-19.10377392 58.42776294 10.61320772 63.7393781-7.42924541 4.249292 10.61320771 9.560906-8.49056617 7.436261 11.67452847 10.623229-7.4292454 6.373938 16.9811323 21.246459 79.5990577-24.433428c38.915096-31.161473 58.018869-47.096318 57.311322-47.804533-.707548-.708215-48.820756-37.1813036-144.339625-109.41926504z' fill='%238e5a30'/%3e%3cg transform='matrix(-1 0 0 1 399.056611 0)'%3e%3cpath d='m30.7783023 181.657226-29.71698153 86.048161 74.29245393-4.249293h47.7594343v-37.181303l-2.122641-76.487253-10.613208 8.498583z' fill='%23f89d35'/%3e%3cpath d='m87.0283032 191.218134 87.0283028 2.124646-9.551886 44.617563-41.391511-10.623229z' fill='%23d87c30'/%3e%3cpath d='m87.0283032 192.280457 36.0849058 33.994334v33.994334z' fill='%23ea8d3a'/%3e%3cpath d='m123.113209 227.337114 42.452831 10.623229 13.79717 45.679888-9.551886 5.311615-46.698115-27.620398z' fill='%23f89d35'/%3e%3cpath d='m123.113209 261.331448-8.490565 65.864024 55.18868-38.243626z' fill='%23eb8f35'/%3e%3cpath d='m174.056606 193.34278 5.306604 90.297451-15.919812-46.211049z' fill='%23ea8e3a'/%3e%3cpath d='m74.2924539 262.393771 48.8207551-1.062323-8.490565 65.864024z' fill='%23d87c30'/%3e%3cpath d='m24.4103777 355.878193 90.2122663-28.682721-40.3301901-64.801701-73.23113313 5.311616z' fill='%23eb8f35'/%3e%3cpath d='m167.688682 110.481588-45.636793 38.243627-35.0235858 42.492919 87.0283028 3.186969z' fill='%23e8821e'/%3e%3cpath d='m132.665096 212.464593-11.674528 24.433427 41.39151-10.623229z' fill='%23393939' transform='matrix(-1 0 0 1 283.372646 0)'/%3e%3cpath d='m23.349057 1.06232296 144.339625 109.41926504-24.410378-59.4900858z' fill='%23e88f35'/%3e%3cpath d='m23.349057 1.06232296-19.10377392 58.42776294 10.61320772 63.7393781-7.42924541 4.249292 10.61320771 9.560906-8.49056617 7.436261 11.67452847 10.623229-7.4292454 6.373938 16.9811323 21.246459 79.5990577-24.433428c38.915096-31.161473 58.018869-47.096318 57.311322-47.804533-.707548-.708215-48.820756-37.1813036-144.339625-109.41926504z' fill='%238e5a30'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e",
    description: 'Connect to your MetaMask Wallet',
  }

  return (
    <ProviderContainer className={MODAL_PROVIDERS_CONTAINER_CLASSNAME}>
      {providersInfoMessage ? (
        <Info className={MODAL_PROVIDERS_INFO_MESSAGE_CLASSNAME}>
          {providersInfoMessage === true
            ? defaultProvidersInfoMessage
            : providersInfoMessage}
        </Info>
      ) : null}
      {!hasMetamask && (
        <Provider
          themeColors={themeColors}
          name={Metamask.name}
          logo={Metamask.logo}
          description={Metamask.description}
          onClick={() => onClick('no-metamask')}
        />
      )}
      {userOptions.map((provider, index) =>
        provider ? (
          <Provider
            key={index}
            themeColors={themeColors}
            name={provider.name}
            logo={provider.logo}
            description={provider.description}
            onClick={provider.onClick}
          />
        ) : null,
      )}
      <Wallet onClick={() => onClick('recommend')}>
        I don't have a wallet
      </Wallet>
    </ProviderContainer>
  )
}

const MetamaskModal = ({
  walletConnect,
  themeColors,
}: {
  walletConnect: any
  themeColors: ThemeColors
}) => (
  <ProviderContainer>
    <InfoWallet>
      You can use MetaMask by installing the browser extension or WalletConnect.
    </InfoWallet>
    <SProviderWrapper themeColors={themeColors}>
      <AProviderContainer
        themeColors={themeColors}
        href="https://metamask.io/download/"
        target="_blank"
      >
        <SIcon>
          <img src="https://www.sound.xyz/icons/metamask.svg" alt="Metmask" />
        </SIcon>
        <SName themeColors={themeColors}>Download MetaMask</SName>
      </AProviderContainer>
    </SProviderWrapper>
    <SProviderWrapper themeColors={themeColors} onClick={walletConnect.onClick}>
      <SProviderContainer themeColors={themeColors}>
        <SIcon>
          <img src={walletConnect.logo} alt="Wallet Connect" />
        </SIcon>
        <SName themeColors={themeColors}>{walletConnect.name}</SName>
      </SProviderContainer>
    </SProviderWrapper>
  </ProviderContainer>
)

const SetUpWallet = ({ themeColors }: { themeColors: ThemeColors }) => (
  <ProviderContainer>
    <InfoWallet>
      Sound.xyz is compatible with any Ethereum wallet. We recommend Metamask on
      desktop and Android, and Rainbow on iOS.
    </InfoWallet>
    <SProviderWrapper themeColors={themeColors}>
      <AProviderContainer
        themeColors={themeColors}
        href="https://metamask.io/download/"
        target="_blank"
      >
        <SIcon>
          <img src="https://www.sound.xyz/icons/metamask.svg" alt="Metmask" />
        </SIcon>
        <SName themeColors={themeColors}>MetaMask</SName>
      </AProviderContainer>
    </SProviderWrapper>
    <SProviderWrapper themeColors={themeColors}>
      <AProviderContainer
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
      </AProviderContainer>
    </SProviderWrapper>
  </ProviderContainer>
)

export class Modal extends React.Component<IModalProps, IModalState> {
  constructor(props: IModalProps) {
    super(props)
    window.updateWeb3Modal = async (state: IModalState) => {
      this.setState(state)
    }
  }

  public lightboxRef?: HTMLDivElement | null
  public mainModalCard?: HTMLDivElement | null

  public state: IModalState = {
    ...INITIAL_STATE,
  }

  public componentDidUpdate(prevProps: IModalProps, prevState: IModalState) {
    if (prevState.show && !this.state.show) {
      this.props.resetState()
    }
    if (this.lightboxRef) {
      const lightboxRect = this.lightboxRef.getBoundingClientRect()
      const lightboxOffset = lightboxRect.top > 0 ? lightboxRect.top : 0

      if (
        lightboxOffset !== INITIAL_STATE.lightboxOffset &&
        lightboxOffset !== this.state.lightboxOffset
      ) {
        this.setState({ lightboxOffset })
      }
    }
  }

  public render = () => {
    const { show, lightboxOffset, step2 } = this.state

    const {
      onClose,
      lightboxOpacity,
      userOptions,
      themeColors,
      providersInfoMessage,
    } = this.props

    const walletConnect = userOptions.find(
      ({ name }) => name === 'WalletConnect',
    )

    return (
      <SLightbox
        className={MODAL_LIGHTBOX_CLASSNAME}
        offset={lightboxOffset}
        opacity={lightboxOpacity}
        // @ts-expect-error
        ref={(c) => (this.lightboxRef = c)}
        show={show}
      >
        <SModalContainer className={MODAL_CONTAINER_CLASSNAME} show={show}>
          <SHitbox className={MODAL_HITBOX_CLASSNAME} onClick={onClose} />
          <SModalCard
            className={MODAL_CARD_CLASSNAME}
            show={show}
            themeColors={themeColors}
            maxWidth={userOptions.length < 3 ? 500 : 800}
            // @ts-expect-error
            ref={(c) => (this.mainModalCard = c)}
          >
            <ModalHeader>
              {step2 !== 'main' && (
                <Back
                  onClick={() => {
                    this.setState((state) => ({
                      step2: 'main',
                    }))
                  }}
                >
                  <ArrowLeft />
                </Back>
              )}
              <h1>
                {step2 === 'recommend'
                  ? 'Recommended Wallets'
                  : 'Connect Wallet'}
              </h1>
              <ModalClose
                onClick={() => {
                  this.setState((state) => ({
                    step2: 'main',
                    show: false,
                  }))
                  onClose
                }}
              >
                <X />
              </ModalClose>
            </ModalHeader>
            {step2 === 'recommend' && <SetUpWallet themeColors={themeColors} />}
            {step2 === 'main' && (
              <WalletProviders
                userOptions={userOptions}
                onClick={(state) => {
                  this.setState(() => ({
                    step2: state,
                  }))
                }}
                themeColors={themeColors}
                providersInfoMessage={providersInfoMessage}
              />
            )}
            {step2 === 'no-metamask' && (
              <MetamaskModal
                walletConnect={walletConnect}
                themeColors={themeColors}
              />
            )}
          </SModalCard>
        </SModalContainer>
      </SLightbox>
    )
  }
}

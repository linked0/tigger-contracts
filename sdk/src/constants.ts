import { ChainId } from './core'

export const CONTRACT_ADDRESS_NETWORKS = {
  [ChainId.HARDHAT]: {
    WETH: '0x484152444841545f574554480000000000000000',
    factory: '0x484152444841545f666163746f72790000000000',
    routerv2: '0x484152444841545f726f75746572763200000000',
    multicall: '0x484152444841545f6d756c746963616c6c000000',
    bridge: '0x484152444841545f627269646765000000000000',
    tokenBridge: '0x484152444841545f746f6b656e42726964676500',
    token1: '0x484152444841545f746f6b656e31000000000000',
    token2: '0x484152444841545f746f6b656e32000000000000',
  },
  [ChainId.STANDALONE]: {
    WETH: '0x6804Ee317db22D18190Affee2726868EDDD5a353',
    factory: '0x7C0A64a1ed25208133A156a395123971B52A20a0',
    routerv2: '0x37f2Ae6c1C4d638B583462C44C57d13E051960dF',
    multicall: '0x4848982ecA913D2d9d6235884F4b49e09bBaf974',
    bridge: '0x82182E4724106BCd7558d41D1C29EBAc90eeFE98',
    tokenBridge: '0x3D0f85741850B718929eF54A5F8aAd28F8e75459',
    token1: '0xF3f6B4Dc3c43f7258feB9cFFf0b722111057c8Cb',
    token2: '0x5406B945ab2C5469343bEEFc48578C28B08eAa04',
  },
  [ChainId.MAINNET]: {
    WETH: '0x4d41494e4e45545f574554480000000000000000',
    factory: '0x4d41494e4e45545f666163746f72790000000000',
    routerv2: '0x4d41494e4e45545f726f75746572763200000000',
    multicall: '0x4d41494e4e45545f6d756c746963616c6c000000',
    bridge: '0x4d41494e4e45545f627269646765000000000000',
    tokenBridge: '0x4d41494e4e45545f746f6b656e42726964676500',
    token1: '0x4d41494e4e45545f746f6b656e31000000000000',
    token2: '0x4d41494e4e45545f746f6b656e32000000000000',
  },
  [ChainId.SEPOLIA]: {
    WETH: '0x5345504f4c49415f574554480000000000000000',
    factory: '0x5345504f4c49415f666163746f72790000000000',
    routerv2: '0x5345504f4c49415f726f75746572763200000000',
    multicall: '0x5345504f4c49415f6d756c746963616c6c000000',
    bridge: '0x5345504f4c49415f627269646765000000000000',
    tokenBridge: '0x5345504f4c49415f746f6b656e42726964676500',
    token1: '0x5345504f4c49415f746f6b656e31000000000000',
    token2: '0x5345504f4c49415f746f6b656e32000000000000',
  },
  [ChainId.BIZTESTNET]: {
    WETH: '0x42495a544553544e45545f574554480000000000',
    factory: '0x42495a544553544e45545f666163746f72790000',
    routerv2: '0x42495a544553544e45545f726f75746572763200',
    multicall: '0x42495a544553544e45545f6d756c746963616c6c',
    bridge: '0x42495a544553544e45545f627269646765000000',
    tokenBridge: '0x42495a544553544e45545f746f6b656e42726964',
    token1: '0x42495a544553544e45545f746f6b656e31000000',
    token2: '0x42495a544553544e45545f746f6b656e32000000',
  },
  [ChainId.BIZDEVNET]: {
    WETH: '0x42495a4445564e45545f57455448000000000000',
    factory: '0x42495a4445564e45545f666163746f7279000000',
    routerv2: '0x42495a4445564e45545f726f7574657276320000',
    multicall: '0x42495a4445564e45545f6d756c746963616c6c00',
    bridge: '0x42495a4445564e45545f62726964676500000000',
    tokenBridge: '0x42495a4445564e45545f746f6b656e4272696467',
    token1: '0x42495a4445564e45545f746f6b656e3100000000',
    token2: '0x42495a4445564e45545f746f6b656e3200000000',
  },
  [ChainId.BIZNET]: {
    WETH: '0x42495a4e45545f57455448000000000000000000',
    factory: '0x42495a4e45545f666163746f7279000000000000',
    routerv2: '0x42495a4e45545f726f7574657276320000000000',
    multicall: '0x42495a4e45545f6d756c746963616c6c00000000',
    bridge: '0x42495a4e45545f62726964676500000000000000',
    tokenBridge: '0x42495a4e45545f746f6b656e4272696467650000',
    token1: '0x42495a4e45545f746f6b656e3100000000000000',
    token2: '0x42495a4e45545f746f6b656e3200000000000000',
  },
  [ChainId.MARIGOLD]: {
    WETH: '0x9B4ea652EC002AFb0e81Ca508F10fb68e0A16a24',
    factory: '0x9F59e740df75EDb6116c95BdBb06CD286F9e63Ac',
    routerv2: '0xfdE6e733C60E144AEDC931dC9e7fCbC442cBa3B9',
    multicall: '0x4ad5BDa9e450340F384FE4aDB4DC3d3ed76a25a1',
    bridge: '0xC13e46F3e56F1b72b129aaB5a10747E5De10B330',
    tokenBridge: '0xaCd2b3064f72125574e9703a2D24CFFF4B1a5899',
    token1: '0x4131b112e3515456bdb66e4242AF1ab07bF6F470',
    token2: '0x7e6886746D97207E027F148009A9B2bBDb7f40a5',
  },
  [ChainId.MARIGOLD_LOCALNET]: {
    WETH: '0x9B4ea652EC002AFb0e81Ca508F10fb68e0A16a24',
    factory: '0x07F531403DC3A20E2883555F15714B4D0ae827AB',
    routerv2: '0xE8eCD191126f4E4871b0051aec902a876768a335',
    multicall: '0x4ad5BDa9e450340F384FE4aDB4DC3d3ed76a25a1',
    bridge: '0x56Bd9d617dCE5dCEcd792BB6e4cC22890D6B609d',
    tokenBridge: '0x0b1F8E5306Cd2217017f3CdC8aB4765999Ccb3D7',
    token1: '0x7d72459bD06C487Ea572bF7FDF3Bc4e1a23C8049',
    token2: '0xf9cC1E443c237a5A5B16a00ddC43566830BbA768',
  },
} as const

export const FACTORY_ADDRESS: { [key: string]: string } = {
  [ChainId.MAINNET]: CONTRACT_ADDRESS_NETWORKS[ChainId.MAINNET].factory,
  [ChainId.HARDHAT]: CONTRACT_ADDRESS_NETWORKS[ChainId.HARDHAT].factory,
  [ChainId.STANDALONE]: CONTRACT_ADDRESS_NETWORKS[ChainId.STANDALONE].factory,
  [ChainId.SEPOLIA]: CONTRACT_ADDRESS_NETWORKS[ChainId.SEPOLIA].factory,
  [ChainId.BIZTESTNET]: CONTRACT_ADDRESS_NETWORKS[ChainId.BIZTESTNET].factory,
  [ChainId.BIZDEVNET]: CONTRACT_ADDRESS_NETWORKS[ChainId.BIZDEVNET].factory,
  [ChainId.BIZNET]: CONTRACT_ADDRESS_NETWORKS[ChainId.BIZNET].factory
}
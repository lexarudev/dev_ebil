import { TradeTrustToken__factory } from "@govtechsg/token-registry/contracts";

const connectedRegistry = TradeTrustToken__factory.connect(tokenRegistryAddress, signer);
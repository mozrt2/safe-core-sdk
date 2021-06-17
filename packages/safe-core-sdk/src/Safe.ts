import { BigNumber } from 'ethers'
import { TransactionResult } from 'utils/transactions/types'
import { ContractNetworksConfig } from './configuration/contracts'
import EthAdapter from './ethereumLibs/EthAdapter'
import { SafeSignature } from './utils/signatures/SafeSignature'
import SafeTransaction, { SafeTransactionDataPartial } from './utils/transactions/SafeTransaction'

export interface EthersSafeConfig {
  /** ethAdapter - Ethereum adapter */
  ethAdapter: EthAdapter
  /** safeAddress - The address of the Safe account to use */
  safeAddress: string
  /** contractNetworks - Contract network configuration */
  contractNetworks?: ContractNetworksConfig
}

export interface ConnectEthersSafeConfig {
  /** ethAdapter - Ethereum adapter */
  ethAdapter: EthAdapter
  /** safeAddress - The address of the Safe account to use */
  safeAddress?: string
  /** contractNetworks - Contract network configuration */
  contractNetworks?: ContractNetworksConfig
}

interface Safe {
  connect({ ethAdapter, safeAddress, contractNetworks }: ConnectEthersSafeConfig): void
  getAddress(): string
  getMultiSendAddress(): string
  getContractVersion(): Promise<string>
  getNonce(): Promise<number>
  getOwners(): Promise<string[]>
  getThreshold(): Promise<number>
  getChainId(): Promise<number>
  getBalance(): Promise<BigNumber>
  getModules(): Promise<string[]>
  isModuleEnabled(moduleAddress: string): Promise<boolean>
  isOwner(ownerAddress: string): Promise<boolean>
  createTransaction(...safeTransactions: SafeTransactionDataPartial[]): Promise<SafeTransaction>
  getTransactionHash(safeTransaction: SafeTransaction): Promise<string>
  signTransactionHash(hash: string): Promise<SafeSignature>
  signTransaction(safeTransaction: SafeTransaction): Promise<void>
  approveTransactionHash(hash: string): Promise<TransactionResult>
  getOwnersWhoApprovedTx(txHash: string): Promise<string[]>
  getEnableModuleTx(moduleAddress: string): Promise<SafeTransaction>
  getDisableModuleTx(moduleAddress: string): Promise<SafeTransaction>
  getAddOwnerTx(ownerAddress: string, threshold?: number): Promise<SafeTransaction>
  getRemoveOwnerTx(ownerAddress: string, threshold?: number): Promise<SafeTransaction>
  getSwapOwnerTx(oldOwnerAddress: string, newOwnerAddress: string): Promise<SafeTransaction>
  getChangeThresholdTx(threshold: number): Promise<SafeTransaction>
  executeTransaction(safeTransaction: SafeTransaction): Promise<TransactionResult>
}

export default Safe

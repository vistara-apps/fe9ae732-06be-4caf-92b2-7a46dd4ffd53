export interface User {
  userId: string;
  farcasterId?: string;
  walletAddress: string;
  createdAt: Date;
}

export interface Token {
  tokenId: string;
  originalContentHash: string;
  mintTimestamp: Date;
  creatorId: string;
  tokenUri: string;
  royaltyPercentage: number;
  associatedContentLink: string;
  title?: string;
  description?: string;
}

export interface Remix {
  remixId: string;
  originalTokenId: string;
  remixedContentHash: string;
  remixCreatorId: string;
  salePrice?: number;
  saleTimestamp?: Date;
  royaltyPaid?: number;
}

export interface ContentInput {
  type: 'text' | 'image' | 'url';
  content: string;
  title: string;
  description?: string;
}

export interface MintingState {
  isLoading: boolean;
  step: 'input' | 'hash' | 'upload' | 'mint' | 'complete';
  error?: string;
  txHash?: string;
  tokenId?: string;
}

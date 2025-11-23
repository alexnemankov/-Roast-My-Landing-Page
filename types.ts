export interface RoastResponse {
  firstImpression: string;
  roast: string[];
  fixes: string[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

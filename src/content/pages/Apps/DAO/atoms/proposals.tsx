import { atom } from 'recoil';

export const proposals = atom({
  key: 'proposals',
  default: [],
});

export const selectedProposal = atom({
  key: 'selectedProposal',
  default: 0,
});

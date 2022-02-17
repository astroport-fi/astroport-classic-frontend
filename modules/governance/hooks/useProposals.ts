import { GovernanceProposal } from "types/common";

// temporary proposals
let proposals: GovernanceProposal[] = [
  {
    id: "1",
    title: "Proposal A",
    description: "Lorem ipsum dolor sit amet, con...",
    msg: "[{'order': 123, 'Lorem ipsum dolor sit amet, con...'}]",
    link: "https://discord.gg/C7WCtwT",
    amount: 1253,
  },
  {
    id: "2",
    title: "Proposal B",
    description: "Lorem ipsum dolor sit amet, con...",
    msg: "[{'order': 123, 'Lorem ipsum dolor sit amet, con...'}]",
    link: "https://discord.gg/C7WCtwT",
    amount: 5253,
  },
  {
    id: "3",
    title: "Proposal C",
    description: "Lorem ipsum dolor sit amet, con...",
    msg: "[{'order': 123, 'Lorem ipsum dolor sit amet, con...'}]",
    link: "https://discord.gg/C7WCtwT",
    amount: 125,
  },
];

export const useProposals = () => {
  return proposals;
};

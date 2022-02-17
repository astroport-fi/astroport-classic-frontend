import { GovernanceProposal, ProposalStatus } from "types/common";

// temporary proposals
let proposals: GovernanceProposal[] = [
  {
    id: "1",
    title: "Proposal A",
    description: "Lorem ipsum dolor sit amet, con...",
    msg: "[{'order': 123, 'Lorem ipsum dolor sit amet, con...'}]",
    link: "https://discord.gg/C7WCtwT",
    amount: 1253,
    endDate: "1647124720",
    address: "terra.....",
    status: ProposalStatus.Fail,
  },
  {
    id: "2",
    title: "Proposal B",
    description: "Lorem ipsum dolor sit amet, con...",
    msg: "[{'order': 123, 'Lorem ipsum dolor sit amet, con...'}]",
    link: "https://discord.gg/C7WCtwT",
    amount: 5253,
    endDate: "1645124444",
    address: "terra.....",
    status: ProposalStatus.Active,
  },
  {
    id: "3",
    title: "Proposal C",
    description: "Lorem ipsum dolor sit amet, con...",
    msg: "[{'order': 123, 'Lorem ipsum dolor sit amet, con...'}]",
    link: "https://discord.gg/C7WCtwT",
    amount: 125,
    endDate: "1613588720",
    address: "terra.....",
    status: ProposalStatus.Implemented,
  },
];

export const useProposals = () => {
  return proposals;
};

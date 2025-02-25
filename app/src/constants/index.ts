import { PublicKey } from "@solana/web3.js";


// Change later
// export const TMONK_MINT_ADDRESS = "48ANqAR3wNyfHrL7EqSJBcdsMzuKCMpQZ2P9oGVf3MKY"; //tmonk-dev-net-config-decimals-6
// export const TMONK_MINT_ADDRESS = "Eu4JoP58XG68LE875xUsFsHsLyBc2BCzaze4dUSNPC4"; //tmonk-dev-net-config-decimals-6
// export const TMONK_MINT_ADDRESS = "RyPE9EGyAN684Mamg3vq8ZJizoqxCMn5oRMUERMQxwq"; //tmonk-dev-net-config-decimals-9
export const TMONK_MINT_ADDRESS = "D6bbz9sKNd2MZZxLEihGSEz1X8ZrpGJEVQn6xm4vQWx7";  //tmonk-main-net-config-decimals-6  

// export const PRESALE_PROGRAM_PUBKEY = new PublicKey("2TEmRQkjW7vJFwrUB84Xc41U7oePqThBqt9QangQMMAa"); //tmonk-dev-net-config
export const PRESALE_PROGRAM_PUBKEY = new PublicKey("8GuUDSZ8XiCxFL9cPjNeJdVedCx6JSsFknv6x2Mc41kV");  //tmonk-main-net-config

export const PRESALE_SEED = "PRESALE_SEED";
export const PRESALE_VAULT = "PRESALE_VAULT";

import {
    phase1,
    phase2,
    phase3,
    web
  } from "../assets/lists";

const roadmap = [
    {
      title: "The Primordial Soup (Q3 2024)",
      company_name: "phase 1",
      icon: phase1,
      iconBg: "#6380cb",
      date: "07/2024 - 10/2024",
      points: [
        "Spearheaded a joint initiative with product and development teams, enhancing platform efficiency by 20%.",
        "Engaged in over 10 open source community projects, liaised with stakeholders, and provided mentorship and guidance to 3 emerging junior developers.",
        "Enhanced to engineering a robust backend infrastructure pivotal for the convergence of Web3 and FinTech."
      ],
    },
    {
      title: "Growing Opposable Thumbs (Q4 2024):",
      company_name: "phase 2",
      icon: phase2,
      iconBg: "#806cc1",
      date: "10/2024 - 12/2024",
      points: [
        "Expand to Ethereum and other EVM-compatible chains, integrate cross-chain bridges, and launch the first series of tokenized carbon credits.",
      ],
    },
    {
      title: "Tool Use Discovery (Q1-Q2 2025):",
      company_name: "phase 3",
      icon: phase1,
      iconBg: "#e44968",
      date: "01/2025 - 06/2025",
      points: [
        "Presale funds in SOL will be paired with $TMONK to create a liquidity pool on Solana DEXs.",
        " Locked for 2 years to ensure stability, 10% of the liquidity will be gradually released from year 2 onwards for continued development."
      ],
    },
    {
      title: "Civilization Emergence (Q3-Q4 2025):",
      company_name: "phase 4",
      icon: phase2,
      iconBg: "#9e6d60",
      date: "06/2025 - 12/2025",
      points: [
        "Establish $TMONK-funded scholarships for CDL training programs aimed at reducing recidivism and host the first annual 'Gorilla Gala' charity event.",
        "Improve monitoring to improve performance"
      ],
    },
    {
      title: "Space Exploration (2026 and beyond):",
      company_name: "phase 5",
      icon: phase3,
      iconBg: "#3d82f5",
      date: "02/2026 - ",
      points: [
        "Innovate in carbon capture and eco-tech while adapting strategies for maximum impact.",
        "global warming  mitigation through sustainable practices.",

      ],
    },
  ];

  
export {roadmap};

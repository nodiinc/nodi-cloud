export const siteConfig = {
  name: "Nodi",
  tagline: "Node Integration",
  title: "Nodi | Industrial Edge Gateway Platform",
  description: "Connect, monitor, and control your industrial devices from anywhere.",

  company: {
    name: "Nodi Inc.",
    legalName: "(주)노디",
    address: "(16976) 경기도 용인시 기흥구 기흥로 58-1 (구갈동), 기흥ICT밸리 A동 1881호",
    phone: "+82-31-000-0000",
    email: "contact@nodi.co.kr",
    businessNumber: "787-87-02955",
  },

  logo: {
    symbol: "/nodi-logo-symbol.png",
    full: "/nodi-logo-full.png",
  },

  links: {
    github: "https://github.com/nodi-iot",
    docs: "/resources",
  },
} as const;

export type SiteConfig = typeof siteConfig;

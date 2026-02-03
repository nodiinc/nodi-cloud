export const siteConfig = {
  name: "Nodi",
  tagline: "Bring your nodes into the box",
  title: "Nodi | Industrial Edge Gateway Platform",
  description: "Connect, monitor, and control your industrial devices from anywhere.",

  company: {
    name: "Nodi",
    legalName: "(주)노디",
    address: "서울특별시 강남구 테헤란로 123, 456호",
    phone: "+82-2-1234-5678",
    email: "contact@nodi.co.kr",
    businessNumber: "123-45-67890",
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

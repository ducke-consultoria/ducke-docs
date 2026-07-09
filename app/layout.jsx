import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import 'nextra-theme-docs/style.css'
import './nextra-theme.css'
import { Banner } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'

// Nextra ships its own theme toggle — lock out Dark Reader to avoid SVG/style hydration mismatches.
export const metadata = {
  other: {
    'darkreader-lock': '',
  },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'rgb(250, 250, 250)' },
    { media: '(prefers-color-scheme: dark)', color: 'rgb(17, 17, 17)' },
  ],
}

const banner = <Banner storageKey="ducke">
  <a href="https://crm.ducke.com.br" target="_blank">
    🎉 Conheça já o Ducke CRM! Saiba mais →
  </a>
</Banner>
const navbar = (
  <Navbar
    logo={<img src="/ducke-logo.png" alt="Ducke" width={64} height={32} />}
  />
)
const footer = (
  <Footer>
    Powered by 2023-<span suppressHydrationWarning>{new Date().getFullYear()}</span> © Ducke.
  </Footer>
)

export default async function RootLayout({ children }) {
  return (
    <html
      lang="pt-br"
      dir="ltr"
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/ducke-consultoria/ducke-docs/blob/main"
          footer={footer}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}

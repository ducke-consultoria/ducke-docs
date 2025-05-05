import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import 'nextra-theme-docs/style.css'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'

export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

const banner = <Banner storageKey="ducke">
  <a href="https://crm.ducke.com.br" target="_blank">
    🎉 Conheça já o Ducke CRM! Saiba mais →
  </a>
</Banner>
const navbar = (
  <Navbar
    logo={<img src="/ducke-logo.png" alt="Ducke" width={64} height={32} />}
  // ... Your additional navbar options
  />
)
const footer = <Footer>Powered by 2023-{new Date().getFullYear()} © Ducke.</Footer>

export default async function RootLayout({ children }) {
  return (
    <html
      // Not required, but good for SEO
      lang="pt-br"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
      // ... Your additional head options
      >
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/ducke-consultoria/ducke-docs"
          footer={footer}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
        // ... Your additional layout options
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
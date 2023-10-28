/* Components */
import { Providers } from '@/lib/providers'
import './styles/globals.css'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import "react-activity/dist/library.css";

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <section>
            <main>{props.children}</main>
          </section>
          <ToastContainer theme='dark' style={{ zIndex: 9999999 }}/>
        </body>
      </html>
    </Providers>
  )
}

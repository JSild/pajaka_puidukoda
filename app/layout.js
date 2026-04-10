import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

export const metadata = {
  title: 'Pajaka Puidukoda — Käsitöö puidust',
  description:
    'Pajaka Puidukoda valmistab unikaalseid puittooteid teie kodusse. Käsitöö, mis kestab põlvest põlve.',
  openGraph: {
    title: 'Pajaka Puidukoda',
    description: 'Unikaalne puidutöö teie koju.',
    locale: 'et_EE',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="et" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import {RecoilProvider} from "@/recoil/RecoilProvider";

export const metadata: Metadata = {
  title: {
    template: '%s | Union AI',
    default: 'Explore a Universe of AI Machines - Union AI ',
  },
  description: 'Experience diverse AI technologies, from chatbots to machine learning models, on our platform that blends innovation with user engagement',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
      <RecoilProvider>
        {children}
      </RecoilProvider>
      </body>
    </html>
  );
}

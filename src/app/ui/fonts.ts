import { Inter, Lusitana, Noto_Sans_KR } from 'next/font/google';

export const notoSansKR = Noto_Sans_KR({ subsets: ['latin'] });
export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});

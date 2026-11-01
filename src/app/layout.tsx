import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Aditi's Birthday Universe ✨",
  description: "A special, beautiful birthday experience crafted just for Aditi.",
  icons: {
    icon: '/assets/cake.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-[#D9B978]/30 selection:text-[#252525]">
        {children}
      </body>
    </html>
  );
}


import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TrashDash Dasher Portal',
  description: 'Mobile-optimized interface for TrashDash service providers',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </body>
    </html>
  )
} 
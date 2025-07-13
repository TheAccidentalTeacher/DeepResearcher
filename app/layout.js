import './globals.css';

export const metadata = {
  title: 'Deep Research Assistant',
  description: 'AI-Powered Research Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

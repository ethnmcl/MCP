export const metadata = { title: "MCP Prototype" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "ui-sans-serif, system-ui", padding: 20 }}>
        {children}
      </body>
    </html>
  );
}

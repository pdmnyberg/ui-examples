export default function Warning({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="alert alert-danger" role="alert">
      <p>This is <em>NOT</em> a proper implementation. It is just an example used for discussion around what functionality we need for this application.</p>
      {children}
    </div>
  )
}

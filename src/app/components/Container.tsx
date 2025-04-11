export default function Container({
  children,
  className = ''
}: {
  children: React.ReactNode,
  className?: string
}) {
  return (
    <section className={`w-full max-w-5xl mx-auto px-4 md:px-2 ${className}`}>
      {children}
    </section>
  )
}

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="grid min-h-screen w-full place-content-center">
      {children}
    </section>
  )
}

export default AuthLayout
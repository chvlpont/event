import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { SignInButton, SignUpButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs"
import Link from "next/link"

function LandingPage() {
  return (
    <>
      <header className="w-full border-b">
        <div className="container flex p-2 justify-between gap-2">
          <p className="flex-1 text-2xl font-bold">BackOffice | *companyName*</p>
          <ModeToggle />
          <SignedOut>
            <SignInButton mode="modal">
              <Button>
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="secondary">
                Sign up
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <SignOutButton>
              <Button>
                Sign out
              </Button>
            </SignOutButton>
          </SignedIn>
        </div>
      </header>
      
      <div className="flex flex-col items-center gap-4">
        <SignedIn>
          <Button asChild className="mt-4">
            <Link href="/admin">Enter dashboard</Link>
          </Button>
        </SignedIn>
        <h1 className="text-6xl font-bold mt-32">En jättebra rubrik</h1>
        <p className="text-muted-foreground">en cool slogan</p>
        <img src="https://images.unsplash.com/photo-1622465911368-72162f8da3e2?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="w-1/2"></img>
      </div>
    </>
  )
}

export default LandingPage

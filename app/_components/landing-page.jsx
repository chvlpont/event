import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { SignInButton, SignUpButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs"
import Link from "next/link"
import { FaArrowCircleRight } from "react-icons/fa";

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
                <p>Sign in</p>
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="secondary">
                <p>Sign up</p>
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <SignOutButton>
              <Button>
                <p>Sign out</p>
              </Button>
            </SignOutButton>
          </SignedIn>
        </div>
      </header>
      
      <div className="flex flex-col items-center gap-4">
        <SignedIn>
          <Button asChild className="flex mt-10 absolute h-12 gap-2">
            <Link href="/admin">
              <p className="text-lg">Enter dashboard</p>
              <FaArrowCircleRight className=""/>
            </Link>
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

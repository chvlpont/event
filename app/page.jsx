import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs"
import Link from "next/link"

function LandingPage() {
  return (
    <div>
      <div className="container flex items-center py-4 border-b-2 gap-4">
        <p className="flex-1 text-2xl font-bold">BackOffice | *companyName*</p>
        <ModeToggle />
        <SignedOut>
            <SignInButton mode="modal">
              <Button>
                Sign in

              </Button>
            </SignInButton>
        </SignedOut>
        <SignedIn>
          <SignOutButton>
          <Button>
                Sign out

              </Button>
          </SignOutButton>
            <Link href="/">Signed in</Link>
            {/* <Link href="/admin?????">Enter</Link> 
            Kan ha länk här eller redirecta direkt?*/} 
        </SignedIn>
      </div>

      <div className="flex flex-col items-center mt-36">
        <h1 className="text-6xl font-bold">En jättebra rubrik</h1>
        <p className="text-muted-foreground">en cool slogan</p>
        <img src="https://images.unsplash.com/photo-1622465911368-72162f8da3e2?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="w-1/2"></img>
      </div>
    </div>
  )
}

export default LandingPage

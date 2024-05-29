'use client'
import React, { useEffect, useState } from 'react';
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { SignInButton, SignUpButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs"
import Link from "next/link"
import { FaArrowCircleRight } from "react-icons/fa";
import { getLandingPageContent } from '@/utils/eventservices';



function LandingPage() {
const [content, setContent] = useState({ title: '', content: '', imageUrl: '' });



useEffect(() => {
  getLandingPageContent().then(data => {
    if (data) {
      setContent({ title: data.title, content: data.content, imageUrl: data.imageUrl });
    }
  });
}, []);


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
        <h1 className="text-6xl font-bold mt-32">{content.title}</h1>
<p className="text-muted-foreground">{content.content}</p>
<img src={content.imageUrl} className="w-1/2"></img>
      </div>
    </>
  )
}

export default LandingPage

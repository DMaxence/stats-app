import Image from 'next/image'
import Link from 'next/link'
import componentsImg from './assets/components.svg'
import {
  Discord,
  Docs,
  DownArrow,
  Github,
  RightArrow,
  Times,
  Twitter,
} from './icons'
import './home.css'
import { OrganizationSwitcher, SignedIn, UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <>
      <header className="flex items-center h-20 gap-4 px-4 border-b border-black border-solid sm:px-8 border-opacity-20">
        <Link href="/" className="flex items-center h-20 gap-2 sm:gap-4">
          <Image
            src="/clerk.svg"
            alt="Clerk Logo"
            width={102}
            height={32}
            priority
          />
          <Times />
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={90}
            height={18}
            priority
          />
        </Link>
        <div className="grow" />
        <SignedIn>
          <div className="hidden sm:block">
            <OrganizationSwitcher afterCreateOrganizationUrl="/dashboard" />
          </div>
          <div className="block sm:hidden">
            <OrganizationSwitcher
              afterCreateOrganizationUrl="/dashboard"
              appearance={{
                elements: {
                  organizationSwitcherTriggerIcon: `hidden`,
                  organizationPreviewTextContainer: `hidden`,
                  organizationSwitcherTrigger: `pr-0`,
                },
              }}
            />
          </div>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </header>
      <main className="grow">
        <article className="grid lg:grid-cols-2">
          <div className="px-8 py-20 md:px-20 lg:py-48">
            <h1 className="text-5xl font-semibold text-transparent md:text-6xl gradient">
              Auth starts here.
            </h1>
            <p className="mt-2 text-lg">
              A simple and powerful Next.js template featuring authentication
              and user management powered by Clerk.
            </p>
            <div className="flex gap-2 mt-8">
              <Link
                href="/dashboard"
                className="flex content-center gap-2 px-4 py-2 font-semibold text-white transition-colors duration-200 rounded-lg bg-primary-600 hover:bg-primary-700"
              >
                View Demo
                <div className="m-auto">
                  <RightArrow />
                </div>
              </Link>
              <a
                className="flex gap-2 px-4 py-2 font-semibold text-gray-600 transition duration-100 rounded-lg hover:text-gray-800"
                href="#features"
              >
                Learn more
                <div className="m-auto">
                  <DownArrow />
                </div>
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <Image src={componentsImg} alt="Clerk embeddable components" />
          </div>
        </article>
        <article
          className="px-8 py-12 bg-black bg-opacity-5 md:px-20 md:py-24"
          id="features"
        >
          <h2 className="text-3xl font-semibold">What&apos;s under the hood?</h2>
          <p className="mt-2">
            This template repo uses some of the following features provided by
            Clerk. To learn more, read the{' '}
            <a
              href="https://clerk.com/docs?utm_source=vercel-template&utm_medium=template_repos&utm_campaign=nextjs_template"
              className="font-medium text-primary-600 hover:underline"
            >
              Clerk Docs
            </a>
            .
          </p>
          <div className="grid gap-8 mt-8 lg:grid-cols-3">
            <div className="flex flex-col h-56 gap-1 p-8 bg-white shadow-lg rounded-2xl">
              <h3 className="text-lg font-medium">Customizable Components</h3>
              <p className="text-gray-700">
                Prebuilt components to handle essential functionality like user
                sign-in, sign-up, and account management.
              </p>
              <div className="grow"></div>
              <a
                href="https://clerk.com/docs/component-reference/overview?utm_source=vercel-template&utm_medium=template_repos&utm_campaign=nextjs_template"
                className="text-primary-600 cta hover:underline"
                target="_blank"
              >
                Components <span className="arrow">-&gt;</span>
              </a>
            </div>
            <div className="flex flex-col h-56 gap-1 p-8 bg-white shadow-lg rounded-2xl">
              <h3 className="text-lg font-medium">React Hooks</h3>
              <p className="text-gray-700">
                Build custom functionality by accessing auth state, user and
                session data, and more with Clerk&apos;s React Hooks.
              </p>
              <div className="grow"></div>
              <a
                href="https://clerk.com/docs/reference/clerk-react/useuser?utm_source=vercel-template&utm_medium=template_repos&utm_campaign=nextjs_template"
                className="text-primary-600 cta hover:underline"
                target="_blank"
              >
                React Hooks <span className="arrow">-&gt;</span>
              </a>
            </div>
            <div className="flex flex-col h-56 gap-1 p-8 bg-white shadow-lg rounded-2xl">
              <h3 className="text-lg font-medium">Multitenancy</h3>
              <p className="text-gray-700">
                Seamlessly create and switch between organizations, invite and
                manage members, and assign custom roles.
              </p>
              <div className="grow"></div>
              <a
                href="https://clerk.com/docs/organizations/overview?utm_source=vercel-template&utm_medium=template_repos&utm_campaign=nextjs_template"
                className="text-primary-600 cta hover:underline"
                target="_blank"
              >
                Organizations <span className="arrow">-&gt;</span>
              </a>
            </div>
          </div>
        </article>
      </main>

      <footer className="flex items-center h-20 gap-1 px-8 font-medium border-t md:px-20">
        <Image
          src="/clerk.svg"
          alt="Clerk Logo"
          width={64}
          height={32}
          priority
        />
        <span className="text-sm">© 2023</span>
        <nav className="flex justify-end grow sm:gap-2">
          <a
            className="flex gap-2 px-3 py-2 text-sm font-semibold text-gray-600 transition duration-100 rounded-md hover:text-gray-800"
            href="https://clerk.com/docs?utm_source=vercel-template&utm_medium=template_repos&utm_campaign=nextjs_template"
          >
            <div className="m-auto">
              <Docs />
            </div>
            <span className="hidden sm:inline"> Visit Clerk Docs</span>
            <span className="inline sm:hidden"> Docs</span>
          </a>
          <a
            className="flex gap-2 px-3 py-2 text-sm font-semibold text-gray-600 transition duration-100 rounded-md hover:text-gray-800"
            href="https://github.com/clerkinc/clerk-next-app"
          >
            <div className="m-auto">
              <Github />
            </div>
            <span className="hidden sm:inline"> View on Github</span>
          </a>
          <a
            className="flex flex-col justify-center p-2 hover:underline"
            href="https://twitter.com/ClerkDev"
          >
            <Twitter />
          </a>
          <a
            className="flex flex-col justify-center p-2 hover:underline"
            href="https://discord.com/invite/b5rXHjAg7A"
          >
            <Discord />
          </a>
        </nav>
      </footer>
    </>
  )
}

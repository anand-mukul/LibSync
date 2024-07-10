import UserDetails from "@/components/global/user-details";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    name: 'Instant Delivery',
    Icon: ArrowDownToLine,
    description: 'Get your book instantly delivered to your email and download them right away.',
  },
  {
    name: 'Open Source',
    Icon: CheckCircle,
    description: 'No wastage of time, money, or effort. Your book stays open source forever.',
  },
  {
    name: 'For the Planet',
    Icon: Leaf,
    description: "We've pledged 10% of our profits to reduce our carbon footprint.",
  }
]

export default function Home () {
  return (
    <>
    <MaxWidthWrapper>
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-xl">
          Your Digital Place to Read high quality{" "}
          <span className="text-primary"> Open Source </span>
          Books.
        </h1>
        <p className="mt-6 text-lg max-w-prose text-muted-foreground">
          Welcome to LibSync. Enjoy the best quality of open source books and
          publish your first digital book on our free platform.
        </p>
        {/* <UserDetails/> */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href={"/trending"} className={buttonVariants()}>
            Browse Trending
          </Link>
          <Button variant={"ghost"}>Our Quality Promise &rarr;</Button>
        </div>
      </div>

      {/* TODO: Add products */}
    </MaxWidthWrapper>

    <section className="border-t border-gray-200 bg-gray-50">
      <MaxWidthWrapper className="py-20">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
          {perks.map((perk) => (
            <div className="text-center md:flex md:items-start md:text-left lg:block lg:text-center" key={perk.name} aria-hidden="true">
              <div className="md:flex-shrink-0 flex justify-center">
                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-primary to-secondary text-white">
                  {<perk.Icon className="h-1/3 w-1/3" aria-hidden="true" />}
                </div>
              </div>

              <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                <h3 className="text-base font-medium text-gray-900">{perk.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {perk.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
    </>
  );
}

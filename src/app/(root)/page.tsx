import Image from "next/image";

import GoTopButton from "@/components/buttons/GoTopButton";
import DefaultCard from "@/components/cards/DefaultCard";
import FeaturedFyndsCard from "@/components/cards/FeaturedFyndsCard";
import NonFeaturedFyndsCard from "@/components/cards/NonFeaturedFyndsCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

const Home = async () => {
  const { success, data: categories } = await api.categories.getAll();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <section
        id="hero"
        className="relative flex h-80 w-full items-center justify-center overflow-hidden"
      >
        <div className="size-full">
          <Image
            src={
              "https://s3.us-west-1.amazonaws.com/dev.fyndr.us/public/background-images/usa/az/phoenix/phoenix.png"
            }
            alt="hero"
            fill
            className="object-cover"
            priority
          />
        </div>
        <LocalSearch
          imgSrc="/icons/search.svg"
          placeholder="Search Offers, Events & Businesses"
          route="/"
          otherClasses="flex-1 absolute w-11/12 sm:w-full max-w-lg m-2"
        />
      </section>

      <DefaultCard className="my-10 p-2 pt-8 xs:w-11/12 sm:p-4 sm:pt-8">
        {success && <HomeFilter categories={categories!} />}
        {/* <DataRenderer
          success={success}
          error={error}
          data={categories}
          empty={EMPTY_CATEGORY}
          render={(categories) => <HomeFilter categories={categories!} />}
        /> */}
        <section className="mt-10 flex flex-col rounded-lg bg-primary-100 p-4">
          <h2 className="h2-semibold">Featured Fynds</h2>
          <div className="my-6 grid place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            <FeaturedFyndsCard />
            <FeaturedFyndsCard />
            <FeaturedFyndsCard />
            <FeaturedFyndsCard />
            <FeaturedFyndsCard />
            <FeaturedFyndsCard />
            <FeaturedFyndsCard />
            <FeaturedFyndsCard />
            <FeaturedFyndsCard />
            <FeaturedFyndsCard />
          </div>
          <Button
            variant={"outline"}
            className="body-medium self-center rounded-lg border-2 border-primary-500 px-6 py-3 text-primary-500 hover:bg-light-900 hover:text-primary-500"
          >
            See all
          </Button>
        </section>

        <section className="mt-10">
          <h2 className="h2-semibold">Explore Exciting Activities Nearby</h2>
          <div className="my-6 grid place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            <NonFeaturedFyndsCard />
          </div>
        </section>

        <section className="mt-10">
          <h2 className="h2-semibold">Discover Dining Experiences Near You</h2>
          <div className="my-6 grid place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
          </div>
        </section>
        <section className="mt-10">
          <h2 className="h2-semibold">Nearby Beauty Finds</h2>
          <div className="my-6 grid place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
          </div>
        </section>
        <section className="mt-10">
          <h2 className="h2-semibold">Offers Near You</h2>
          <div className="my-6 grid place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
          </div>
        </section>
        <section className="mt-10">
          <h2 className="h2-semibold">Events Near You</h2>
          <div className="my-6 grid place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
          </div>
        </section>
      </DefaultCard>
      <GoTopButton />
    </main>
  );
};

export default Home;

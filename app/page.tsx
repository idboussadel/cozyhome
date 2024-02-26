import getCurrentUser from "@/actions/getCurrentUser";
import getListings, { IListingsParams } from "@/actions/getListings";
import ListingCard from "@/components/listings/ListingCard";
import EmptyState from "@/components/shared/EmptyState";

interface HomeProps {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState />;
  }

  return (
    <main
      className="
    max-w-[2520px]
    mx-auto
    xl:px-20 
    md:px-10
    sm:px-2
    px-6
  "
    >
      <div
        className="
      pt-24
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4
      gap-6
    "
      >
        {listings.map((listing: any) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </main>
  );
}

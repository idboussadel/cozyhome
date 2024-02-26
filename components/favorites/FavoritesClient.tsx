import Heading from "../shared/Heading";
import ListingCard from "../listings/ListingCard";
import { Listing, User } from "@prisma/client";

interface FavoritesClientProps {
  listings: Listing[];
  currentUser?: User | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <div
      className="
    max-w-[2520px]
    mx-auto
    xl:px-20 
    md:px-10
    sm:px-2
    px-4
    "
    >
      <Heading title="Favorites" subtitle="List of places you favorited!" />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          gap-8
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
    </div>
  );
};

export default FavoritesClient;

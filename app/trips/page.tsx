import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import EmptyState from "@/components/shared/EmptyState";
import TripsClient from "@/components/trips/TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthrized" subtitle="Please login." />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you havent reserved any trips."
      />
    );
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;

import { redirect } from "next/navigation";

import { InitialModal } from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { intitialProfile } from "@/lib/initial-profile";

type Props = {};

const SetupPage = async (props: Props) => {
  const profile = await intitialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  return <InitialModal />;
};

export default SetupPage;

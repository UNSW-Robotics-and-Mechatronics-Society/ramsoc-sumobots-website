import { getAppConfig } from "./_actions/appConfig";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function Page() {
  const config = await getAppConfig();
  return <HomeClient pickabotsEnabled={config.pickabots_enabled} />;
}

import { getAppConfig } from "./_actions/appConfig";
import { getPickabotsStatus } from "./_actions/pickabots";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [config, pickabotsStatus] = await Promise.all([
    getAppConfig(),
    getPickabotsStatus(),
  ]);

  const showPickabotsPrompt =
    pickabotsStatus !== null &&
    !pickabotsStatus.onboarded &&
    !pickabotsStatus.isSpectator;

  return (
    <HomeClient
      pickabotsEnabled={config.pickabots_enabled}
      showPickabotsPrompt={showPickabotsPrompt}
    />
  );
}

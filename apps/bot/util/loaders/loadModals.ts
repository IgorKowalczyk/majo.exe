import { readDir } from "@majoexe/util/functions/files/readDir.js";
import type { ModalSubmitInteraction } from "discord.js";
import type { Majobot } from "../..";

export interface Modal {
 id: string;
 run: (client: Majobot, interaction: ModalSubmitInteraction) => Promise<void>;
}

export default async function loadModals(client: Majobot): Promise<void> {
 try {
  const loadTime = performance.now();
  const modals = readDir(`${process.cwd()}/modals/`, true, [".js", ".ts"]);
  for (const value of modals) {
   try {
    const file = await import(value);
    const { default: modal } = file as { default: Modal };

    if (!modal) {
     client.debugger("error", `Modal ${value} doesn't have a default export!`);
     continue;
    }

    const { id, run } = modal;

    if (!id || !run) {
     client.debugger("error", `Modal ${value} is missing required properties!`);
     continue;
    }

    client.modals.set(id, modal);

    if (client.config.displayModalList) {
     client.debugger("info", `Loaded modal ${id} from ${value.replace(process.cwd(), "")}`);
    }
   } catch (error: unknown) {
    client.debugger("error", `Error loading modal ${value}: ${error}`);
   }
  }
  client.debugger("event", `Loaded ${client.modals.size} modals from /modals in ${client.performance(loadTime)}`);
 } catch (error: unknown) {
  client.debugger("error", `Error loading modals: ${error}`);
 }
}

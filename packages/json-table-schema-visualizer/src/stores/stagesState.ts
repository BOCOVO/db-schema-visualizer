import { PersistableStore } from "./PersitableStore";

import { AppSessionStorage } from "@/storages/session";
import { type StageState } from "@/types/stage";

class StageStateStore extends PersistableStore<StageState> {
  private stageState: StageState | null = null;
  private currentStoreKey = "none";

  constructor() {
    super("stageState", new AppSessionStorage());
  }

  public getCurrentStageState(): StageState | null {
    return this.stageState;
  }

  public saveCurrentState(): void {
    if (this.stageState === null) {
      return;
    }
    this.persist(this.currentStoreKey, this.stageState);
  }

  public switchTo(newStoreKey: string): void {
    this.saveCurrentState();

    this.currentStoreKey = newStoreKey;
    const recoveredStore = this.retrieve(this.currentStoreKey) as StageState;
    if (recoveredStore === null) {
      this.stageState = null;
    }

    this.stageState = recoveredStore;
  }

  public set(newState: StageState): void {
    this.stageState = newState;
  }
}

export const stageStateStore = new StageStateStore();

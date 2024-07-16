import { PersistableStore } from "./PersitableStore";

import { AppLocalStorage } from "@/storages/local";
import { TableDetailLevel } from "@/types/tabelDetailLevel";

class DetailLevelStore extends PersistableStore<TableDetailLevel> {
  private detailLevel: TableDetailLevel = TableDetailLevel.FullDetails;
  private currentStoreKey = "none";

  constructor() {
    super("detailLevel", new AppLocalStorage());
  }

  public getCurrentDetailLevel(): TableDetailLevel {
    return this.detailLevel;
  }

  public saveCurrentState(): void {
    if (this.detailLevel === null) {
      this.persist(this.currentStoreKey, TableDetailLevel.FullDetails);
    } else {
      this.persist(this.currentStoreKey, this.detailLevel);
    }
  }

  public switchTo(newStoreKey: string): void {
    this.currentStoreKey = newStoreKey;
    const recoveredStore = this.retrieve(this.currentStoreKey);
    if (recoveredStore === null) {
      this.detailLevel = TableDetailLevel.FullDetails;
    }
    for (const val of Object.values(TableDetailLevel)) {
      if (val.toString() === String(recoveredStore)) {
        this.detailLevel = val;
      }
    }
  }

  public set(newState: TableDetailLevel): void {
    this.detailLevel = newState;
  }
}

export const detailLevelStore = new DetailLevelStore();

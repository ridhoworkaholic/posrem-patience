import { Timestamp } from "firebase/firestore";

export interface GrowthEntry {
  bb: string;
  bmi: string;
  bmiDesc: string;
  tb: string;

  lp?: string;
  lila?: string;

  createdAt: Timestamp;
}

export interface UserData {
  id: string;

  name: string;
  gender: string;

  born: string;
  address: string;

  data: {
    [year: string]: {
      [entryId: string]: GrowthEntry;
    };
  };
}

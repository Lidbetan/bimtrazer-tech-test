import { DateValue } from "@nextui-org/react";

export interface Block {
  id: string;
  description: string;
  startDate: DateValue;
  endDate: DateValue;
  progress: number;
}
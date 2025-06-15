import { Interaction } from '../models/interaction.model';
import {Progression} from "../models/progression.model";

export function compactInteractions(interactions: Interaction[]): Interaction[] {
  const map = new Map<string, Interaction>();

  for (const interaction of interactions) {
    if (!map.has(interaction.action)) {
      map.set(interaction.action, { ...interaction });
    } else {
      const existing = map.get(interaction.action)!;
      existing.success += interaction.success;
      existing.failures += interaction.failures;
    }
  }

  return Array.from(map.values());
}

export function compactProgressions(progressions: Progression[]): Progression[] {
  const map = new Map<string, Progression>();
  for(const progression of progressions) {
    if(!map.has(progression.word)){
      map.set(progression.word, { ...progression});
    }
    else{
      const existing = map.get(progression.word)!;
      existing.nbError+= progression.nbError;
      existing.completed = progression.completed;
      existing.timeSpent = Math.max(progression.timeSpent, existing.timeSpent);
    }
  }
  return Array.from(map.values());
}

export function filterByDateRange<T extends { date: Date }>(
  dataArray: T[],
  fromDate: string,
  toDate: string
): T[] {
  if (!fromDate || !toDate) return dataArray;

  const from = new Date(fromDate);
  const to = new Date(toDate);

  const array: T[] = [];

  for (const item of dataArray) {
    const dateItem= new Date(item.date);

    if (dateItem >= from && dateItem <= to) {
      array.push(item);
    }
  }
  console.log(array);

  return array;
}



import { ActivityLogsEffects } from "./activity-logs/activity-logs.effect";
import { QueueEffects } from "./queue/queue.effects";
import { QueuePriorityEffects } from "./queue-priority/queue-priority.effects";

export const EFFECTS: any[] = [
  ActivityLogsEffects,
  QueueEffects,
  QueuePriorityEffects
];

import { MediaApiService } from "./media-api/media-api.service";
import { AnnouncementApiService } from "./announcement-api/announcement-api.service";
import { TokenDisplayApiService } from "./token-display-api/token-display-api.service";

export const services: any[] = [
  MediaApiService,
  AnnouncementApiService,
  TokenDisplayApiService
];

export { MediaApiService } from "./media-api/media-api.service";
export {
  AnnouncementApiService
} from "./announcement-api/announcement-api.service";
export {
  TokenDisplayApiService
} from "./token-display-api/token-display-api.service";

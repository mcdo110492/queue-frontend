import { TokenListService } from "./api/token-list.service";
import { TokenListLocalService } from "./local/token-list-local.service";

export const services: any[] = [TokenListService, TokenListLocalService];

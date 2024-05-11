import { HttpRequest } from "@angular/common/http";
import { Subscriber } from "rxjs";

export interface ICallerRequest {
	subscriber: Subscriber<unknown>;
	failedRequest: HttpRequest<unknown>;
}
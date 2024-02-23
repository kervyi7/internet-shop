import { HttpHeaders, HttpParams } from "@angular/common/http";

export interface IHttpOptions {
	body?: any;
	headers?: HttpHeaders;
	observe?: any;
	params?: HttpParams;
	reportProgress?: boolean;
	responseType?: any;
	withCredentials?: boolean;
}
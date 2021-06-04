/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export class HttpEvent {
  static extractBody(event) {
    return JSON.parse(event.body);
  }

  static extractHeaders(event) {
    return event.headers;
  }

  static extractParams(event) {
    return event.pathParameters;
  }

  static extractQueryParams(event) {
    return event.queryStringParameters;
  }
}

export class HttpResponse {
  static success(data: any, statusCode = 200): any {
    return HttpResponse.response(statusCode, data);
  }

  static error(err: string | Error, statusCode?: number): any {
    const message = typeof err === 'string' ? err : err.message;
    return HttpResponse.response(statusCode || 503, { message });
  }

  private static response(statusCode: number, body: any, enableCors = true, additionalHeaders = {}) {
    const corsHeader = {
      'X-Requested-With': '*',
      'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,GET,PUT,PATCH,DELETE,OPTIONS'
    };
    const formattedBody = typeof body === 'string' ? body : JSON.stringify(body);
    const response = { statusCode: statusCode, body: formattedBody, headers: {} };
    if (enableCors) response.headers = { ...response.headers, ...corsHeader };
    if (additionalHeaders) response.headers = { ...response.headers, ...additionalHeaders };
    return response;
  }
}


import { HttpParams } from "@angular/common/http";

export const createRequestOption = (req?: any): HttpParams => {
    let options: HttpParams = new HttpParams();
  
    if (req) {
      Object.keys(req).forEach(key => {
        if (req[key] !== null) {
          options = options.set(key, req[key]);
        }
      });

      if (!req['page']) {
        req['page'] = 0;
      }
    }

    return options;
  };
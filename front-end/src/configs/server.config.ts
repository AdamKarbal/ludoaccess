import { HttpHeaders } from '@angular/common/http';

export const httpOptionsBase = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export const environnement = {
  serverUrl : 'http://localhost:4200',
  apiUrl:'http://localhost:4201/api'
}

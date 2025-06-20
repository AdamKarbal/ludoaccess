import { HttpHeaders } from '@angular/common/http';

export const httpOptionsBase = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export const environnement = {
    serverUrl: 'http://localhost:8080',
    apiUrl:'http://localhost:8081/api'
}


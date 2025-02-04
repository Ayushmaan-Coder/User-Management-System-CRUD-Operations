// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    // Make an HTTP GET request to retrieve all users
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  createUser(user: any): Observable<any> {
    // Make an HTTP POST request to create a new user
    return this.http.post<any>(`${this.apiUrl}/input`, user);
  }

  deleteUser(userId: number): Observable<void> {
    // Make an HTTP DELETE request to delete a user
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }

  updateUser(userId: number, updatedUser: any): Observable<any> {
    // Make an HTTP UPDATE request to delete a user
    return this.http.put<any>(`${this.apiUrl}/${userId}`, updatedUser);
}

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';
  data: any = {};

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    const url = '/api/weatherForecast';
    this.httpClient.get(url).subscribe(res => this.data = res);
  }

}

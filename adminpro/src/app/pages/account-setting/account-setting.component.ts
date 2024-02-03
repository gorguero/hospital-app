import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: [
  ]
})
export class AccountSettingComponent implements OnInit{

  public linkTheme = document.querySelector('#theme');

  ngOnInit(): void {}

  changeTheme( theme: string ){
    
    const url = `./assets/css/colors/${theme}.css`;

    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);

  }

}

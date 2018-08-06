import { Component, OnInit } from '@angular/core';

declare const EmojiPicker: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'app';
  text = '';
  openPopup: Function;

  ngOnInit() {
    window['emojiPicker'] = new EmojiPicker({
      emojiable_selector: '[data-emojiable=true]',
      assetsPath: '../assets/img/',
      popupButtonClasses: 'fa fa-smile-o'
    });
    // Finds all elements with `emojiable_selector` and converts them to rich emoji input fields
    // You may want to delay this step if you have dynamically created input fields that appear later in the loading process
    // It can be called as many times as necessary; previously converted input fields will not be converted again
    window['emojiPicker'].discover();
  }

  setPopupAction(fn: any) {
    this.openPopup = fn;
  }

}

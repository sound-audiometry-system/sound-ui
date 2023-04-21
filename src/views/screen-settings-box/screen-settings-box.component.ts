import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-screen-settings-box',
  templateUrl: './screen-settings-box.component.html',
  styleUrls: ['./screen-settings-box.component.less']
})
export class ScreenSettingsBoxComponent implements OnInit {
  imageConfigForm!: FormGroup;
  enableManualPlayMode: boolean = true;
  enableRightWrongMode: boolean = true;
  enableWrongDirectMode: boolean = true;
  enableImageMode: boolean = true;
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.imageConfigForm = this.fb.group({
      audioImageSequence: [1],
      audioImageTimeInterval: [1],
      jammingMode: [1],
    })
  }


}

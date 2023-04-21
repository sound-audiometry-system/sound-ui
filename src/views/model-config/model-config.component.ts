import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-model-config',
  templateUrl: './model-config.component.html',
  styleUrls: ['./model-config.component.less']
})
export class ModelConfigComponent implements OnInit {
  audioConfigsForm!: FormGroup;
  // 音响配置初始值
  audioConfigInital: any = {
    index: 0,
    isSimultaneous: false,
    soundIndexes: [],
    enableSignalSoundChannel: false,
    signalSoundDecibels: 40,
    signalSoundDecibelsInter: 1,
    enableEnvironmentalSoundChannel: false,
    environmentalSoundDecibels: 40,
    environmentalSoundDecibelsInter: 1,
    environmentalSoundId: null,
    environmentalSoundFile: null,
    environmentalSoundMaterialDuration: null,
  };
  audioConfigsArray: any[] = [];
  audioPlayModel: number = 1;
  /**当前正在设置的音响 */
  activeSound: number = 0;
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.audioConfigsForm = this.fb.group({
      index: [0],
      isSimultaneous: [false],
      soundIndexes: [[]],
      enableSignalSoundChannel: [false],
      signalSoundDecibels: [40],
      signalSoundDecibelsInter: [1],
      enableEnvironmentalSoundChannel: [false],
      environmentalSoundDecibels: [40],
      environmentalSoundDecibelsInter: [1],
      environmentalSoundId: [null],
      environmentalSoundFile: [null],
      environmentalSoundMaterialDuration: [null],
    })
  }

  /**切换设置音响,判断当前表单是否有值 */
  setActiveSound(currentSoundItem: number) {
    console.log(currentSoundItem);

    const audioConfigsValue = this.audioConfigsForm.value;
    if (audioConfigsValue.index != currentSoundItem) {
      /**当前表单有值就存到数组里，没有值若数组之前有这个就清空，如果数组也没有才不管 */
      if (audioConfigsValue.enableSignalSoundChannel || audioConfigsValue.enableEnvironmentalSoundChannel) {
        const beforeSelectItem = this.audioConfigsArray?.findIndex(val => val?.index == audioConfigsValue?.index);
        if (beforeSelectItem == -1) {
          this.audioConfigsArray.push(audioConfigsValue);
          console.log(this.audioConfigsArray);
        } else {
          this.audioConfigsArray[beforeSelectItem] = audioConfigsValue;
          console.log(this.audioConfigsArray);
        }
      } else {
        console.log('audioConfigsValue.index', audioConfigsValue.index);

        const index = this.audioConfigsArray?.findIndex(val => val?.index == audioConfigsValue.index);
        if (index != -1) {
          console.log(index, 'index');

          this.audioConfigsArray.splice(index, 1);
        }
      }
      /**切换后的音响，如果在数组里有值就覆盖，没有值就清空，并且把index换成当前选中的index */
      const currentSelectItem = this.audioConfigsArray?.findIndex(val => val?.index == currentSoundItem);
      this.audioConfigsForm.patchValue(this.audioConfigInital);
      this.audioConfigsForm.patchValue({ index: currentSoundItem })
      if (currentSelectItem != -1) {
        this.audioConfigsForm.patchValue(this.audioConfigsArray[currentSelectItem]);
      }
    }
  }

  // 判断音响的背景色
  determineBgc(type: string, soundItem: number) {
    switch (type) {
      case 'signalBg':
        if ((this.audioConfigsForm.get('index')?.value == soundItem) && this.audioConfigsForm.get('enableSignalSoundChannel')?.value && !this.audioConfigsForm.get('enableEnvironmentalSoundChannel')?.value) {
          return true;
        } else {
          const item = this.audioConfigsArray?.find(val => val?.index == soundItem);
          if (!item) {
            return false;
          } else {
            if (item.enableSignalSoundChannel && !item.enableEnvironmentalSoundChannel) {
              return true
            } else {
              return false
            }
          }
        }
      case 'environmenBg':
        if ((this.audioConfigsForm.get('index')?.value == soundItem) && !this.audioConfigsForm.get('enableSignalSoundChannel')?.value && this.audioConfigsForm.get('enableEnvironmentalSoundChannel')?.value) {
          return true;
        } else {
          const item = this.audioConfigsArray?.find(val => val?.index == soundItem);
          if (!item) {
            return false;
          } else {
            if (!item.enableSignalSoundChannel && item.enableEnvironmentalSoundChannel) {
              return true
            } else {
              return false
            }
          }
        }
      case 'doubleBg':
        if ((this.audioConfigsForm.get('index')?.value == soundItem) && this.audioConfigsForm.get('enableSignalSoundChannel')?.value && this.audioConfigsForm.get('enableEnvironmentalSoundChannel')?.value) {
          return true;
        } else {
          const item = this.audioConfigsArray?.find(val => val?.index == soundItem);
          if (!item) {
            return false;
          } else {
            if (item.enableSignalSoundChannel && item.enableEnvironmentalSoundChannel) {
              return true
            } else {
              return false
            }
          }
        }
      case 'noneBg':
        if ((this.audioConfigsForm.get('index')?.value == soundItem) && !this.audioConfigsForm.get('enableSignalSoundChannel')?.value && !this.audioConfigsForm.get('enableEnvironmentalSoundChannel')?.value) {
          return true;
        } else {
          const item = this.audioConfigsArray?.find(val => val?.index == soundItem);
          if (!item) {
            return false;
          } else {
            if (!item.enableSignalSoundChannel && !item.enableEnvironmentalSoundChannel) {
              return true
            } else {
              return false
            }
          }
        }
      default: return false;
    }
  }
}

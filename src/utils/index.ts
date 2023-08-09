import { ref } from 'vue';

export const dispatchEventStroage = () => {
  const signSetItem = sessionStorage.setItem;
  sessionStorage.setItem = function (key: string, val:any) {
    let setEvent:any = new Event("setItemEvent");
    setEvent.key = key;
    setEvent.newValue = val;
    window.dispatchEvent(setEvent);
    signSetItem.apply(this, arguments);
  };
};

// 自定义函数实现防抖
export function useDebounce(callback, delay = 300, isDisabled = false) {
  const timer = ref(null);

  const debouncedCallback = (...args) => {
    if (timer.value) {
      clearTimeout(timer.value);
      isDisabled = false
    }

    timer.value = setTimeout(() => {
      callback(...args);
      isDisabled = true
    }, delay);
  };

  return debouncedCallback;
}

// 自定义函数实现节流
export function useThrottle(callback, delay = 500, isDisabled) {
  const timer = ref(null);
  const throttledCallback = (...args) => {
    if (!timer.value) {
      callback(...args);
      isDisabled.value = true
      timer.value = setTimeout(() => {
          timer.value = null;
          isDisabled.value = false
        }, delay);
    } else {
      // timer.value = setTimeout(() => {
      //   timer.value = null;
      // }, delay);
    }
  };

  return throttledCallback;
}
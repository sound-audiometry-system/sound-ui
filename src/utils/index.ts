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
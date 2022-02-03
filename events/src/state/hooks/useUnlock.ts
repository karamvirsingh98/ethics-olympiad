export default (eventID: string) => {
  return {
    unlocked: window.localStorage.getItem(`event_${eventID}`) === 'unlocked' ? true : false,
    unlock: (eventID: string) =>
      window.localStorage.setItem(`event_${eventID}`, 'unlocked'),
  };
}
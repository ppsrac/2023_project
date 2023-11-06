export function handleDoubleClick(event) {
    const target = event.target;
    const isFullscreen = () => {
      return !!document.fullscreenElement;
    };
    const requestFullscreen = (element) => {
      element.requestFullscreen();
    };
    const exitFullscreen = () => {
      document.exitFullscreen();
    };
  
    if (!isFullscreen()) {
      requestFullscreen(target);
    } else {
      exitFullscreen();
    }
  }
import { useEffect } from "react";

/**
 * 모바일 브라우저에서 핀치 줌과 더블탭 줌을 방지하는 훅
 * - iOS Safari: gesturestart 이벤트 차단
 * - Android 등: 멀티터치 및 더블탭 차단
 */
export function usePreventZoom() {
  useEffect(() => {
    // iOS Safari 제스처 방지
    const preventGesture = (e: Event) => e.preventDefault();

    // 멀티터치(핀치) 방지
    const preventMultiTouch = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };

    // 더블탭 방지
    let lastTap = 0;
    const preventDoubleTap = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTap <= 300) e.preventDefault();
      lastTap = now;
    };

    const events = [
      ["gesturestart", preventGesture],
      ["gesturechange", preventGesture],
      ["gestureend", preventGesture],
      ["touchstart", preventMultiTouch, { passive: false }],
      ["touchmove", preventMultiTouch, { passive: false }],
      ["touchend", preventDoubleTap, { passive: false }],
    ] as const;

    events.forEach(([event, handler, options]) => {
      document.addEventListener(event, handler as EventListener, options);
    });

    return () => {
      events.forEach(([event, handler]) => {
        document.removeEventListener(event, handler as EventListener);
      });
    };
  }, []);
}

declare global {
  interface Window {
    naver: NaverGlobal;
  }
}

export interface NaverLatLng {
  lat(): number;
  lng(): number;
}

export interface NaverMapInstance {
  [key: string]: unknown;
}

export interface NaverSize {
  width: number;
  height: number;
}

export interface NaverPoint {
  x: number;
  y: number;
}

export interface NaverMaps {
  LatLng: new (lat: number, lng: number) => NaverLatLng;
  Map: new (
    element: HTMLElement | null,
    options: {
      center: NaverLatLng;
      zoom: number;
    },
  ) => NaverMapInstance;
  Marker: new (options: {
    position: NaverLatLng;
    map: NaverMapInstance;
    title: string;
    icon: {
      url: string;
      size: NaverSize;
      scaledSize: NaverSize;
      anchor: NaverPoint;
    };
  }) => unknown;
  Size: new (width: number, height: number) => NaverSize;
  Point: new (x: number, y: number) => NaverPoint;
  InfoWindow: new (options: {
    content: string;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth: number;
    anchorSize: NaverSize;
    pixelOffset: NaverPoint;
    disableAutoPan?: boolean;
  }) => {
    setContent: (content: string) => void;
    open: (map: NaverMapInstance, marker: unknown) => void;
    close: () => void;
    getMap: () => NaverMapInstance | null;
  };
  Event: {
    addListener: (
      instance: unknown,
      eventName: string,
      handler: () => void,
    ) => void;
  };
}

export interface NaverGlobal {
  maps: NaverMaps;
}

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
    }
  ) => NaverMapInstance;
  Marker: new (options: unknown) => unknown;
  Size: new (width: number, height: number) => NaverSize;
  Point: new (x: number, y: number) => NaverPoint;
}

export interface NaverGlobal {
  maps: NaverMaps;
}

"use client";

import { useEffect, useRef, useCallback } from "react";
import Script from "next/script";

interface KakaoMap {
  setCenter: (latlng: unknown) => void;
  setLevel: (level: number) => void;
}

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => unknown;
        Map: new (container: HTMLElement, options: { center: unknown; level: number }) => KakaoMap;
        Marker: new (options: { position: unknown; map: unknown }) => unknown;
      };
    };
  }
}

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  className?: string;
}

export default function KakaoMap({ latitude, longitude, className = "" }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<KakaoMap | null>(null);
  const initialCoordsRef = useRef<unknown>(null);
  const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

  function initializeMap() {
    if (!mapRef.current || !window.kakao?.maps) return;

    window.kakao.maps.load(() => {
      const coords = new window.kakao.maps.LatLng(latitude, longitude);
      initialCoordsRef.current = coords;
      const map = new window.kakao.maps.Map(mapRef.current!, {
        center: coords,
        level: 3,
      });
      new window.kakao.maps.Marker({
        position: coords,
        map: map,
      });
      mapInstanceRef.current = map;
    });
  }

  const resetMap = useCallback(() => {
    if (mapInstanceRef.current && initialCoordsRef.current) {
      mapInstanceRef.current.setCenter(initialCoordsRef.current);
      mapInstanceRef.current.setLevel(3);
    }
  }, []);

  useEffect(() => {
    if (window.kakao?.maps) {
      initializeMap();
    }
  }, [latitude, longitude]);

  if (!apiKey) {
    return (
      <div className={`w-full rounded-xl overflow-hidden bg-[var(--color-card)] flex items-center justify-center ${className}`} style={{ minHeight: "320px" }}>
        <p className="text-[var(--color-muted)]">Kakao Map API 키가 설정되지 않았습니다</p>
      </div>
    );
  }

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`}
        strategy="afterInteractive"
        onLoad={initializeMap}
      />
      <div className="relative">
        <div
          ref={mapRef}
          className={`w-full rounded-xl overflow-hidden ${className}`}
          style={{ minHeight: "320px", backgroundColor: "#1a1a1a" }}
        />
        <button
          onClick={resetMap}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-background)]/90 backdrop-blur border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:border-[var(--color-accent)]/50 transition-colors"
          title="위치 초기화"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
        </button>
      </div>
    </>
  );
}

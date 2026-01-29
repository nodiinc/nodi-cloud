"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => unknown;
        Map: new (container: HTMLElement, options: { center: unknown; level: number }) => unknown;
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
  const mapInstanceRef = useRef<unknown>(null);
  const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

  function initializeMap() {
    if (!mapRef.current || !window.kakao?.maps) return;

    window.kakao.maps.load(() => {
      const coords = new window.kakao.maps.LatLng(latitude, longitude);
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
      <div
        ref={mapRef}
        className={`w-full rounded-xl overflow-hidden ${className}`}
        style={{ minHeight: "320px", backgroundColor: "#1a1a1a" }}
      />
    </>
  );
}

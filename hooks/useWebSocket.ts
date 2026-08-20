"use client";

import { useEffect, useRef, useState } from "react";
import type { SensorData } from "@/types/sensor";

export type ConnectionStatus = "connecting" | "online" | "offline";

const RECONNECT_DELAY_MS = 3000;
const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:8000/ws/data";

export function useWebSocket() {
    const [data, setData] = useState<SensorData | null>(null);
    const [status, setStatus] = useState<ConnectionStatus>("connecting");
    const socketRef = useRef<WebSocket | null>(null);
    const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        let isUnmounted = false;

        function connect() {
            setStatus("connecting");
            const socket = new WebSocket(WS_URL);
            socketRef.current = socket;

            socket.onopen = () => setStatus("online");

            socket.onmessage = (event) => {
                try {
                    const parsed: SensorData = JSON.parse(event.data);
                    setData(parsed);
                } catch {
                    console.error("Không parse được dữ liệu WebSocket:", event.data);
                }
            };

            socket.onclose = () => {
                if (isUnmounted) return;
                setStatus("offline");
                reconnectTimerRef.current = setTimeout(connect, RECONNECT_DELAY_MS);
            };

            socket.onerror = () => socket.close();
        }

        connect();

        return () => {
            isUnmounted = true;
            if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
            socketRef.current?.close();
        };
    }, []);

    return { data, status };
}
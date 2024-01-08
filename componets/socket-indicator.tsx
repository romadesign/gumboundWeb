"use client";

import { useSocket } from "../componets/providers/socket-provider";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <div 
      >
        Fallback: Polling every 1s
      </div>
    )
  }

  return (
    <div 
    >
      Live: Real-time connetecd
    </div>
  )
}
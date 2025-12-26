"use client";

import { Client } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import SocketJS from "sockjs-client";

type OrderStatusEvent = {
  orderId: number;
  status: string;
  message: string;
};

export default function OrderNotifications() {
  const [notis, setNotis] = useState<OrderStatusEvent[]>([]);
  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_SOCKETURL;
    const client = new Client({
      webSocketFactory: () => new SocketJS(wsUrl),
      reconnectDelay: 3000,
      onConnect: () => {
        client.subscribe("/test-ws/orders", (msg) => {
          const body: OrderStatusEvent = JSON.parse(msg.body);
          setNotis((prev) => [body, ...prev]);
          alert(body.message);
        });
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  return (
    <div>
      {/* {notis.map((item, key) => (
        <div key={key}>{item.message}</div>
      ))} */}
    </div>
  );
}

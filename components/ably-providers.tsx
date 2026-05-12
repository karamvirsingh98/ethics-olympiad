"use client";

import { Realtime } from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import { useState } from "react";

const createClient = () =>
  new Realtime({
    authCallback: async (_, callback) => {
      try {
        const response = await fetch("/api/ably-auth");
        if (!response.ok) throw new Error(`ably-auth ${response.status}`);
        const { token } = await response.json();
        callback(null, token);
      } catch (e) {
        callback(e as Error, null);
      }
    },
  });

export const AblyChannelProvider = ({
  channelName,
  children,
}: {
  channelName: string;
  children: React.ReactNode;
}) => {
  const [ablyClient] = useState(createClient);

  return (
    <AblyProvider client={ablyClient}>
      <ChannelProvider channelName={channelName}>{children}</ChannelProvider>
    </AblyProvider>
  );
};

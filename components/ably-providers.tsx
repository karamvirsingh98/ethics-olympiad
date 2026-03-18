"use client";

import { Realtime } from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import { useState } from "react";

const createClient = () =>
  new Realtime({
    authCallback: async (_, callback) => {
      const response = await fetch("/api/ably-auth").then((res) => res.json());
      const token = response.token;
      callback(null, token);
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

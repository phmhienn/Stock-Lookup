import React from "react";
import Card from "../ui/Card";

export default function RightBar({ watchlist, recent, onOpen, onToggle }) {
  return (
    <div className="lg:col-span-4">
      <Card header={<div className="font-semibold">Watchlist</div>}>
        <div className="divide-y divide-neutral-200/70 dark:divide-neutral-800">
          {watchlist?.length ? (
            watchlist
          ) : (
            <div className="py-6 text-sm text-neutral-500">Empty.</div>
          )}
        </div>
      </Card>
      <Card
        className="mt-4"
        header={<div className="font-semibold">Recent</div>}
      >
        {recent}
      </Card>
    </div>
  );
}

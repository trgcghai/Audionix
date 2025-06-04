"use client";
import MediaList from "../_components/MediaList";
import { mockData } from "../sampleData";

export default function Home() {
  return (
    <div>
      {mockData.map((item, index) => {
        return (
          <MediaList
            key={item.id}
            title={item.title}
            data={item.data}
            className={index == 0 ? "mt-2" : "mt-8"}
          />
        );
      })}
    </div>
  );
}

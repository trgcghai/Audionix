"use client";
import MediaList from "@/components/common/MediaList";
import { mockData } from "@/app/sampleData";

export default function Home() {
  return (
    <div>
      {mockData.map((item, index) => {
        return (
          <MediaList
            key={item._id}
            title={item.title}
            data={item.data}
            className={index == 0 ? "mt-2" : "mt-8"}
          />
        );
      })}
    </div>
  );
}

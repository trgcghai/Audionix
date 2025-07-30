"use client";
import { useProfileQuery } from "@/services/auth/authApi";
import MediaList from "../../components/common/MediaList";
import { mockData } from "../sampleData";

export default function Home() {
  const { data } = useProfileQuery();

  console.log("Profile Data:", data);

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

import React from "react";
import { getMembers } from "../actions/memberActions";
import MembarCard from "./MembarCard";
import { fetchCurrentLikeId } from "../actions/likeActions";

const MemberPage = async () => {
  const members = await getMembers();
  const likeIds = await fetchCurrentLikeId()
  return (
    <div className="memberPage">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
        {members &&
          members.map((member) => (
            <MembarCard member={member} key={member.id} likeIds={likeIds} />
          ))}
      </div>
    </div>
  );
};

export default MemberPage;

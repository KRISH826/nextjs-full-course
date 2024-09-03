import React from "react";
import { getMembers } from "../actions/memberActions";
import MembarCard from "./MembarCard";

const MemberPage = async () => {
  const members = await getMembers();
  return (
    <div className="memberPage">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
        {members &&
          members.map((member) => (
            <MembarCard member={member} key={member.id} />
          ))}
      </div>
    </div>
  );
};

export default MemberPage;

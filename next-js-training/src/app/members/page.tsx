import React from "react";
import { getMembers } from "../actions/memberActions";

const MemberPage = async () => {
  const members = await getMembers();
  return (
    <div>
      {members && members.map((member) => <p key={member.id}>{member.name}</p>)}
    </div>
  );
};

export default MemberPage;

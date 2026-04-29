import React from "react";
import AddNotice from "./AddNotice";
import NoticeList from "./NoticeList";   // ✅ correct file

function AdminDashboard() {
  return (
    <div>
      <AddNotice />   {/* only one form */}
      <NoticeList />  {/* only list */}
    </div>
  );
}

export default AdminDashboard;
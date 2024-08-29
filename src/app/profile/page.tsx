import Guard from "@/components/guards/Guard";
import MyProfile from "@/components/profile/MyProfile";

export default function ProfilePage() {
  return (
    <Guard>
      <MyProfile />
    </Guard>
  );
}

import Guard from "@/components/guards/Guard";
import MySubmissions from "@/components/profile/MySubmissions";

export default function MySubmissionsPage() {
  return (
    <Guard member>
      <MySubmissions />
    </Guard>
  );
}

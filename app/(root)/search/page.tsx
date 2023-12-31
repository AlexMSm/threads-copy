import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadTab";
import UserCard from "@/components/cards/UserCard";



const Page = async ({
    searchParams,
  }: {
    searchParams: { [key: string]: string | undefined };
  }) => {
    
    const user = await currentUser();
    if (!user) return null;

    // fetch organization list created by user
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");
    // if (!userInfo?.onboarded) redirect("/onboarding");

    const result = await fetchUsers(
        {userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 25 })


  return (
    <section>
        <h1 className="head-text mb-10">Search</h1>


        <div className="mt-14 flex flex-col gap-9">
            {result.users.length === 0 ? (
                <p className="no-result">No users</p>
            ):(
                <>
                {result.users.map((person) => (
                    <UserCard
                    key={person.id}
                    id={person.id}
                    name={person.name}
                    username={person.username}
                    imgUrl={person.image}
                    personType="User"/>
                ))}
                </>
            )}
        </div>
    </section>
  )
}

export default Page;

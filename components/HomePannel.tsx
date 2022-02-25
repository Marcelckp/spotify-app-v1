import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Nav from "./Nav";

function HomePannel() {
  const router = useRouter();
  const { data: session } = useSession();

//   console.log(session.user.image);
  return (
    <div className="text-white relative">
      <Nav />
      <div>
        <h1>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
          architecto blanditiis a beatae voluptatem mollitia non soluta suscipit
          nostrum nemo minus error consequatur nam perspiciatis temporibus
          molestias assumenda, hic aperiam?
        </h1>
      </div>
    </div>
  );
}

export default HomePannel;

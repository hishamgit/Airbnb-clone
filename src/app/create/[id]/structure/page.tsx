import { createCategoryPage } from "@/app/actions";
import { BottomBar } from "@/app/components/BottomBar";
import { SelectCategory } from "@/app/components/SelectCategory";
export default function StructureRouter({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h1 className="text-3xl mt-5 font-semibold tracking-tight transition-colors">
          which of these best describe your property...
        </h1>
      </div>
      <form action={createCategoryPage}>
        <input type="hidden" name="homeId" value={params.id} />
        <SelectCategory />
        <BottomBar/>
      </form>
    </>
  );
}

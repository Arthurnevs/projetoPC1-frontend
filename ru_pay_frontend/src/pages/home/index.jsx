import moon from "@/assets/moon.jpg";
import sun from "@/assets/sun.jpg";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Home</h1>
      </div>
      <div className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm p-6">
        <div className="flex flex-col gap-12 text-center pt-12">
          <h3 className="text-2xl font-bold tracking-tight">
            Escolha sua refeição
          </h3>
          <div className="grid grid-cols-2 md:gap-20 sm:gap-10 gap-5">
            <button className="flex flex-col gap-4 p-5 rounded-lg transition-all border items-center hover:bg-muted">
              <img
                alt="Almoço"
                className="aspect-square w-60 rounded-md object-cover"
                height="84"
                src={sun}
                width="84"
              />
              <h4 className="text-2xl font-bold tracking-tight">Almoço</h4>
            </button>
            <button className="flex flex-col gap-4 p-5 rounded-lg transition-all border items-center hover:bg-muted">
              <img
                alt="Jantar"
                className="aspect-square w-60 rounded-md object-cover"
                height="84"
                src={moon}
                width="84"
              />
              <h4 className="text-2xl font-bold tracking-tight">Jantar</h4>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

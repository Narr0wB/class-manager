import { cn } from '@/lib/utils';

type HomeProps = {
}

const Home: React.FC<HomeProps> = ({ }) => {
  return (
    <main className="flex min-h-screen h-screen items-center bg-green-500 dark:bg-blue-500 text-2xl">
      <div className="flex flex-row items-center w-[50%] h-[50%]">
        <h1>NarrowB bestest eu</h1>
        <h1>Luchina</h1>
      </div>
    </main>
  );
}

export default Home;
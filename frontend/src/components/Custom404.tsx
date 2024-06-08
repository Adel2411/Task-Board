const Custom404 = ({ text }: { text: string }) => {
  return (
    <main className="flex justify-center items-center text-xl md:text-2xl lg:text-3xl font-bold h-screen w-screen bg-auth_bg dark:bg-auth_bg-dark">
      <div className="flex justify-center items-center w-full gap-2">
        <div>{text}</div>
        <span className="loading loading-dots loading-xs md:loading-sm lg:loading-md"></span>
      </div>
    </main>
  );
};

export default Custom404;

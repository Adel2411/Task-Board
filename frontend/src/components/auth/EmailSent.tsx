import { IoArrowBackCircleOutline } from "react-icons/io5";

const EmailSent = ({
  setEmailSent,
}: {
  setEmailSent: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="z-10 flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
          Reset link sent successfully
        </h1>
        <p>Go check the email address you just provided !</p>
      </div>
      <div className="w-full">
        <button
          onClick={() => setEmailSent(false)}
          className={`text-sm w-fit flex items-center gap-2 hover:bg-white dark:hover:bg-black hover:bg-opacity-40 dark:hover:bg-opacity-20 p-2 rounded-xl`}
        >
          <IoArrowBackCircleOutline size={15} />
          Try another email
        </button>
      </div>
    </div>
  );
};

export default EmailSent;
